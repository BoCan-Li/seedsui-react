import {Component} from 'react';
import PropTypes from 'prop-types';

export default class ConfigProvider extends Component {
  static propTypes = {
    locale: PropTypes.object,
    language: PropTypes.string,
    portal: PropTypes.object,
    onChange: PropTypes.func,
    children: PropTypes.any
  }

  static childContextTypes = {
    locale: PropTypes.object,
    language: PropTypes.string,
    portal: PropTypes.object,
    onChange: PropTypes.func
  }

  getChildContext() {
    let {
      locale = {},
      language,
      portal,
      onChange
    } = this.props;
    let data = null;
    // 根据语言名称获取locale数据
    function initLanguageLocale() {
      let seedsuiLocale = {};
      const result = require(`./../locale/${language}.js`);
      if (!result) {
        console.error(`seedsui中, ${language}语言包不存在`);
        data = locale;
        return;
      }
      // 防止没有用babel-plugin-add-module-exports自动加上default
      if (result.default) seedsuiLocale = result.default;
      data = {
        ...seedsuiLocale,
        ...locale
      }
    }
    // 有language属性时, 读取seedsui内部国际化文件
    if (language) {
      initLanguageLocale()
    } else {
      data = locale
    }
    if (data) localStorage.setItem('_seedsui_locale', JSON.stringify(data))
    return {
      locale: function (remark, key, variable) {
        if (!data) return remark || key || '';
        // 获取key的值
        if (key) {
          let value = data[key] || '';
          if (value && variable && Array.isArray(variable) && variable.length) {
            for (let i = 0; i < variable.length; i++) {
              if (typeof variable[i] !== 'number' && typeof variable[i] !== 'boolean' && typeof variable[i] !== 'string') continue;
              value = value.replace(new RegExp(`\\{${i}\\}`, 'g'), variable[i]);
            }
          }
          return value || remark || key;
        }
        // 如果有remark, 没有key, 则返回remark
        if (remark) {
          return remark
        }
        return data
      },
      language,
      portal,
      onChange
    }
  }

  render() {
    return this.props.children
  }
}
