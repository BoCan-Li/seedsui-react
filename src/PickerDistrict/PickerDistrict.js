// require (PrototypeArray.js), 使用了: deepTree, getDeepTreeNodesByNames
import React, {useContext, useState, useEffect, useRef, forwardRef} from 'react';
import {createPortal} from 'react-dom';
import Context from '../Context/instance.js';
import treeData from './china.js';
 
// 数据
let initTabs = []; // 根据key或者name获取tabs, property用于区分是key还是value比较
// 国家
let currentCountrySelected = null;
let currentCountry = null;
// 省市区
let currentDataSelected = null;
let currentData = null;
// 街道临时存储
let streets = [];

const PickerDistrict = forwardRef(({
    portal,
    // 获取国家数据
    country,
    getCountry,

    // 获取省市区数据
    data = treeData,
    dataFormat,
    /*{
      parentPropertyName: 'pId', // 将pId改成parentid
      idPropertyName: 'id', // 将id改为id
      namePropertyName: 'name', // 将name改为name
      childPropertyName: 'child',  // 将child改为children
    }*/
    getData, // 异步获取省市区数据
    firstStageCitys = ['北京', '天津', '上海', '重庆'], // 直辖市特别市没有省
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
  const locale = context.locale || function (remark) {return remark || ''};

  // 页签和列表
  let [tabs, setTabs] = useState([])
  let [tabIndex, setTabIndex] = useState(0)
  let [list, setList] = useState([])
  let [errMsg, setErrMsg] = useState('');
  let [loading, setLoading] = useState(false);

  // 设置列表, 如果类型为省时, 则不显示直辖市, 类型为市时, 则不显示直辖市的区
  function isLeaf () { // 判断点击的是否是底层
    if (type === 'province') {
      if (tabIndex === 0) return true;
    } else if (type === 'city') {
      if (tabIndex === 1) return true;
      // 直辖市特别市没有省, 为0级节点
      if (firstStageCitys.indexOf(tabs[0].name.replace('市', '')) !== -1) {
        return true;
      }
    } else if (type === 'district') {
      if (tabIndex === 2) return true;
      // 直辖市特别市没有省, 它们的区为1级节点
      if (tabIndex === 1 && firstStageCitys.indexOf(tabs[0].name) !== -1) {
        return true;
      }
    }
    return false;
  }

  // 获取父节点下所有的子节点
  function getParentChildren (parentid) {
    if (!parentid || parentid === '-1') {
      return currentData;
    }
    if (currentData && currentData.length) {
      let parent = currentData.getDeepTreeNode(parentid)
      return parent.children
    }
    setErrMsg(locale('暂无数据', 'no_data'));
    return []
  }

  // 数据初始化
  useEffect(() => {
    if (show) {
      loadCurrentData();
    }
  }, [show]); // eslint-disable-line
  // 获取数据
  async function loadCurrentData () {
    // 初始化数据
    let newData = null;
    if (typeof getData === 'function') {
      setLoading(true);
      newData = await getData();
      if (typeof newData === 'string') {
        setErrMsg(newData)
      }
      if (!newData) {
        setErrMsg(locale('获取数据失败', 'hint_getdata_failed'))
      }
      setLoading(false);
    } else if (Array.isArray(data)){
      newData = data;
    }
    // 格式化数据
    if (newData && newData.length && dataFormat && (dataFormat.parentPropertyName || dataFormat.namePropertyName || dataFormat.idPropertyName || dataFormat.childPropertyName)) {
      try {
        let dataStr = JSON.stringify(newData);
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
        newData = JSON.parse(dataStr);
      } catch (error) {
        newData = null;
      }
    }
    if (newData && newData.length) {
      currentData = newData.deepTree();
    } else {
      currentData = null;
    }
    // 初始化选中项
    await loadSelected();
    // 初始化tabbar
    initTabBar();
    // 渲染页面
    if (currentData && currentData.length) {
      initList();
    }
  }
  // 获取选中数据
  async function loadSelected () {
    return new Promise(async (resolve) => {
      // 有选中数据直接返回选中数据
      if (selected && selected.length) {
        // 如果选中项的参数不全, 则返回空
        for (let item of selected) {
          if (!item.id || !item.name) {
            currentDataSelected = null;
            resolve(currentDataSelected);
            return currentDataSelected;
          }
        }
        currentDataSelected = selected;
        resolve(currentDataSelected);
        return currentDataSelected;
      }
      // 没有城市数据返回空
      if (!currentData || !currentData.length) {
        currentDataSelected = null;
        resolve(currentDataSelected);
        return currentDataSelected;
      }
      // 没有选中数据从value中取
      let values = [];
      if (value && value.split(split)) {
        values = value.split(split);
      }
      if (!values || !values.length) {
        currentDataSelected = null;
        resolve(currentDataSelected);
        return currentDataSelected;
      }
      // 根据values取出选中数据
      currentDataSelected = currentData.getDeepTreeNodesByNames(values);
      // 如果有街道时长度会不一致, 则需要查询街道
      if (currentDataSelected && currentDataSelected.length && currentDataSelected.length === values.length - 1) {
        let districtOption = currentDataSelected[currentDataSelected.length - 1]; // 获取区数据
        let streetName = values[values.length - 1]; // 获取街道名
        let success = await loadStreets(districtOption.id);
        // 返回街道为空直接提交
        if (success && (!Array.isArray(streets) || !streets || !streets.length)) {
          resolve(currentDataSelected);
          return currentDataSelected;
        }
        for (let street of streets) {
          if (street.name === streetName) {
            currentDataSelected.push(street);
            break;
          }
        }
      }
      resolve(currentDataSelected);
      return currentDataSelected;
    });
  }
  // 初始化tabs
  function initTabBar () {
    initTabs = [];
    if (currentDataSelected && currentDataSelected.length) {
      initTabs = Object.clone(currentDataSelected);
    }
    if (initTabs && initTabs.length) {
      if (!initTabs[initTabs.length - 1].name) {
        initTabs[initTabs.length - 1].name = '请选择'
      }
    } else {
      initTabs[0] = {
        parentid: '',
        id: '',
        name: '请选择'
      }
    }
    setTabs(initTabs)
    setTabIndex(initTabs.length - 1)
  }
  // 初始化列表
  async function initList () {
    let initList = getParentChildren(initTabs[initTabs.length - 1].parentid || '')
    // 如果末级节点没有列表, 则认为是街道
    if (!initList && initTabs[initTabs.length - 1].id) {
      await loadStreets(initTabs[initTabs.length - 2].id);
      if (Array.isArray(streets) && streets && streets.length) {
        initList = streets
      } else {
        initList = []
      }
    }
    setList(initList)
  }
  // 获取街道, 失败返回false, 成功返回true
  async function loadStreets (id) {
    return new Promise(async (resolve) => {
      setLoading(true);
      try {
        streets = await getStreet(id)
      } catch (error) {
        setErrMsg(locale('获取数据失败', 'hint_getdata_failed'))
        setLoading(false);
        streets = null;
        resolve(false);
        return;
      }
      setLoading(false);
      // 返回字符串, 说明有错
      if (typeof streets === 'string') {
        setErrMsg(streets)
        streets = null;
        resolve(false)
        return;
      }
      // 如果返回不是数组, 则认为没有街道
      if (!streets || streets instanceof Array === false) {
        streets = null;
        resolve(true)
        return;
      }
      // 增加街道标识
      streets = (streets || []).map((street) => {
        street.isStreet = true
        return street
      })
      resolve(true)
    })
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
    setErrMsg('');
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
        // 设置列表
        let success = await loadStreets(option.id);
        // 返回街道为空直接提交
        if (success && (!Array.isArray(streets) || !streets || !streets.length)) {
          setTabs(spliceTabs)
          onSubmit(e, option)
          return
        }
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
            return <div key={index} onClick={(e) => onClickOption(e, item)} className={`picker-district-option${tabs[tabIndex] && tabs[tabIndex].id === item.id ? ' active' : ''}`}>
              <div className="picker-district-option-icon"></div>
              <div className="picker-district-option-caption">{item.name}</div>
            </div>
          })}
        </div>
        {errMsg && <div className="picker-district-error">
          <div className="picker-district-error-icon"></div>
          <div className="picker-district-error-label">{errMsg}</div>
        </div>}
        {loading && <div className="picker-district-load">
          <div className="picker-district-load-icon"></div>
          <div className="picker-district-load-label">
            {locale('加载中...', 'in_loading')}
          </div>
        </div>}
      </div>
    </div>,
    portal || context.portal || document.getElementById('root') || document.body
  );
})

export default PickerDistrict;
