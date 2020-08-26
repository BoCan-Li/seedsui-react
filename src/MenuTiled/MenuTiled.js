// require PrototypeArray.js
import React, { useEffect, useState, forwardRef } from 'react';
import Tree from './../Tree';

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

  multiple = false,
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
    let listStr = JSON.stringify(list);
    if (!multiple) { // 单选需要children
      if (listStr.indexOf('"children"') === -1) {
        var newList = Object.clone(list);
        return newList.deepTree()
      }
    } else if (multiple) { // 多选需要拉平数据, 并对根节点(id为空)做根处理
      if (listStr.indexOf('"children"') !== -1 || listStr.indexOf('"parentid"') === -1) { // 有children或者没有parentid, 需要拉平数据
        var newList = Object.clone(list);
        // 因为树只支持拉平数据, 并且必须层级分明, 所以要对id为空的根节点做根处理
        let flattenTree = newList.flattenTree();
        // 提取根节点共同的parentid, 为根节点(例如: 全部)的id
        let rootParentId = getRootParentId(flattenTree);
        // 对id为空的根节点(例如: 全部)做根处理
        updateTreeRoot(flattenTree, rootParentId);
        
        // 更新选中的根节点
        if (selected && selected.length) updateTreeSelectedRoot(flattenTree);
        return flattenTree;
      }
      if (listStr.indexOf('"parentid"') !== -1) { // 已经拉平的数据需要对id为空的数据做根处理
        // 提取根节点共同的parentid, 为根节点(例如: 全部)的id
        let rootParentId = getRootParentId(list);
        // 对id为空的根节点(例如: 全部)做根处理
        updateTreeRoot(list, rootParentId);

        // 更新选中的根节点
        if (selected && selected.length) updateTreeSelectedRoot(list);
        return list;
      }
    }
    return list;
  }
  useEffect(() => {
    data = fmtList() // eslint-disable-line
    setData(data)
    if (!multiple) setViewGroups([data])
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
    if (!Array.isArray(selected) || !id) return false;
    for (let item of selected) {
      if (item.id === id) return true;
    }
    return false;
  }

  // 多选, 提取根节点共同的parentid, 为根节点(例如: 全部)的id
  function getRootParentId (flattenTree) {
    let rootParentId = '-1';
    let root = flattenTree.getFlattenTreeRoots();
    for (let rootItem of root) {
      if (rootItem.id && rootItem.id !== '-1') {
        rootParentId = rootItem.parentid;
        break;
      }
    }
    return rootParentId;
  }
  // 多选, 对id为空的根节点(例如: 全部)做根处理, 补充id、parentid、isroot
  function updateTreeRoot (flattenTree, rootParentId) {
    for (let item of flattenTree) {
      if (!item.id) {
        item.parentid = '-2'
        item.id = rootParentId
        item.isroot = '1'
        if (rootParentId) delete item.isLeaf
      }
    }
  }
  // 多选时, list数据被转换: id为空的根节点被补充id和parentid=-2还有isroot=1, 所以selected也需要处理, 才能让树选中
  function updateTreeSelectedRoot (flattenTree) {
    for (let selectedItem of selected) {
      if (!selectedItem.id) {
        let rootParentId = getRootParentId(flattenTree);
        selectedItem.parentid = '-2'
        selectedItem.id = rootParentId
        selectedItem.isroot = '1'
      }
    }
  }
  // 多选树
  function changeTree (e, value, options) {
    console.log('修改')
    console.log(options)
    onChange(e, value, options, data)
  }
  // console.log(selected)
  return (
    <div ref={ref} {...others} className={`menutiled${others.className ? ' ' + others.className : ''}`} onClick={click}>
      <div className="menutiled-wrapper">
        {/* 单选样式 */}
        {!multiple && (viewGroups || []).map((group, groupIndex) => {
          return <div key={groupIndex} className={`${groupIndex ? slotSubClass : slotClass}`}>
            {group.map((option, optionIndex) => {
              return  <div key={optionIndex} data-index={optionIndex} data-hierarchy={groupIndex} data-id={option.id} className={`menutiled-tag${isSelected(option.id) ? ' ' + activeClass : ''}`}>
                <p className={tagFontClass}>{option.name}</p>
                {option.children && option.children.length > 0 ? <i className={iconMoreClass}></i> : <i className={iconSelectClass}></i>}
              </div>
            })}
          </div>
        })}
        {/* 多选样式 */}
        {multiple && data && data.length > 0 && <Tree
          list={data}
          selected={selected}
          multiple
          checkbox
          onChange={changeTree}
        />}
      </div>
    </div>
  );
})

export default MenuTiled
