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
      locale,
      language,
      portal,
      onChange
    } = this.props;
    if (language) {
      let defaultLocale = null;
      switch (language) {
        case 'zh_CN': {
          defaultLocale = require('./../locale/zh_CN.js');
          // 防止没有用babel-plugin-add-module-exports自动加上default
          if (defaultLocale.default) defaultLocale = defaultLocale.default;
          locale = {
            ...defaultLocale,
            ...locale
          }
          break;
        }
        case 'en_US': {
          defaultLocale = require('./../locale/en_US.js');
          // 防止没有用babel-plugin-add-module-exports自动加上default
          if (defaultLocale.default) defaultLocale = defaultLocale.default;
          locale = {
            ...defaultLocale,
            ...locale
          }
          break;
        }
      }
    }
    // 如果有locale的话, 则放入内存中, 开放给getLocaleValue使用
    if (locale) {
      localStorage.setItem('_seedsui_locale', JSON.stringify(locale))
    }
    return {
      locale,
      language,
      portal,
      onChange
    }
  }

  render() {
    return this.props.children
  }
}
