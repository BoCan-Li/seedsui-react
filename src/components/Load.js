import React, { Component } from 'react'
import PropTypes from 'prop-types'
import load from './icons/loading.gif';
import Loading from 'components/seedsui/Loading/Loading.jsx';

/**
 * 页面加载Loading
 */
export default class Load extends Component {
  static propTypes = {
    portal: PropTypes.object, // 传送至DOM
    style: PropTypes.object,
    maskBefore: PropTypes.node,
    loadingStyle: PropTypes.object
  }
  static defaultProps = {
    style: {}
  }
  constructor(props) {
    super(props);
  }

  render() {
    const {style, maskBefore, loadingStyle} = this.props;
    return (
      <Loading portal={this.props.portal} caption="" style={style} iconSrc={load} maskBefore={maskBefore} loadingStyle={loadingStyle}/>
    );
  }
}
