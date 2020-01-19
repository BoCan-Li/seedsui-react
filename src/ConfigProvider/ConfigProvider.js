import {Component} from 'react';
import PropTypes from 'prop-types';

export default class ConfigProvider extends Component {
  static propTypes = {
    locale: PropTypes.object,
    localeLanguage: PropTypes.string,
    portal: PropTypes.object,
    onChange: PropTypes.func,
    children: PropTypes.any
  }

  static childContextTypes = {
    locale: PropTypes.object,
    localeLanguage: PropTypes.string,
    portal: PropTypes.object,
    onChange: PropTypes.func
  }

  getChildContext() {
    let {
      locale,
      localeLanguage,
      portal,
      onChange
    } = this.props;
    if (localeLanguage) {
      switch (localeLanguage) {
        case 'zh_CN':
          locale = {
            ...require('./zh_CN.js').default,
            ...locale
          }
          break;
        case 'en_US':
          locale = {
            ...require('./en_US.js').default,
            ...locale
          }
          break;
      }
    }
    // 如果有locale的话, 则放入内存中, 开放给getLocaleValue使用
    if (locale) {
      localStorage.setItem('_seedsui_locale', JSON.stringify(locale))
    }
    return {
      locale,
      localeLanguage,
      portal,
      onChange
    }
  }

  render() {
    return this.props.children
  }
}
