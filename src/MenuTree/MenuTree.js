// require PrototypeArray.js
import React, {forwardRef, useRef, useImperativeHandle, useEffect} from 'react';
import Instance from './instance.js';

const MenuTree = forwardRef(({
  selected = [], // 选中项: [{id: '', name: ''}]
  list = [], // 数据: [{id: '', name: '', parentid: ''}]

  onChange, // func(e, value, selected)
  onExtendActive, // func(e, value, selected) 展开选中项时触发, 如若有此属性, 展开选中项时也将移除同级所有的选中项与展开项

  onClick,
  onClickLeaf,
  ...others
}, ref) =>  {
  const refEl = useRef(null)
  useImperativeHandle(ref, () => {
    return refEl.current
  });
  const instance = useRef(null);

  useEffect(() => {
    if (!instance.current) return;
    if (list && list.length) {
      if (selected && selected.length) {
        instance.current.setSelectedId(selected[0].id)
      }
      var data = Object.clone(list);
      if (JSON.stringify(data).indexOf('"children"') === -1) {
        data = data.deepTree()
      }
      instance.current.setData(data)
    } else {
      instance.current.setData([])
    }
  }, [list])

  useEffect(() => {
    if (instance.current) return;
    var data = Object.clone(list);
    if (JSON.stringify(data).indexOf('"children"') === -1) {
      data = data.deepTree()
    }
    instance.current = new Instance(refEl.current, {
      data: data,
      selectedId: selected && selected.length ? selected[0].id : '',
      onClick: click, // (item, isActive, isExtend: true展开 | false收缩)
      onExtendActive: onExtendActive ? click : null
    });
  }, [])

  // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
  if (instance.current) {
    instance.current.params.onClick = click;
  }
  function click (s, item, isActived, isExtend) {
    if (refEl.current) s.target = refEl.current;
    // childrenCount
    var childrenCount = item.children && item.children.length ? item.children.length : 0;

    // 点击回调
    if (onClick) onClick(s, item.name, [item], isActived, isExtend, childrenCount);
    if (!isActived) {
      if (onChange) onChange(s, item.name, [item])
    } else {
      if (onExtendActive) onExtendActive(s, item.name, [item])
    }
    if (item.isLeaf === true && onClickLeaf) onClickLeaf(s, item.name, item, isActived, isExtend, childrenCount);
  }

  return (
    <ul ref={refEl} {...others} className={`menutree${others.className ? ' ' + others.className : ''}`}>
    </ul>
  );
})

export default React.memo(MenuTree, (prevProps, nextProps) => {
  if (JSON.stringify(prevProps.list) === JSON.stringify(nextProps.list)) return true;
  return false;
})
