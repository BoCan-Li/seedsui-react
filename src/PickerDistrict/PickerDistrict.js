import React, { useContext, useState, useEffect } from 'react';
import {createPortal} from 'react-dom';
import Context from '../Context/instance.js';
import treeData from './instance.data.js';
let flattenData = []

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

    type = 'district', // district | city
    show,
    value, // '北京-东城区'
    valueForKey, // '110000-110101'

    maskAttribute = {},
    submitAttribute = {},
    cancelAttribute = {},
    ...others
}) {
  // context
  const context = useContext(Context) || {};
  // 全局配置变量
  let parentProperty = dataFormat.parentName || 'parentid';
  let keyProperty = dataFormat.keyName || 'key';
  let valueProperty = dataFormat.valueName || 'value';
  let childProperty = dataFormat.childName || 'children';
  // 页签和列表
  let [tabs, setTabs] = useState([])
  let [tabIndex, setTabIndex] = useState(0)
  let [list, setList] = useState([])
  // 获取父节点下所有的子节点
  function getParentList (parentid) {
    if (!parentid || parentid === '-1') {
      return data;
    }
    let parent = data.getDeepTreeNode(parentid, parentProperty, keyProperty)
    return parent[childProperty]
  }
  // 根据key或者name获取tabs, property用于区分是key还是value比较
  function getTabs (values, property) {
    if (!values || !values.length) return null
    if (property !== keyProperty || property !== valueProperty) property = valueProperty
    // 如果values是中文, 属性则使用value比较, 如果是其它的
    var tabs = []
    var levels = 0 // 层级
    function getRow (parentid, list, value) {
      for (let item of list) {
        // 模糊匹配
        if (item[property].indexOf(value) > -1 || value.indexOf(item[property]) > -1) {
          tabs.push({
            [parentProperty]: parentid,
            ...item
          })
          const children = item[childProperty];
          // 下一层级
          levels++
          if (values[levels]) {
            getRow(item[keyProperty], children, values[levels])
          }
        }
      }
    }
    getRow('', data, values[0])
    // 如果省市区不对,则返回空
    return tabs
  }
  // 初始化tabs
  let initTabs = [];
  if (valueForKey) {
    initTabs = getTabs(valueForKey.split(split || '-'), keyProperty)
  } else if (value) {
    initTabs = getTabs(value.split(split || '-'), valueProperty)
  }
  if (initTabs && initTabs.length) {
    initTabs[initTabs.length - 1][valueProperty] = '请选择'
  } else {
    initTabs[initTabs.length - 1] = {
      [parentProperty]: '',
      [keyProperty]: '',
      [valueProperty]: '请选择'
    }
  }
  // 初始化列表
  let initList = getParentList(initTabs[initTabs.length - 1][parentProperty] || '')

  useEffect(() => {
    setTabs(initTabs)
    setTabIndex(initTabs.length - 1)
    setList(initList)
  }, [data]);

  // 点击面板
  function onClickPanel (e) {
    e.stopPropagation()
  }
  // 点击tab
  function onClickTab (tab, index) {
    let parents = getParentList(tab[parentProperty])
    if (parents) {
      setTabIndex(index)
      setList(parents)
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
  // 点击选项
  function onClickOption (e, option) {
    if (!option[childProperty] || !option[childProperty].length) {
      let options = getOptions(option)
      let optionsStr = getOptionsStr(options)
      if (submitAttribute && submitAttribute.onClick) {
        submitAttribute.onClick(e, optionsStr, options)
      }
      return;
    }
    // 截取tabs
    let tabLen = tabIndex + 1
    let spliceTabs = Object.clone(tabs).splice(0, tabLen)
    // 修改当前选中项
    spliceTabs[tabIndex] = option;
    // 补充请选择的空项
    spliceTabs.push({
      [parentProperty]: '',
      [keyProperty]: '',
      [valueProperty]: '请选择'
    });
    console.log(spliceTabs)

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
        <div className="picker-district-body">
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
