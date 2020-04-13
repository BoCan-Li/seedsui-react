import React, { useContext, useState, useEffect, useRef } from 'react';
import {createPortal} from 'react-dom';
import Context from '../Context/instance.js';
import treeData from './instance.data.js';
let streets = [] // 街道临时存储

function PickerDistrict({
    portal,
    data = treeData,
    dataFormat = {
      parentName: 'parentid',
      keyName: 'key',
      valueName: 'value',
      childName: 'children'
    },
    split = '-',

    type = '', // province | city | district | street
    show,
    value, // '北京-东城区'
    valueForKey, // '110000-110101'

    maskAttribute = {},
    submitAttribute = {},
    cancelAttribute = {},

    // 获取街道信息, 因为街道信息过大, 所以必须通过请求获取, 返回一个Promise对象
    getStreet,
    ...others
}) {
  // 声明ref
  const refList = useRef(null);
  // context
  const context = useContext(Context) || {};
  let parentProperty = dataFormat.parentName || 'parentid';
  let keyProperty = dataFormat.keyName || 'key';
  let valueProperty = dataFormat.valueName || 'value';
  let childProperty = dataFormat.childName || 'children';
  
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
      return data;
    }
    let parent = data.getDeepTreeNode(parentid, parentProperty, keyProperty)
    return parent[childProperty]
  }
  // 根据key或者name获取tabs, property用于区分是key还是value比较
  let initTabs = [];
  function getTabs (values, property) {
    if (!values || !values.length) return null
    if (property !== keyProperty || property !== valueProperty) property = valueProperty
    initTabs = []
    var levels = 0 // 层级
    function getRow (parentid, list, value) {
      for (let item of list) {
        // 模糊匹配
        if (item[property].indexOf(value) > -1 || value.indexOf(item[property]) > -1) {
          initTabs.push({
            [parentProperty]: parentid,
            ...item
          })
          const children = item[childProperty];
          // 下一层级
          levels++
          if (values[levels] && children) {
            getRow(item[keyProperty], children, values[levels])
          }
        }
      }
    }
    getRow('', data, values[0])
    // 如果省市区不对,则返回空
    return initTabs
  }

  // 数据初始化
  useEffect(() => {
    console.log('地区初始化')
    // 初始化tabs
    if (valueForKey) {
      initTabs = getTabs(valueForKey.split(split || '-'), keyProperty)
    } else if (value) {
      initTabs = getTabs(value.split(split || '-'), valueProperty)
    }
    if (initTabs && initTabs.length) {
      initTabs[initTabs.length - 1][valueProperty] = '请选择'
    } else {
      initTabs[0] = {
        [parentProperty]: '',
        [keyProperty]: '',
        [valueProperty]: '请选择'
      }
    }
    // 初始化列表
    let initList = getParentChildren(initTabs[initTabs.length - 1][parentProperty] || '')
    setTabs(initTabs)
    setTabIndex(initTabs.length - 1)
    setList(initList)
  }, [data]);

  // 如果列表发生变化, 则查找选中项
  useEffect(() => {
    if (!refList || !refList.current) {
      return;
    }
    let activeEl = refList.current.querySelector('.active')
    if (activeEl) {
      refList.current.scrollTop = activeEl.offsetTop - activeEl.clientHeight * 2 - 20;
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
    let children = getParentChildren(tab[parentProperty])
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
      val.push(option[valueProperty])
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
    if (!option[childProperty] || !option[childProperty].length) {
      if (!option.isStreet && getStreet) {
        streets = await getStreet(option[keyProperty])
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
        // spliceTabs[spliceTabs.length - 1][valueProperty] = option[valueProperty]
        spliceTabs.push({
          [parentProperty]: option[keyProperty],
          [keyProperty]: '',
          [valueProperty]: '请选择'
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
      [parentProperty]: '',
      [keyProperty]: '',
      [valueProperty]: '请选择'
    });

    setTabs(spliceTabs)
    setTabIndex(tabLen)
    
    // 设置下级list
    setList(option[childProperty])
  }
  return createPortal(
    <div
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
              {tab[valueProperty]}
            </div>
          })}
        </div>
        <div className="picker-district-body" ref={refList}>
          {list && list.map((item, index) => {
            return <div key={index} onClick={(e) => onClickOption(e, item)} className={`picker-district-option${tabs[tabIndex][keyProperty] === item[keyProperty] ? ' active' : ''}`}>
              <div className="picker-district-option-icon"></div>
              <div className="picker-district-option-caption">{item[valueProperty]}</div>
            </div>
          })}
        </div>
      </div>
    </div>,
    portal || context.portal || document.getElementById('root') || document.body
  );
}

export default PickerDistrict;
