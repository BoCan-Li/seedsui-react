import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import data from './instance.data.js';
import Instance from './instance.js';

const _ = window._seedsLang || {} // 国际化数据

export default class PickerCity extends Component {
  static propTypes = {
    data: PropTypes.array,
    dataKeyPropertyName: PropTypes.string,
    dataValuePropertyName: PropTypes.string,
    dataChildPropertyName: PropTypes.string,

    portal: PropTypes.object,
    split: PropTypes.string,
    type: PropTypes.string, // district | city

    maskClassName: PropTypes.string,
    maskStyle: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,

    value: PropTypes.string,
    valueForKey: PropTypes.string,
    show: PropTypes.bool,
    onClickMask: PropTypes.func,
    onClickCancel: PropTypes.func,
    onClickSubmit: PropTypes.func
  }
  static defaultProps = {
    data: null,
    dataKeyPropertyName: 'key',
    dataValuePropertyName: 'value',
    dataChildPropertyName: 'children',

    split: '-',
    type: 'district'
  }
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    this.initInstance()
  }
  shouldComponentUpdate = (nextProps) => {
    if (nextProps.show === this.props.show) return false;
    return true;
  }
  componentDidUpdate = (prevProps) => {
    if (this.instance) {
      if (this.props.show) {
        if (this.props.data) {
          this.instance.setData(this.props.data, {
            dataChildPropertyName: this.props.dataChildPropertyName,
            dataKeyPropertyName: this.props.dataKeyPropertyName,
            dataValuePropertyName: this.props.dataValuePropertyName
          });
        }
        this.setDefault();
        this.instance.show();
      }
      else this.instance.hide()
    }
  }
  setDefault = () => {
    const {valueForKey, split} = this.props;
    if (valueForKey && valueForKey.split(split).length > 1 && valueForKey.split(split).some(key => {return !isNaN(key)})) {
      this.instance.setDefaultKeys(valueForKey.split(split));
    } else {
      const defaultValues = this.getDefaultValues();
      this.instance.setDefaultValues(defaultValues);
    }
    this.instance.update();
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
    const {valueForKey, split} = this.props;
    if (valueForKey && valueForKey.split(split).length > 1) {
      return valueForKey.split(split);
    }
    return ['', '', ''];
  }
  initInstance = () => {
    var defaultValues = this.getDefaultValues();
    var defaultKeys = this.getDefaultKeys();
    // render数据
    const instance = new Instance({
      data: this.props.data || data,
      dataKeyPropertyName: this.props.dataKeyPropertyName,
      dataValuePropertyName: this.props.dataValuePropertyName,
      dataChildPropertyName: this.props.dataChildPropertyName,
      
      mask: this.$el,
      split: this.props.split,
      viewType: this.props.type,
      defaultProvinceKey: defaultKeys[0] || '',
      defaultCityKey: defaultKeys[1] || '',
      defaultDistrictKey: defaultKeys[2] || '',
      defaultProvince: defaultValues[0] || '',
      defaultCity: defaultValues[1] || '',
      defaultDistrict: defaultValues[2] || '',
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
    this.instance = instance;
  }
  render() {
    const {maskClassName, maskStyle, className, style} = this.props;
    return createPortal(
      <div className={`mask picker-mask${maskClassName ? ' ' + maskClassName : ''}`} style={maskStyle} ref={(el) => {this.$el = el}}>
        <div className={`picker${className ? ' ' + className : ''}`} style={style}>
          <div className="picker-header">
            <a className="picker-cancel">{_['cancel'] || '取消'}</a>
            <a className="picker-submit">{_['finish'] || '完成'}</a>
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
