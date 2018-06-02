// Model
const INIT = 'form/INIT';

const CITY_CHANGE = 'form/CITY_CHANGE';
const ADDR_CHANGE = 'form/ADDR_CHANGE';
const DEFAULT_CHANGE = 'form/DEFAULT_CHANGE';
const PHONE_CHANGE = 'form/PHONE_CHANGE';
const TEL_CHANGE = 'form/TEL_CHANGE';
const NAME_CHANGE = 'form/NAME_CHANGE';
const AGE_CHANGE = 'form/AGE_CHANGE';

const initial = {
  isLoading: false,
  area: '', // 地区名称
  city: '', // 城市名称
  id: '', // 收货地址id
  is_default: '', // 是否设置为默认地址
  mss_area: '', // 地区编码
  mss_city: '', // 城市编码
  mss_province: '', // 省编码
  province: '', // 省名称
  receive_addr: '', // 收货详细地址
  receive_name: '', // 收货人
  receive_phone: '13311111111', // 收货手机号
  receive_tel: '', // 收货电话
  age: '', // 年龄
};
// Reducer
export default function reducer(state = initial, action = {}) {
  switch (action.type) {
    case INIT:
      return {
        ...initial
      };
    case CITY_CHANGE:
      const options = action.options;
      if (options[0].key) {
        state.province = options[0].value;
        state.mss_province = options[0].key;
      }
      if (options[1].key) {
        state.city = options[1].value;
        state.mss_city = options[1].key;
      }
      if (options[2].key) {
        state.area = options[2].value;
        state.mss_area = options[2].key;
      } else {
        state.area = '';
        state.mss_area = '';
      }
      return {
        ...state
      }
    case ADDR_CHANGE:
      state.receive_addr = action.value;
      return {
        ...state
      };
    case DEFAULT_CHANGE:
      state.is_default = action.isDefault;
      return {
        ...state
      };
    case PHONE_CHANGE:
      state.receive_phone = action.value;
      return {
        ...state
      };
    case TEL_CHANGE:
      state.receive_tel = action.value;
      return {
        ...state
      };
    case NAME_CHANGE:
      state.receive_name = action.value;
      return {
        ...state
      };
    case AGE_CHANGE:
      state.age = action.value;
      return {
        ...state
      };
    default:
      return state;
  }
}

// Action
export function init() {
  return {
    type: INIT
  };
}
export function cityChange(text, options) {
  return {
    type: CITY_CHANGE,
    options
  };
}
export function addrChange(value) {
  return {
    type: ADDR_CHANGE,
    value
  };
}
export function defaultChange(isDefault) {
  return {
    type: DEFAULT_CHANGE,
    isDefault
  };
}
export function phoneChange(value) {
  return {
    type: PHONE_CHANGE,
    value
  };
}
export function telChange(value) {
  return {
    type: TEL_CHANGE,
    value
  };
}
export function nameChange(value) {
  return {
    type: NAME_CHANGE,
    value
  };
}
export function ageChange(value) {
  return {
    type: AGE_CHANGE,
    value
  };
}
