import React, {useContext, useState, useEffect, useRef, forwardRef} from 'react';
import {createPortal} from 'react-dom';
import Context from '../Context/instance.js';
import treeData from './instance.data.js';
 
// 数据
let currentData = null; // 省市区
let streets = []; // 街道临时存储

const PickerDistrict = forwardRef(({
    portal,
    data = treeData,
    dataFormat,
    /*{
      parentPropertyName: 'pId', // 将pId改成parentid
      idPropertyName: 'id', // 将id改为id
      namePropertyName: 'name', // 将name改为name
      childPropertyName: 'child',  // 将child改为children
    }*/
    getData, // 异步获取数据
    split = '-',

    type = '', // province | city | district | street
    show,
    value, // '北京-东城区'
    selected, // [{id: '', name: ''}]

    maskAttribute = {},
    submitAttribute = {},
    cancelAttribute = {},

    // 获取街道信息, 因为街道信息过大, 所以必须通过请求获取, 返回一个Promise对象
    getStreet,
    ...others
}, ref) => {
  // 声明ref
  const refElBody = useRef(null);
  // context
  const context = useContext(Context) || {};

  // 页签和列表
  let [tabs, setTabs] = useState([])
  let [tabIndex, setTabIndex] = useState(0)
  let [list, setList] = useState([])

  // 设置列表, 如果类型为省时, 则不显示直辖市, 类型为市时, 则不显示直辖市的区
  function isLeaf () { // 判断点击的是否是底层
    if (type === 'province') {
      if (tabIndex === 0) return true;
    } else if (type === 'city') {
      if (tabIndex === 1) return true;
    } else if (type === 'district') {
      if (tabIndex === 2) return true;
    }
    return false;
  }

  // 获取父节点下所有的子节点
  function getParentChildren (parentid) {
    if (!parentid || parentid === '-1') {
      return currentData;
    }
    let parent = currentData.getDeepTreeNode(parentid)
    return parent.children
  }

  // 根据key或者name获取tabs, property用于区分是key还是value比较
  let initTabs = [];
  function getTabs (values, property) {
    if (!values || !values.length) return null
    if (property !== 'id' || property !== 'name') property = 'name'
    initTabs = []
    var levels = 0 // 层级
    function getRow (parentid, list, value) {
      for (let item of list) {
        // 模糊匹配
        if (item[property].indexOf(value) > -1 || value.indexOf(item[property]) > -1) {
          initTabs.push({
            parentid: parentid,
            ...item
          })
          const children = item.children;
          // 下一层级
          levels++
          if (values[levels] && children) {
            getRow(item.id, children, values[levels])
          }
        }
      }
    }
    getRow('', currentData, values[0])
    // 如果省市区不对,则返回空
    return initTabs
  }

  // 数据初始化
  useEffect(() => {
    initCurrentData();
  }, [data]); // eslint-disable-line
  // 初始化数据
  async function initCurrentData () {
    // 初始化数据
    currentData = null;
    if (typeof getData === 'function') {
      currentData = await getData();
    } else if (Array.isArray(data)){
      currentData = data;
    }
    if (currentData && currentData.length) {
      if (dataFormat && (dataFormat.parentPropertyName || dataFormat.namePropertyName || dataFormat.idPropertyName || dataFormat.childPropertyName)) {
        try {
          let dataStr = JSON.stringify(currentData);
          if (dataFormat.parentPropertyName) {
            dataStr = dataStr.replace(new RegExp(dataFormat.parentPropertyName, 'igm'), 'parentid');
          }
          if (dataFormat.namePropertyName) {
            dataStr = dataStr.replace(new RegExp(dataFormat.namePropertyName, 'igm'), 'name');
          }
          if (dataFormat.idPropertyName) {
            dataStr = dataStr.replace(new RegExp(dataFormat.idPropertyName, 'igm'), 'id');
          }
          if (dataFormat.childPropertyName) {
            dataStr = dataStr.replace(new RegExp(dataFormat.childPropertyName, 'igm'), 'parentid');
          }
          currentData = JSON.parse(dataStr);
        } catch (error) {
          currentData = null;
        }
      } else {
        currentData = data;
      }
    }
    
    // 初始化tabs
    if (selected && selected.length) {
      initTabs = getTabs(selected.map((item) => { // eslint-disable-line
        return item.id
      }), 'id')
    } else if (value) {
      initTabs = getTabs(value.split(split || '-'), 'name')
    }
    if (initTabs && initTabs.length) {
      initTabs[initTabs.length - 1].name = '请选择'
    } else {
      initTabs[0] = {
        parentid: '',
        id: '',
        name: '请选择'
      }
    }
    // 初始化列表
    let initList = getParentChildren(initTabs[initTabs.length - 1].parentid || '')
    setTabs(initTabs)
    setTabIndex(initTabs.length - 1)
    setList(initList)
  }

  // 如果列表发生变化, 则查找选中项
  useEffect(() => {
    if (!refElBody || !refElBody.current) {
      return;
    }
    let activeEl = refElBody.current.querySelector('.active')
    if (activeEl) {
      refElBody.current.scrollTop = activeEl.offsetTop - activeEl.clientHeight * 2 - 20;
    }
  }, [list]);

  // 点击面板
  function onClickPanel (e) {
    e.stopPropagation()
  }
  // 点击tab
  function onClickTab (tab, index) {
    // 点击街道
    if (tab.isStreet && streets && streets.length) {
      setTabIndex(index)
      setList(streets)
      return
    }
    // 点击非街道
    let children = getParentChildren(tab.parentid)
    if (children) {
      setTabIndex(index)
      setList(children)
    }
  }
  // 构建选中项
  function getOptions (lastOption) {
    let options = Object.clone(tabs)
    options[options.length - 1] = lastOption
    return options
  }
  function getOptionsStr (options) {
    let val = [];
    for (let option of options) {
      val.push(option.name)
    }
    return val.join(split)
  }
  // 提交
  function onSubmit (e, option) {
    let options = getOptions(option)
    let optionsStr = getOptionsStr(options)
    if (submitAttribute && submitAttribute.onClick) {
      submitAttribute.onClick(e, optionsStr, options)
    }
  }
  // 点击选项
  async function onClickOption (e, option) {
    // 截取tabs
    let tabLen = tabIndex + 1
    let spliceTabs = Object.clone(tabs).splice(0, tabLen)

    // 修改当前选中项
    spliceTabs[tabIndex] = option;

    // 因为useState是异步的, 直接提交会提交上一次的值
    tabs = spliceTabs;

    // 如果设置类型为省市区, 则直接提交
    if (isLeaf()) {
      setTabs(spliceTabs)
      onSubmit(e, option);
      return;
    }

    // 没有children, 并且有街道请求, 则获取街道
    if (!option.children || !option.children.length) {
      if (!option.isStreet && getStreet) {
        streets = await getStreet(option.id)
        // 如果返回不是数组, 则认为返回错误
        if (streets instanceof Array === false) {
          return
        }
        // 返回街道为空直接提交
        if (!streets || !streets.length) {
          setTabs(spliceTabs)
          onSubmit(e, option)
          return
        }
        // 增加街道标识
        streets = (streets || []).map((street) => {
          street.isStreet = true
          return street
        })
        setList(streets)
        // 设置tabs
        // spliceTabs[spliceTabs.length - 1].name = option.name
        spliceTabs.push({
          parentid: option.id,
          id: '',
          name: '请选择'
        })
        setTabs(spliceTabs)
        setTabIndex(spliceTabs.length - 1)
        return
      }
      // 街道直接提交
      setTabs(spliceTabs)
      onSubmit(e, option);
      return;
    }

    // 补充请选择的空项
    spliceTabs.push({
      parentid: '',
      id: '',
      name: '请选择'
    });

    setTabs(spliceTabs)
    setTabIndex(tabLen)
    
    // 设置下级list
    setList(option.children)
  }
  return createPortal(
    <div
      ref={ref}
      {...maskAttribute}
      className={`mask picker-district-mask${maskAttribute.className ? ' ' + maskAttribute.className : ''}${show ? ' active' : ''}`}
    >
      <div
        data-animation="slideUp"
        {...others}
        className={`picker-district${others.className ? ' ' + others.className : ' popup-animation bottom-center'}${show ? ' active' : ''}`}
        onClick={onClickPanel}
      >
        <div className="picker-district-header">
          请选择所在地区
        </div>
        <div className="picker-district-tabbar">
          {tabs.map((tab, index) => {
            return <div onClick={() => onClickTab(tab, index)} className={`picker-district-tab${index === tabIndex ? ' active' : ''}`} key={index}>
              {tab.name}
            </div>
          })}
        </div>
        <div className="picker-district-body" ref={refElBody}>
          {list && list.map((item, index) => {
            return <div key={index} onClick={(e) => onClickOption(e, item)} className={`picker-district-option${tabs[tabIndex].id === item.id ? ' active' : ''}`}>
              <div className="picker-district-option-icon"></div>
              <div className="picker-district-option-caption">{item.name}</div>
            </div>
          })}
        </div>
      </div>
    </div>,
    portal || context.portal || document.getElementById('root') || document.body
  );
})

export default PickerDistrict;
