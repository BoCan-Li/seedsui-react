// require (PrototypeArray.js), 使用了: deepTree, getDeepTreeNodesByNames
import React, {useContext, useState, useEffect, useRef, forwardRef} from 'react';
import {createPortal} from 'react-dom';
import Context from '../Context/instance.js';
import treeData from './china.js';
 
// 数据
let initTabs = []; // 根据key或者name获取tabs, property用于区分是key还是value比较
// 选中项[{id: '', name: ''}]
let currentSelected = null;
// 国家
let currentCountries = null;
// 省市区
let currentData = null;
// 街道临时存储
let currentStreets = [];

const PickerDistrict = forwardRef(({
  portal,
  // 获取国家数据, 不传则默认中国
  countries,
  getCountries,

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

  type = '', // country | province | city | district | street (其中province、city、district、street,只有中国时才生效, 因为只有中国有省市区)
  show,
  value, // '北京-东城区'
  selected, // [{id: '', name: ''}]

  maskAttribute = {},
  submitAttribute = {},
  cancelAttribute = {},

  // 获取街道信息, 因为街道信息过大, 所以必须通过请求获取, 返回一个Promise对象
  getStreets,
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
    if (type === 'country') {
      if (tabIndex === 0) return true;
    }
    // 没有国家且为中国行政区划时才生效, 因为只有中国有省市区
    if (!currentCountries || !currentCountries.length) {
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
    }
    return false;
  }

  // 获取省市区父节点下所有的子节点
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
  // 第一步: 获取国家和省市区
  async function loadCurrentData () {
    // 获取国家
    if (countries || typeof getCountries === 'function') {
      let countriesSuccess = await loadCountries();
      if (!countriesSuccess) return;
    }
    // 获取省市区
    await loadData();
    // 初始化选中项
    await loadSelected();
    // 初始化tabbar
    initTabBar();
    // 渲染页面
    if ((currentCountries && currentCountries.length) || (currentData && currentData.length)) {
      initList();
    }
  }
  // 第二步: 获取选中数据
  async function loadSelected () {
    return new Promise(async (resolve) => {
      // 有选中数据直接返回选中数据
      if (selected && selected.length) {
        // 如果选中项的参数不全, 则返回空
        for (let item of selected) {
          if (!item.id || !item.name) {
            currentSelected = null;
            resolve(currentSelected);
            return currentSelected;
          }
        }
        currentSelected = selected;
        resolve(currentSelected);
        return currentSelected;
      }

      // 没有选中数据从value中取
      let values = [];
      if (value && value.split(split)) {
        values = value.split(split);
      }
      if (!values || !values.length) {
        currentSelected = null;
        resolve(currentSelected);
        return currentSelected;
      }

      currentSelected = null;
      // 如果有国家
      if (Array.isArray(currentCountries) && currentCountries.length) {
        let country = getCountryByName(values.shift());
        if (country) currentSelected = [country];
      }
      // 没有城市数据返回直接返回
      if (!currentData || !currentData.length) {
        resolve(currentSelected);
        return currentSelected;
      }
      // 根据values取出选中数据
      currentSelected = (currentSelected || []).concat(currentData.getDeepTreeNodesByNames(values));
      // 如果有街道时长度会不一致, 则需要查询街道
      if (currentSelected && currentSelected.length && currentSelected.length === (currentCountries && currentCountries.length ? values.length : values.length - 1)) {
        let districtOption = currentSelected[currentSelected.length - 1]; // 获取区数据
        let streetName = values[values.length - 1]; // 获取街道名
        let success = await loadStreets(districtOption.id);
        // 返回街道为空直接提交
        if (success && (!Array.isArray(currentStreets) || !currentStreets || !currentStreets.length)) {
          resolve(currentSelected);
          return currentSelected;
        }
        for (let street of currentStreets) {
          if (street.name === streetName) {
            currentSelected.push(street);
            break;
          }
        }
      }
      resolve(currentSelected);
      return currentSelected;
    });
  }
  // 第三步: 初始化tabs
  function initTabBar () {
    initTabs = [];
    if (currentSelected && currentSelected.length) {
      initTabs = Object.clone(currentSelected);
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
    // 选中国家与选中省市区有些区别, 选中国家需要直接显示省份, 所以要默认增加一项
    if (initTabs.length === 1 && type !== 'country' && initTabs[0].id && currentCountries && currentCountries.length) {
      initTabs.push({
        parentid: '',
        id: '',
        name: '请选择'
      });
    }
    setTabs(initTabs)
    setTabIndex(initTabs.length - 1)
  }
  // 第四步: 结合选中数据, 初始化列表
  async function initList () {
    let initList = [];
    // 选中国家与选中省市区有些区别, 选中国家需要直接显示省份
    if (initTabs.length <= 2 && currentCountries && currentCountries.length) {
      if (initTabs.length === 2) { // 已有选中国家, 直接展示省列表
        await loadData(initTabs[initTabs.length - 2].id);
        if (currentData) initList = currentData;
      } else if (initTabs.length === 1) { // 没有选中国家, 显示国家列表
        initList = currentCountries;
      }
    } else { // 选中省市区街道, 则显示当前选中的层级列表
      initList = getParentChildren(initTabs[initTabs.length - 1].parentid || '')
      if (!initList && initTabs[initTabs.length - 2].id) { // 如果末级节点没有列表, 则认为是街道
        await loadStreets(initTabs[initTabs.length - 2].id);
        if (currentStreets && currentStreets.length) initList = currentStreets;
      }
    }
    setList(initList)
  }

  // 工具方法: 获取国家, 失败返回false, 成功返回true
  function formatCountries (list) {
    return (list || []).map((item) => {
      item.isCountry = true
      return item
    })
  }
  function getCountryByName (countryName) {
    for (let item of currentCountries) {
      if (item.name.indexOf(countryName) !== -1 || countryName.indexOf(item.name) !== -1) {
        return item;
      }
    }
    return null;
  }
  async function loadCountries () {
    return new Promise(async (resolve) => {
      // 如果传入国家数据, 则使用此数据
      if (Array.isArray(countries) && countries.length) {
        if (countries[0].id && countries[0].name) {
          currentCountries = formatCountries(countries);
          resolve(currentCountries);
          return currentCountries;
        }
        currentCountries = null;
        resolve(currentCountries);
        setErrMsg(`countries${locale('参数不正确', 'wrong_parameter')}`)
        return currentCountries;
      }
      // 如果没有获取国家的方法, 则返回空
      if (!getCountries) {
        currentCountries = null;
        resolve(currentCountries);
        return currentCountries;
      }
      // 有获取国家的方法时, 加载国家数据
      setLoading(true);
      try {
        currentCountries = await getCountries()
      } catch (error) {
        setErrMsg(locale('获取数据失败', 'hint_getdata_failed'))
        setLoading(false);
        currentCountries = null;
        resolve(currentCountries);
        return;
      }
      setLoading(false);
      // 返回字符串, 说明有错
      if (typeof currentCountries === 'string') {
        setErrMsg(currentCountries)
        currentCountries = null;
        resolve(currentCountries)
        return;
      }
      // 如果返回不是数组, 则认为没有街道
      if (!currentCountries || currentCountries instanceof Array === false) {
        currentCountries = null;
        resolve(currentCountries)
        return;
      }
      resolve(formatCountries(currentCountries))
    })
  }

  // 工具方法: 获取省市区
  async function loadData (id) {
    return new Promise(async (resolve) => {
      // 如果有国家, 则加载此国家下的省市区
      if (Array.isArray(currentCountries) && currentCountries.length) {
        // 获取选中国家的id, 用于获取此国家下的省市区
        if (!id && (value || selected)) {
          if (Array.isArray(selected) && selected.length) {
            id = selected[0].id;
          } else if (value) {
            let countryName = value.split(split)[0];
            let country = getCountryByName(countryName);
            if (country && country.id) id = country.id;
          }
        }
        // 没有国家id, 说明还没有选中的国家
        if (!id) {
          currentData = null;
          resolve(currentData)
          return currentData;
        }
      }
      // 获取省市区
      let newData = null;
      if (typeof getData === 'function') {
        setLoading(true);
        newData = await getData(id);
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
      resolve(currentData)
    });
  }

  // 工具方法: 获取街道, 失败返回false, 成功返回true
  async function loadStreets (id) {
    return new Promise(async (resolve) => {
      setLoading(true);
      try {
        currentStreets = await getStreets(id)
      } catch (error) {
        setErrMsg(locale('获取数据失败', 'hint_getdata_failed'))
        setLoading(false);
        currentStreets = null;
        resolve(currentStreets);
        return;
      }
      setLoading(false);
      // 返回字符串, 说明有错
      if (typeof currentStreets === 'string') {
        setErrMsg(currentStreets)
        currentStreets = null;
        resolve(currentStreets)
        return;
      }
      // 如果返回不是数组, 则认为没有街道
      if (!currentStreets || currentStreets instanceof Array === false) {
        currentStreets = null;
        resolve(currentStreets)
        return;
      }
      // 增加街道标识
      currentStreets = (currentStreets || []).map((street) => {
        street.isStreet = true
        return street
      })
      resolve(currentStreets)
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
    } else {
      refElBody.current.scrollTop = 0;
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
    if (tab.isStreet && currentStreets && currentStreets.length) {
      setTabIndex(index)
      setList(currentStreets)
      return
    }
    // 点击国家
    if (index === 0 && currentCountries && currentCountries.length) {
      setTabIndex(index)
      setList(currentCountries)
      return
    }
    // 点击省(有国家的情况下), 其parentid为国家id, 所以在currentData里找不到数据
    if (index === 1 && currentCountries && currentCountries.length) {
      setTabIndex(index)
      setList(currentData)
      return
    }
    
    // 点击省市区
    let children = getParentChildren(tab.parentid)
    // 点击末级“请选择”, 直接获取上级的children
    if (index === tabs.length - 1 && !tab.parentid && tabs.length > 1) {
      children = getParentChildren(tabs[index - 1].id)
    }

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
  async function handleClickOption (e, option) {
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

    if (option.isCountry) { // 点击国家
      await loadData(option.id);
      // 设置下级list
      setList(currentData)
    } else { // 点击省市区
      // 没有children, 并且有街道请求, 则获取街道
      if (!option.children || !option.children.length) {
        if (!option.isStreet && getStreets) {
          // 设置列表
          await loadStreets(option.id);
          // 返回街道为空直接提交
          if (!Array.isArray(currentStreets) || !currentStreets || !currentStreets.length) {
            setTabs(spliceTabs)
            onSubmit(e, option)
            return
          }
          setList(currentStreets)

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
      // 设置下级list
      setList(option.children)
    }

    // 补充请选择的空项
    spliceTabs.push({
      parentid: '',
      id: '',
      name: '请选择'
    });

    setTabs(spliceTabs)
    setTabIndex(tabLen)
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
            return <div key={index} onClick={(e) => handleClickOption(e, item)} className={`picker-district-option${tabs[tabIndex] && tabs[tabIndex].id === item.id ? ' active' : ''}`}>
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
