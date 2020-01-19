import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import data from './instance.data.js';
import Instance from './instance.js';

export default class PickerCity extends Component {
  // 全局配置
  static contextTypes = {
    locale: PropTypes.object,
    portal: PropTypes.object
  }
  static propTypes = {
    portal: PropTypes.object,
    data: PropTypes.array,
    dataFormat: PropTypes.object, // {keyName: 'key', valueName: 'value', childName: 'children'}
    split: PropTypes.string,

    type: PropTypes.string, // district | city
    show: PropTypes.bool,
    value: PropTypes.string, // '北京-东城区'
    valueForKey: PropTypes.string, // '110000-110101'

    maskAttribute: PropTypes.object,
    submitAttribute: PropTypes.object,
    cancelAttribute: PropTypes.object
  }
  static defaultProps = {
    data: null,
    dataFormat: {
      keyName: 'key',
      valueName: 'value',
      childName: 'children'
    },
    split: '-',
    type: 'district'
  }
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount = () => {
    this.initInstance()
  }
  shouldComponentUpdate = (nextProps) => {
    if (nextProps.show === this.props.show) return false;
    return true;
  }
  componentDidUpdate = () => {
    if (this.instance) {
      const {
        show,
        data,
        dataFormat
      } = this.props;
      if (show) {
        if (data) {
          this.instance.setData(this.props.data, {
            dataChildPropertyName: dataFormat.childName,
            dataKeyPropertyName: dataFormat.keyName,
            dataValuePropertyName: dataFormat.valueName
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
    const {value, split} = this.props;
    // 默认值
    var defaultValue = value;
    var defaultValues = [];
    if (defaultValue) {
      defaultValues = defaultValue.split(split).map((item) => {
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
    const {
      dataFormat,
      split,
      type,
      show,
      maskAttribute = {},
      submitAttribute = {},
      cancelAttribute = {}
    } = this.props;
    this.instance = new Instance({
      data: this.props.data || data,
      dataKeyPropertyName: dataFormat.keyName,
      dataValuePropertyName: dataFormat.valueName,
      dataChildPropertyName: dataFormat.childName,
      
      mask: this.$el,
      split: split,
      viewType: type,
      defaultProvinceKey: defaultKeys[0] || '',
      defaultCityKey: defaultKeys[1] || '',
      defaultDistrictKey: defaultKeys[2] || '',
      defaultProvince: defaultValues[0] || '',
      defaultCity: defaultValues[1] || '',
      defaultDistrict: defaultValues[2] || '',
      onClickMask: (e) => {
        if (maskAttribute.onClick) maskAttribute.onClick(e)
      },
      onClickCancel: (e) => {
        if (cancelAttribute.onClick) cancelAttribute.onClick(e);
      },
      onClickSubmit: (e) => {
        if (submitAttribute.onClick) submitAttribute.onClick(e);
      },
      onHid: (e) => {
      }
    });
    if (show && this.instance) {
      setTimeout(function(){
        this.instance.show();
      },10);
    }
  }
  // 过滤已经回调的属性
  filterProps = (props) => {
    var propsed = {}
    for (let n in props) {
      if (n !== 'onClick') {
        propsed[n] = props[n]
      }
    }
    return propsed;
  }
  render() {
    // 全局配置
    const {
      locale = {}
    } = this.context;
    let {
      portal,
      data,
      dataFormat,
      split,
      type,
      show,
      value,
      valueForKey,

      maskAttribute = {},
      submitAttribute = {},
      cancelAttribute = {},
      ...others
    } = this.props;
    // 剔除掉onClick事件, 因为在instance时已经回调了
    maskAttribute = this.filterProps(maskAttribute)
    submitAttribute = this.filterProps(submitAttribute)
    cancelAttribute = this.filterProps(cancelAttribute)
    return createPortal(
      <div ref={(el) => {this.$el = el}} {...maskAttribute} className={`mask picker-mask${maskAttribute.className ? ' ' + maskAttribute.className : ''}`}>
        <div {...others} className={`picker${others.className ? ' ' + others.className : ''}`}>
          <div className="picker-header">
            <a {...cancelAttribute} className={`picker-cancel${cancelAttribute.className ? ' ' + cancelAttribute.className : ''}`}>{cancelAttribute.caption || (locale['cancel'] || '取消')}</a>
            <a {...submitAttribute} className={`picker-submit${submitAttribute.className ? ' ' + submitAttribute.className : ''}`}>{cancelAttribute.caption || (locale['finish'] || '完成')}</a>
          </div>
          <div className="picker-wrapper">
            <div className="picker-layer">
              <div className="picker-layer-frame"></div>
            </div>
            <div className="picker-slotbox"></div>
          </div>
        </div>
      </div>,
      portal || this.context.portal || document.getElementById('root') || document.body
    );
  }
}
