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
  const [selected, setSelected] = useState('');
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
        id: item.id,
        name: item.name,
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
          maskTop = refElTabbar.current.offsetTop + 40;
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
  
  function onClickTab (e, item, index) {
    setSelected([tabs[index]]);
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
  function onClickMask (e) {
    setActiveIndex(-1);
    setShow(false);
    if (dialogProps && dialogProps.maskAttribute && dialogProps.maskAttribute.onClick) {
      dialogProps.maskAttribute.onClick(e)
    }
  }
  // 构建新数据
  function buildList (newTabs) {
    let newList = Object.clone(list);
    newTabs.forEach((item, index) => {
      newList[index].id = item.id;
      newList[index].name = listRoot && listRoot[index] && listRoot[index].id === item.id ? listRoot[index].name : item.name;
    });
    return newList;
  }
  function onSelected (e, value, selected, data) {
    if (!selected || !selected.length) return;
    const item = selected[0];
    if (item.children && item.children.length > 0) return;
    const newTabs = Object.clone(tabs);
    // 如果选中的标题是全部,则显示原始标题,例如:点击分类,选择全部,则应当显示分类
    if (item.id === list[activeIndex].id) {
      newTabs[activeIndex].id = list[activeIndex].id;
      newTabs[activeIndex].name = list[activeIndex].name;
    // 设置选中的标题显示在tabbar上
    } else {
      newTabs[activeIndex].id = item.id;
      newTabs[activeIndex].name = item.name;
    }
    if (!menusMultiple){
      setActiveIndex(-1);
      setShow(false);
    }
    // 触发onChange事件
    if (onChange) onChange(e, buildList(newTabs));
  }
  return (
    <Fragment>
      <Tabbar
        disabled={disabled}
        ref={refElTabbar}
        exceptOnClickActive={false}
        list={tabs}
        onClick={onClickTab}
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
            onClick: onClickMask,
            style: {
              top: offsetTop + 'px',
              ...(dialogProps && dialogProps.maskAttribute && dialogProps.maskAttribute.style ? dialogProps.maskAttribute.style : {})
            }
          },
        }}
        multiple={menusMultiple}
        list={menus}
        selected={selected}
        onChange={onSelected}
        menutiledProps={menutiledProps}
      />
    </Fragment>
  )
})

export default Dropdown
