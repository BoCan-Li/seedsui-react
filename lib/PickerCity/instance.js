'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _instance = require('./../Picker/instance.js');

var _instance2 = _interopRequireDefault(_instance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PickerCity = function PickerCity(params) {
  var _ref;

  // 参数改写
  var onCityClickSubmit = params.onClickSubmit;
  var onCityScrollEnd = params.onScrollEnd;
  params.onClickSubmit = undefined;
  params.onScrollEnd = undefined;
  /* --------------------
    Model
    -------------------- */
  var defaults = {
    dataKeyPropertyName: 'key',
    dataValuePropertyName: 'value',
    dataChildPropertyName: 'children',

    split: '-',

    viewType: 'district',
    data: null,

    defaultProvinceKey: '',
    defaultCityKey: '',
    defaultDistrictKey: '',

    defaultProvince: '北京市',
    defaultCity: '东城区',
    defaultDistrict: '',

    provinceClass: 'text-center',
    cityClass: 'text-center',
    districtClass: 'text-center',

    onClickSubmit: function onClickSubmit(e) {
      e.activeText = getActiveText(e.activeOptions);
      setActiveKeys(e.activeOptions);
      if (onCityClickSubmit) onCityClickSubmit(e);
    },
    onScrollEnd: function onScrollEnd(e) {
      // var activeOption = e.activeSlot.values[e.activeSlot.activeIndex]
      var activeOption = e.activeOptions[e.activeSlot.index];
      if (e.activeSlot.index === 0) {
        // 滚动省
        var city = replaceCity(activeOption[s.params.dataKeyPropertyName]); // 修改第二项
        replaceDistrict(city[0][s.params.dataKeyPropertyName]); // 修改第三项
      } else if (e.activeSlot.index === 1) {
        // 滚动市
        replaceDistrict(activeOption[s.params.dataKeyPropertyName]); // 修改第三项
      }
      // 回调
      if (onCityScrollEnd) onCityScrollEnd(e);
    }
  };
  params = params || {};
  for (var def in defaults) {
    if (params[def] === undefined || params[def] === null) {
      params[def] = defaults[def];
    }
  }
  var s = new _instance2.default(params);

  // DefaultValue
  s.params.defaultValues = [(_ref = {}, (0, _defineProperty3.default)(_ref, s.params.dataKeyPropertyName, ''), (0, _defineProperty3.default)(_ref, s.params.dataValuePropertyName, '----'), _ref)];

  // Data
  if (!s.params.data) return;

  // 省、市、区数据
  s.province = null;
  s.city = null;
  s.district = null;
  // 省、市、区选中的key
  s.activeProvinceKey = null;
  s.activeCityKey = null;
  s.activeDistrictKey = null;

  // 设置默认值
  s.setActiveProvinceKey = function (key) {
    s.activeProvinceKey = ('' + key).replace(/(^\s*)|(\s*$)/, '');
  };
  s.setActiveCityKey = function (key) {
    s.activeCityKey = ('' + key).replace(/(^\s*)|(\s*$)/, '');
  };
  s.setActiveDistrictKey = function (key) {
    s.activeDistrictKey = ('' + key).replace(/(^\s*)|(\s*$)/, '');
  };

  /* --------------------
  Method
  -------------------- */
  // 设置数据
  s.setData = function (data, dataProperty) {
    if (data) s.params.data = data;
    if (dataProperty && dataProperty.dataKeyPropertyName) s.params.dataKeyPropertyName = dataProperty.dataKeyPropertyName;
    if (dataProperty && dataProperty.dataValuePropertyName) s.params.dataValuePropertyName = dataProperty.dataValuePropertyName;
    if (dataProperty && dataProperty.dataChildPropertyName) s.params.dataChildPropertyName = dataProperty.dataChildPropertyName;
  };
  // 根据省市区名获得keys,返回:['320000','320100','320105'],参数:['江苏省','南京市','建邺区']
  s.getKeysByValues = function (values) {
    var keys = [];
    for (var i = 0, province; province = s.params.data[i++];) {
      // eslint-disable-line
      // 获得省, 兼容简称模式: 例如"江苏省"和"江苏"也能匹配成功
      if (values[0] && (province[s.params.dataValuePropertyName].indexOf(values[0]) > -1 || values[0].indexOf(province[s.params.dataValuePropertyName]) > -1)) {
        keys.push(province[s.params.dataKeyPropertyName]);
        for (var j = 0, city; city = province[s.params.dataChildPropertyName][j++];) {
          // eslint-disable-line
          // 获得市
          if (values[1] && (city[s.params.dataValuePropertyName].indexOf(values[1]) > -1 || values[1].indexOf(city[s.params.dataValuePropertyName]) > -1)) {
            keys.push(city[s.params.dataKeyPropertyName]);
            if (values[2]) {
              for (var k = 0, district; district = city[s.params.dataChildPropertyName][k++];) {
                // eslint-disable-line
                // 获得区
                if (values[2] && (district[s.params.dataValuePropertyName].indexOf(values[2]) > -1 || values[2].indexOf(district[s.params.dataValuePropertyName]) > -1)) {
                  keys.push(district[s.params.dataKeyPropertyName]);
                  return keys;
                }
              }
            } else {
              return keys;
            }
          }
        }
      }
    }
    // 如果省市区不对,则返回第一个省第一个市
    return [s.params.data[0][s.params.dataKeyPropertyName], s.params.data[0][s.params.dataChildPropertyName][0][s.params.dataKeyPropertyName]];
  };
  // 根据省市区名获得keys,返回:['江苏省','南京市','建邺区'],参数:['320000','320100','320105']
  s.getValuesByKeys = function (keys) {
    var values = [];
    for (var i = 0, province; province = s.params.data[i++];) {
      // eslint-disable-line
      // 获得省, 兼容简称模式: 例如"江苏省"和"江苏"也能匹配成功
      if (keys[0] && province[s.params.dataKeyPropertyName] === keys[0]) {
        values.push(province[s.params.dataValuePropertyName]);
        for (var j = 0, city; city = province[s.params.dataChildPropertyName][j++];) {
          // eslint-disable-line
          // 获得市
          if (keys[1] && city[s.params.dataKeyPropertyName] === keys[1]) {
            values.push(city[s.params.dataValuePropertyName]);
            if (keys[2]) {
              for (var k = 0, district; district = city[s.params.dataChildPropertyName][k++];) {
                // eslint-disable-line
                // 获得区
                if (keys[2] && district[s.params.dataKeyPropertyName] === keys[2]) {
                  values.push(district[s.params.dataValuePropertyName]);
                  return values;
                }
              }
            } else {
              return values;
            }
          }
        }
      }
    }
    // 如果省市区不对,则返回第一个省第一个市
    return [s.params.data[0][s.params.dataValuePropertyName], s.params.data[0][s.params.dataChildPropertyName][0][s.params.dataValuePropertyName]];
  };
  // 获取value,根据key
  s.getValueByKey = function (key) {
    for (var i = 0, province; province = s.params.data[i++];) {
      // eslint-disable-line
      // 获得省, 兼容简称模式: 例如"江苏省"和"江苏"也能匹配成功
      if (province[s.params.dataKeyPropertyName] === key) return province[s.params.dataValuePropertyName];
      for (var j = 0, city; city = province[s.params.dataChildPropertyName][j++];) {
        // eslint-disable-line
        // 获得市
        if (city[s.params.dataKeyPropertyName] === key) return city[s.params.dataValuePropertyName];
        for (var k = 0, district; district = city[s.params.dataChildPropertyName][k++];) {
          // eslint-disable-line
          // 获得区
          if (district[s.params.dataKeyPropertyName] === key) return district[s.params.dataValuePropertyName];
        }
      }
    }
  };
  // 设置选中的省市区,参数:['江苏省','南京市','建邺区']
  s.setDefaultValues = function (argActiveValues) {
    var activeValues = argActiveValues || '';
    // 设置选中的key
    var keys = s.getKeysByValues(activeValues);
    if (keys && keys[0]) s.setActiveProvinceKey(keys[0]);
    if (keys && keys[1]) s.setActiveCityKey(keys[1]);
    if (keys && keys[2]) s.setActiveDistrictKey(keys[2]);
  };
  // 设置选中的省市区编码,参数:['320000','320100','320105']
  s.setDefaultKeys = function (argActiveKeys) {
    if (!Array.isArray(argActiveKeys) || argActiveKeys.length < 2) {
      return;
    }
    // 设置选中的key
    var keys = argActiveKeys;
    if (keys && keys[0]) s.setActiveProvinceKey(keys[0]);
    if (keys && keys[1]) s.setActiveCityKey(keys[1]);
    if (keys && keys[2]) s.setActiveDistrictKey(keys[2]);
  };

  // 获得选中的文字
  function getActiveText(activeOptions) {
    var activeValues = activeOptions.map(function (n, i, a) {
      return n[s.params.dataValuePropertyName];
    });
    var activeText = '';
    if (activeValues[0]) activeText += activeValues[0];
    if (activeValues[1]) activeText += s.params.split + activeValues[1];
    if (activeValues[2] && activeValues[2] !== s.params.defaultValues[0][s.params.dataValuePropertyName]) activeText += s.params.split + activeValues[2];
    return activeText;
  }
  // 设置选中的keys
  function setActiveKeys(activeOptions) {
    var activeKeys = activeOptions.map(function (n, i, a) {
      return n[s.params.dataKeyPropertyName];
    });
    if (activeKeys[0]) s.setActiveProvinceKey(activeKeys[0]);
    if (activeKeys[1]) s.setActiveCityKey(activeKeys[1]);
    if (activeKeys[2]) s.setActiveDistrictKey(activeKeys[2]);
  }

  // 获得第一层
  function getPureArray(array) {
    var arr = [];
    /* eslint-disable */
    for (var i = 0, opt; opt = array[i++];) {
      var _arr$push;

      arr.push((_arr$push = {}, (0, _defineProperty3.default)(_arr$push, s.params.dataKeyPropertyName, opt[s.params.dataKeyPropertyName]), (0, _defineProperty3.default)(_arr$push, s.params.dataValuePropertyName, opt[s.params.dataValuePropertyName]), _arr$push));
    }
    /* eslint-enable */
    return arr;
  }

  // 根据key获得children
  function getChildrenByKey(key) {
    // 如果没有传key，表示获得第一层
    if (!key) return getPureArray(s.params.data);
    // 如果传key，则找到对应key的子级
    /* eslint-disable */
    for (var i = 0, province; province = s.params.data[i++];) {
      if (province[s.params.dataKeyPropertyName] == key) return getPureArray(province[s.params.dataChildPropertyName]);
      for (var j = 0, city; city = province[s.params.dataChildPropertyName][j++];) {
        if (!city[s.params.dataChildPropertyName]) break;
        if (city[s.params.dataKeyPropertyName] == key) return getPureArray(city[s.params.dataChildPropertyName]);
      }
    }
    /* eslint-enable */
    return null;
  }
  /* ----------------
  Init
  ---------------- */
  /* // 替换省
  function replaceProvince (activeKey) {
    var provinces = getChildrenByKey()
    s.replaceSlot(0, provinces, activeKey || provinces[0][s.params.dataKeyPropertyName], s.params.cityClass)
    return provinces
  } */
  // 替换市
  function replaceCity(key, activeKey) {
    var citys = getChildrenByKey(key);
    s.replaceSlot(1, citys, activeKey || citys[0][s.params.dataKeyPropertyName], s.params.cityClass);
    return citys;
  }
  // 替换区
  function replaceDistrict(key, activeKey) {
    if (s.params.viewType !== 'district') return;
    var districts = getChildrenByKey(key);
    if (districts && districts.length && districts.length > 0) {
      s.replaceSlot(2, districts, activeKey || districts[0][s.params.dataKeyPropertyName], s.params.districtClass);
    } else {
      s.replaceSlot(2, s.params.defaultValues, s.params.defaultValues[s.params.dataKeyPropertyName], s.params.districtClass);
    }
  }
  // 添加省
  function addProvince() {
    s.province = getChildrenByKey();
    if (!s.activeProvinceKey) {
      s.setActiveProvinceKey(s.province[0][s.params.dataKeyPropertyName]);
    }
    s.addSlot(s.province, s.activeProvinceKey, s.params.provinceClass);
  }
  // 添加市
  function addCity() {
    s.city = getChildrenByKey(s.activeProvinceKey);
    // code有误
    if (!s.city) {
      console.warn('SeedsUI PickerCity: 上级省code' + s.activeProvinceKey + '下级不存在,将默认选中第一个城市');
      s.setActiveProvinceKey(s.province[0][s.params.dataKeyPropertyName]);
      s.city = getChildrenByKey(s.activeProvinceKey);
      s.setActiveCityKey(s.city[0][s.params.dataKeyPropertyName]);
    }
    if (!s.activeCityKey) {
      s.setActiveCityKey(s.city[0][s.params.dataKeyPropertyName]);
    }
    s.addSlot(s.city, s.activeCityKey, s.params.cityClass);
  }
  // 添加区
  function addDistrict() {
    if (s.params.viewType !== 'district') return;
    s.district = getChildrenByKey(s.activeCityKey);
    // code有误
    if (!s.district) {
      console.warn('SeedsUI PickerCity: 上级市code' + s.activeCityKey + '下级不存在,将默认选中第一个区县或置空');
      s.setActiveCityKey(s.city[0][s.params.dataKeyPropertyName]);
      s.district = getChildrenByKey(s.city[0][s.params.dataKeyPropertyName]);
      if (s.district) s.setActiveDistrictKey(s.district[0][s.params.dataKeyPropertyName]);
    }
    if (!s.activeDistrictKey && s.district) {
      s.setActiveDistrictKey(s.district[0][s.params.dataKeyPropertyName]);
    }
    if (s.district) {
      s.addSlot(s.district, s.activeDistrictKey, s.params.districtClass);
    } else {
      s.addSlot(s.params.defaultValues, '', s.params.districtClass);
    }
  }

  function initSlots() {
    // 渲染
    addProvince();
    addCity();
    addDistrict();
  }
  s.update = function () {
    s.clearSlots();
    initSlots();
  };
  // 设置默认选中项
  if (s.params.defaultProvinceKey && s.params.defaultCityKey) {
    s.setDefaultKeys([s.params.defaultProvinceKey, s.params.defaultCityKey, s.params.defaultDistrictKey]);
  } else {
    s.setDefaultValues([s.params.defaultProvince, s.params.defaultCity, s.params.defaultDistrict]);
  }
  // 添加省市区
  initSlots();
  return s;
};

exports.default = PickerCity;
module.exports = exports['default'];