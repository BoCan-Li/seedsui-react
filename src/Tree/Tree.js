// require PrototypeArray.js
import React, {forwardRef, useRef, useImperativeHandle, useEffect} from 'react';
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
  params = {}, // 设置实例化参数
  
  ...others
}, ref) =>  {
  const refEl = useRef(null)
  useImperativeHandle(ref, () => {
    return refEl.current
  });
  const instance = useRef(null);

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
      onClick: click,
      onChange: change,
      onData: onData,
      ...(params || {})
    });
    // 渲染数据
    instance.current.update();
    // 设置已选中
    checkedSelected();
    refEl.current.instance = instance;
  }, []) // eslint-disable-line

  useEffect(() => {
    if (extend === 1) {
      instance.current.extendAll();
    } else if (extend === -1) {
      instance.current.collapseAll();
    }
  }, [extend])

  useEffect(() => {
    if (!instance.current) return;
    if (list && list.length) {
      let data = Object.clone(list);
      if (JSON.stringify(data).indexOf('"children"') !== -1) {
        data = data.flattenTree()
      }
      // 设置已选中
      if (selected && Object.values(selected).length) {
        for (var id in selected) {
          instance.current.addSelected(selected[id])
        }
      }
      // 开始渲染
      instance.current.setData(data);
      instance.current.update();
    } else {
      instance.current.setData([]);
      instance.current.update();
    }
  }, [list])

  useEffect(() => {
    if (!bar || !instance.current) return;
    instance.current.params.bar = bar;
    instance.current.updateBar();
    barSelected();
  }, [bar])

  // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
  if (instance.current) {
    instance.current.params.onClick = click;
    instance.current.params.onChange = change;
    instance.current.params.onData = onData;
  }

  // 选中选中项
  function checkedSelected () {
    if (selected && selected.length) {
      for (var item of selected) {
        instance.current.addSelected(item)
      }
    } else {
      instance.current.removeAllSelected()
    }
  }
  // 当bar更新时, 需要选中选中项
  function barSelected () {
    instance.current.bar.innerHTML = '';
    if (selected && selected.length) {
      for (var item of selected) {
        instance.current.addBarOption(item)
      }
    } else {
      instance.current.removeAllSelected()
    }
  }

  // 选中项
  function change (s) {
    if (refEl.current) s.target = refEl.current;
    if (onChange) {
      let value = [];
      if (!s.selected || !s.selected.length) {
        onChange(s, '', [])
        return;
      }
      for (let id in s.selected) {
        value.push(s.selected[id].name);
      }
      onChange(s, value.join(','), Object.values(s.selected))
    }
  }

  // 判断是否选中
  function isSelected (id) {
    if (!Array.isArray(selected) || !id) return false;
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
    
    // 点击回调
    if (onClick) onClick(s, item.name, item, isActived, isExtend, childrenCount);
    if (s.isLeaf && onClickLeaf) onClickLeaf(s, item.name, item, isActived);

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
    if (s.targetLine) s.targetLine.childrenLoaded = true;
  }

  return (
    <div ref={refEl} {...others} className={`tree-box${others.className ? ' ' + others.className : ''}`}>
      <ul {...treeAttribute} className={`tree${treeAttribute.className ? ' ' + treeAttribute.className : ''}`}></ul>
    </div>
  );
})

export default React.memo(Tree, (prevProps, nextProps) => {
  if (prevProps.selected.length !== nextProps.selected.length) return false;
  if (prevProps.bar !== nextProps.bar) return false;
  if (prevProps.extend !== nextProps.extend) return false;
  if (JSON.stringify(prevProps.list) === JSON.stringify(nextProps.list)) return true;
  return false;
})
