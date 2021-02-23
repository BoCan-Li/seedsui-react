import {Component} from 'react'
import PropTypes from 'prop-types'
import getLocaleValue from './../locale'

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
    // function initLanguageLocale() {
    //   let seedsuiLocale = {};
    //   const result = require(`./../locale/${language}.js`);
    //   if (!result) {
    //     console.error(`seedsui中, ${language}语言包不存在`);
    //     data = locale;
    //     return;
    //   }
    //   // 防止没有用babel-plugin-add-module-exports自动加上default
    //   if (result.default) seedsuiLocale = result.default;
    //   data = {
    //     ...seedsuiLocale,
    //     ...locale
    //   }
    // }
    // 有language属性时, 读取seedsui内部国际化文件
    // if (language) {
    //   initLanguageLocale()
    // } else {
    data = locale
    // }
    if (data) window.localeData = data
    return {
      locale: function (remark, key, variable) {
        return getLocaleValue(remark, key, variable)
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
