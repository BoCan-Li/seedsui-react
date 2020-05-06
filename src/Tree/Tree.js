// require PrototypeArray.js
import React, {forwardRef, useRef, useImperativeHandle, useEffect, useContext} from 'react';
import Instance from './instance.js';

const Tree = forwardRef(({
  split = ',',
  multiple = true, // 是否需要多选
  checkbox = true, // 是否可选
  extend = 0, // 1.全部展开 -1.全部收缩 0.不工作
  bar, // 选中栏

  treeAttribute = {},
  buttonAddAttribute = {}, // {className: '', onClick: func()}
  buttonDelAttribute = {}, // {className: '', onClick: func()}

  selected = [], // 选中项: [{id: '', name: ''}]
  list = [], // 数据: [{id: '', name: '', parentid: ''}]

  getChildren,
  onChange, // func(e, value, selected)

  onClick,
  onClickLeaf,
  onData,
  
  ...others
}, ref) =>  {
  const refEl = useRef(null)
  useImperativeHandle(ref, () => {
    return refEl.current
  });
  const instance = useRef(null);

  // useEffect(() => {
  //   if (list && list.length) {
  //     let data = Object.clone(list);
  //     if (JSON.stringify(data).indexOf('"children"') !== -1) {
  //       data = data.flattenTree()
  //     }
  //     // 设置已选中
  //     if (selected && Object.values(selected).length) {
  //       for (var id in selected) {
  //         instance.current.addSelected(selected[id])
  //       }
  //     }
  //     // 开始渲染
  //     instance.current.setData(data);
  //     instance.current.update();
  //   } else {
  //     instance.current.setData([]);
  //     instance.current.update();
  //   }
  // }, [list])

  useEffect(() => {
    if (instance.current) return;
    // 更新数据
    let data = Object.clone(list);
    if (JSON.stringify(data).indexOf('"children"') !== -1) {
      data = data.flattenTree()
    }
    let elTree = refEl.current.querySelector('ul')
    instance.current = new Instance(elTree, {
      data: data,
      multiple,
      checkbox,
      bar,
      buttonAddClass: buttonAddAttribute.className,
      onClickAdd: buttonAddAttribute.onClick,
      buttonDelClass: buttonDelAttribute.className,
      onClickDel: buttonDelAttribute.onClick,
      onClickLeaf: onClickLeaf, // 没有子节点
      onClick: click,
      onAddSelected: addSelected,
      onData: onData
    });
    // 设置已选中
    if (selected && selected.length) {
      for (var item of selected) {
        instance.current.addSelected(item)
      }
    }
    instance.current.update();
  }, []) // eslint-disable-line

  useEffect(() => {
    if (extend === 1) {
      instance.current.extendAll();
    } else if (extend === -1) {
      instance.current.collapseAll();
    }
  }, [extend])

  // 选中项
  function addSelected (s) {
    if (refEl.current) s.target = refEl.current;
    if (onChange) {
      let value = [];
      for (let id in s.selected) {
        value.push(s.selected[id].name);
      }
      onChange(s, value.join(','), Object.values(s.selected))
    }
  }

  // 判断是否选中
  function isSelected (id) {
    for (let item of selected) {
      if (item.id === id) return true;
    }
    return false;
  }

  // 点击
  function click (s) {
    if (refEl.current) s.target = refEl.current;
    let data = Object.clone(list);
    if (JSON.stringify(data).indexOf('"children"') !== -1) {
      data = data.flattenTree()
    }
    // item
    const id = s.targetLine.getAttribute('data-id');
    let item = data.getFlattenTreeNode(id);
    // isActived
    let isActived = isSelected(id) ? true : false;
    // childrenCount
    let childrenCount = 0;
    const ul = s.targetLine.nextElementSibling;
    if (ul && ul.tagName === 'UL') {
      childrenCount = ul.children.length;
    }
    // isExtend
    const isExtend = s.targetLine.classList.contains('extend');
    
    if (onClick) onClick(s, item, isActived, isExtend, childrenCount);

    if (getChildren) {
      addChildren(s, item, isActived, isExtend, childrenCount)
    }
  }

  // 异步加载的方法, 点击Title, 去请求数据, 将数据塞到指定节点下
  async function addChildren (s, item, isActived, isExtend, childrenCount) {
    if (!isExtend || s.targetLine.childrenLoaded) return;
    var ul = s.targetLine.nextElementSibling;
    let leaf = await getChildren(item.id)
    // 如果返回不是数组, 则认为返回错误
    if (leaf instanceof Array === false) {
      return
    }
    instance.current.addData(leaf, item.id, ul);
    s.targetLine.childrenLoaded = true;
  }

  return (
    <div ref={refEl} {...others} className={`tree-box${others.className ? ' ' + others.className : ''}`}>
      <ul {...treeAttribute} className={`tree${treeAttribute.className ? ' ' + treeAttribute.className : ''}`}></ul>
    </div>
  );
})

export default React.memo(Tree, (prevProps, nextProps) => {
  if (prevProps.extend !== nextProps.extend) return false;
  if (JSON.stringify(prevProps.list) === JSON.stringify(nextProps.list)) return true;
  return false;
})
