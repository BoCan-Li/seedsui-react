import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import citys from './picker.city.data.js';
import Instance from './picker.city.js';

export default class PickerCity extends Component {
  static propTypes = {
    portal: PropTypes.object,
    type: PropTypes.string, // area | city
    className: PropTypes.string,
    style: PropTypes.object,
    value: PropTypes.string,
    show: PropTypes.bool,
    onClickMask: PropTypes.func,
    onClickCancel: PropTypes.func,
    onClickSubmit: PropTypes.func
  }
  static defaultProps = {
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
    const defaultValues = this.getDefaults();
    this.state.instance.setDefaults(defaultValues);
    this.state.instance.update();
  }
  getDefaults = () => {
    // 默认值
    var defaultValue = this.props.value;
    var defaultValues = [];
    if (defaultValue) {
      defaultValues = defaultValue.split('-').map((item) => {
        return item.trim();
      });
    }
    return defaultValues;
  }
  initInstance = () => {
    var defaultValues = this.getDefaults();
    // render数据
    const instance = new Instance({
      mask: this.$el,
      viewType: this.props.type,
      data: citys,
      defaultProvince: defaultValues[0] || '北京市',
      defaultCity: defaultValues[1] || '东城区',
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
