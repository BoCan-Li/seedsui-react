import {Component} from 'react';
import PropTypes from 'prop-types';

export default class ConfigProvider extends Component {
  static propTypes = {
    locale: PropTypes.object,
    portal: PropTypes.object,
    children: PropTypes.any
  }

  static childContextTypes = {
    locale: PropTypes.object,
    portal: PropTypes.object
  }

  getChildContext() {
    return {
      locale: this.props.locale,
      portal: this.props.portal
    }
  }

  render() {
    return this.props.children
  }
}
