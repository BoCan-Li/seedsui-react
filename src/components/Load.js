import React, { Component } from 'react';
import PropTypes from 'prop-types';
import load from './icons/loading.gif';
import Loading from 'components/seedsui/Loading/Loading.jsx';

/**
 * 页面加载Loading
 */
export default class Load extends Component {
  static propTypes = {
    img: PropTypes.string,
    style: PropTypes.object,
    classname: PropTypes.string
  }
  static defaultProps = {
    style: {}
  }

  render() {
    const { style} = this.props;
    return (
      <Loading style={style} img={load}/>
    );
  }
}
