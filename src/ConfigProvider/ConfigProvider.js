import {Component} from 'react';
import PropTypes from 'prop-types';

export default class ConfigProvider extends Component {
  static propTypes = {
    locale: PropTypes.object,
    localeLanguage: PropTypes.string,
    portal: PropTypes.object,
    children: PropTypes.any
  }

  static childContextTypes = {
    locale: PropTypes.object,
    localeLanguage: PropTypes.string,
    portal: PropTypes.object
  }

  getChildContext() {
    let {
      locale,
      localeLanguage,
      portal,
      children,
      ...others
    } = this.props;
    if (localeLanguage) {
      switch (localeLanguage) {
        case 'zh_CN':
          locale = require('./zh_CN.js').default;
          break;
        case 'en_US':
          locale = require('./en_US.js').default;
          break;
      }
    }
    return {
      locale: locale,
      localeLanguage: localeLanguage,
      portal: portal,
      ...others
    }
  }

  render() {
    return this.props.children
  }
}
