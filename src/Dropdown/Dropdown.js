import React, {forwardRef, useRef, useImperativeHandle, useEffect, useState, Fragment} from 'react';
import Tabbar from './../Tabbar';
import DropdownDialog from './DropdownDialog';

const Dropdown = forwardRef(({
  top,
  disabled,
  onChange,
  listRoot, // 一级标题, 有可能id相同但名称不同 [{name: '分类', data: [{id: '1',name: '测试数据1',children:[]}]}]
  list, // [{name: '分类', data: [{id: '1',name: '测试数据1',children:[]}]}]
  tabbarProps = {},
  dialogProps = {},
  menutiledProps = {}
}, ref) => {
  const refElTabbar = useRef(null)
  useImperativeHandle(ref, () => {
    return refElTabbar.current
  });
  const [activeIndex, setActiveIndex] = useState(-1);
  const [tabs, setTabs] = useState([]);
  let [selected, setSelected] = useState([]);
  const [menusMultiple, setMenusMultiple] = useState(false);
  const [menus, setMenus] = useState([]);
  const [offsetTop, setOffsetTop] = useState(0);
  const [show, setShow] = useState(false);

  function refresh () {
    if (!list) return;
    // Tabbar 和 MenuTiled
    const newTabs = [];
    for (let item of list) {
      newTabs.push({
        ...item,
        ricon: <span className='icon tab-icon shape-triangle-down'></span>
      });
    };
    setTabs(newTabs);
  }

  function getMaskTop () {
    return new Promise((resolve) => {
      // 计算距离头部
      let maskTop = top;
      if (!maskTop) {
        setTimeout(() => {
          let rect = refElTabbar.current.getBoundingClientRect();
          // maskTop = refElTabbar.current.offsetTop + 40;
          maskTop = rect.top + 40;
          resolve(maskTop)
        }, 100);
      } else {
        resolve(maskTop)
      }
    })
  }

  useEffect(() => {
    async function fetchData () {
      let maskTop = await getMaskTop();
      setOffsetTop(maskTop);
      // 更新数据
      refresh();
    }
    fetchData();
  }, []) // eslint-disable-line

  useEffect(() => {
    refresh()
  }, [list]) // eslint-disable-line
  
  function handleClickTab (e, value, options, index) {
    let ids = tabs[index].id.split(',');
    let names = tabs[index].name.split(',');
    selected = [];
    for (let [index, id] of ids.entries()) {
      selected.push({
        id: id,
        name: names[index]
      })
    }
    setSelected(selected);
    setMenusMultiple(list[index].multiple);
    setMenus(list[index].data);
    if (activeIndex >= 0) { // 隐藏弹框
      setActiveIndex(-1);
      setShow(false);
    } else { // 显示弹框
      setActiveIndex(index);
      setShow(true);
    }
  }
  function handleClickMask (e) {
    setActiveIndex(-1);
    setShow(false);
    if (dialogProps && dialogProps.maskAttribute && dialogProps.maskAttribute.onClick) {
      dialogProps.maskAttribute.onClick(e)
    }
  }
  // 选中项是否是根节点
  function selectedIsRoot (selected) {
    if (!listRoot || !listRoot.length) return false;
    if (!selected || !selected.length) return true;
    if (selected.length === 1) {
      if (menusMultiple) {
        return selected[0].isroot === '1'
      }
      for (let tab of listRoot) {
        if (tab.id === selected[0].id) return true;
      }
    }
    return false;
  }
  function handleSelected (e, value, selected, data) {
    const newTabs = Object.clone(tabs);
    // 判断是否是根节点
    let isRoot = selectedIsRoot(selected);
    if (!selected || !selected.length) {
    } else {
      // 单选展开
      if (selected[0].children && selected[0].children.length > 0) return;
      
      // 选中id和name
      let id = [];
      let name = [];
      for (let selectedItem of selected) {
        id.push(selectedItem.id);
        name.push(selectedItem.name);
      }
      id = id.join(',');
      name = name.join(',');
      // 设置选中的id和name
      newTabs[activeIndex].id = id;
      newTabs[activeIndex].name = name;
    }
    
    // 删除增加的ricon属性
    for (let tab of newTabs) {
      delete tab.ricon
    }
    // 如果选中根节点
    if (isRoot) {
      newTabs[activeIndex].name = listRoot[activeIndex].name;
      newTabs[activeIndex].id = listRoot[activeIndex].id;
    }
    setActiveIndex(-1);
    setShow(false);
    // 触发onChange事件
    setSelected(selected);
    let names = [];
    if (newTabs && newTabs.length) {
      names = newTabs.map((tab) => {
        return tab.name;
      });
      names = names.join(',');
    }
    if (onChange) onChange(e, names, newTabs);
  }
  return (
    <Fragment>
      <Tabbar
        disabled={disabled}
        ref={refElTabbar}
        exceptOnClickActive={false}
        list={tabs}
        onChange={handleClickTab}
        activeIndex={activeIndex}
        className="tabbar-dropdown tabbar-tiled border-b"
        {...tabbarProps}
      />
      <DropdownDialog
        show={show}
        dialogProps={{
          ...(dialogProps || {}),
          maskAttribute: {
            ...(dialogProps && dialogProps.maskAttribute ? dialogProps.maskAttribute : {}),
            onClick: handleClickMask,
            style: {
              top: offsetTop + 'px',
              ...(dialogProps && dialogProps.maskAttribute && dialogProps.maskAttribute.style ? dialogProps.maskAttribute.style : {})
            }
          },
        }}
        multiple={menusMultiple}
        list={menus}
        selected={selected}
        onChange={handleSelected}
        menutiledProps={menutiledProps}
      />
    </Fragment>
  )
})

export default Dropdown
