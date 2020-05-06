// require PrototypeArray.js
import React, { useEffect, useState, forwardRef } from 'react';

const slotClass = 'menutiled-slot';
const slotSubClass = 'menutiled-slot-sub';
const tagClass = 'menutiled-tag';
const tagFontClass = 'menutiled-tag-font';
const iconMoreClass = 'menutiled-icon-more';
const iconSelectClass = 'menutiled-icon-checked';
const activeClass = 'active';

const MenuTiled = forwardRef(({
  selected, // [{id: '', name: ''}]
  onChange, // func(e, value, selected)

  list,
  // list: [{
  //   id: '',
  //   name: '',
  //   children: []
  // }]
  ...others
}, ref) =>  {
  const [viewGroups, setViewGroups] = useState(null); // 分组显示数据
  let [data, setData] = useState(list) // 将list转换成标准格式

  // 格式化列表数据
  function fmtList () {
    if (!list || !list.length) return [];
    if (JSON.stringify(list).indexOf('"children"') === -1) {
      var newList = Object.clone(list);
      return newList.deepTree()
    }
    return list;
  }
  useEffect(() => {
    data = fmtList() // eslint-disable-line
    setData(data)
    setViewGroups([data])
  }, [list])

  // 点击选项
  function click (e) {
    if (e.target.classList.contains(tagClass)) { // 点击项
      // 选中点击行
      // const row = Number(e.target.getAttribute('data-index') || 0);
      const id = e.target.getAttribute('data-id');
      const item = data.getDeepTreeNode(id);
      // 删除后面的层级
      const hierarchy = Number(e.target.getAttribute('data-hierarchy') || 0);
      let newViewGroups = Object.clone(viewGroups);
      newViewGroups.splice(hierarchy + 1)
      // 如果有子级, 添加子级
      if (item.children && item.children.length) {
        // 添加子级
        if (!newViewGroups[hierarchy + 1]) newViewGroups[hierarchy + 1] = [];
        newViewGroups[hierarchy + 1] = item.children;
      } else if (onChange) { // 叶子节点点击触发
        onChange(e, item.name, [item], data)
      }
      setViewGroups(newViewGroups);
    }
  }
  
  // 判断是否选中
  function isSelected (id) {
    for (let item of selected) {
      if (item.id === id) return true;
    }
    return false;
  }

  return (
    <div ref={ref} {...others} className={`menutiled${others.className ? ' ' + others.className : ''}`} onClick={click}>
      <div className="menutiled-wrapper">
        {(viewGroups || []).map((group, groupIndex) => {
          return <div key={groupIndex} className={`${groupIndex ? slotSubClass : slotClass}`}>
            {group.map((option, optionIndex) => {
              return  <div key={optionIndex} data-index={optionIndex} data-hierarchy={groupIndex} data-id={option.id} className={`menutiled-tag${isSelected(option.id) ? ' ' + activeClass : ''}`}>
                <p className={tagFontClass}>{option.name}</p>
                {option.children && option.children.length > 0 ? <i className={iconMoreClass}></i> : <i className={iconSelectClass}></i>}
              </div>
            })}
          </div>
        })}
      </div>
    </div>
  );
})

export default MenuTiled
