import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import data from './instance.data.js';
import Instance from './instance.js';

export default class PickerCity extends Component {
  static propTypes = {
    data: PropTypes.array,
    portal: PropTypes.object,
    split: PropTypes.string,
    type: PropTypes.string, // area | city
    className: PropTypes.string,
    style: PropTypes.object,
    value: PropTypes.string,
    valueForKeys: PropTypes.array,
    show: PropTypes.bool,
    onClickMask: PropTypes.func,
    onClickCancel: PropTypes.func,
    onClickSubmit: PropTypes.func
  }
  static defaultProps = {
    split: '-',
    type: 'area'
  }
  constructor(props) {
    super(props);
    this.state = {
      instance: null
    }
  }
  componentDidMount = () => {
    this.initInstance()
  }
  shouldComponentUpdate = (nextProps) => {
    if (nextProps.show === this.props.show) return false;
    return true;
  }
  componentDidUpdate = (prevProps) => {
    if (this.state.instance) {
      if (this.props.show) {
        this.setDefault();
        this.state.instance.show();
      }
      else this.state.instance.hide()
    }
  }
  setDefault = () => {
    const {valueForKeys} = this.props;
    if (Array.isArray(valueForKeys) && valueForKeys.length > 1) {
      this.state.instance.setDefaultKeys(valueForKeys);
    } else {
      const defaultValues = this.getDefaultValues();
      this.state.instance.setDefaultValues(defaultValues);
    }
    this.state.instance.update();
  }
  getDefaultValues = () => {
    // 默认值
    var defaultValue = this.props.value;
    var defaultValues = [];
    if (defaultValue) {
      defaultValues = defaultValue.split(this.props.split).map((item) => {
        return item.trim();
      });
    }
    return defaultValues;
  }
  getDefaultKeys = () => {
    if (Array.isArray(this.props.valueForKeys) && this.props.valueForKeys.length > 1) {
      return this.props.valueForKeys;
    }
    return ['', '', ''];
  }
  initInstance = () => {
    var defaultValues = this.getDefaultValues();
    var defaultKeys = this.getDefaultKeys();
    // render数据
    const instance = new Instance({
      mask: this.$el,
      split: this.props.split,
      viewType: this.props.type,
      data: this.props.data || data,
      defaultProvinceKey: defaultKeys[0] || '',
      defaultCityKey: defaultKeys[1] || '',
      defaultAreaKey: defaultKeys[2] || '',
      defaultProvince: defaultValues[0] || '',
      defaultCity: defaultValues[1] || '',
      defaultArea: defaultValues[2] || '',
      onClickMask: (e) => {
        if (this.props.onClickMask) this.props.onClickMask(e)
      },
      onClickCancel: (e) => {
        // e.hide()
        if (this.props.onClickCancel) this.props.onClickCancel(e);
      },
      onClickSubmit: (e) => {
        // e.hide()
        if (this.props.onClickSubmit) this.props.onClickSubmit(e);
      },
      onHid: (e) => {
      }
    });
    if (this.props.show && instance) {
      setTimeout(function(){
        instance.show();
      },10);
    }
    this.setState({
      instance
    });
  }
  render() {
    const {className, style} = this.props;
    return createPortal(
      <div className="mask picker-mask" ref={(el) => {this.$el = el}}>
        <div className={`picker${className ? ' ' + className : ''}`} style={style}>
          <div className="picker-header">
            <a className="picker-cancel">取消</a>
            <a className="picker-submit">完成</a>
          </div>
          <div className="picker-wrapper">
            <div className="picker-layer">
              <div className="picker-layer-frame"></div>
            </div>
            <div className="picker-slotbox"></div>
          </div>
        </div>
      </div>,
      this.props.portal || document.getElementById('root')
    );
  }
}
