import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import Instance from './instance.js';

if (!window._seeds_lang) window._seeds_lang = {} // 国际化数据

export default class Picker extends Component {
  static propTypes = {
    portal: PropTypes.object,
    list: PropTypes.array, // [{key: '', value: ''}]

    maskClassName: PropTypes.string,
    maskStyle: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,

    slotClassName: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    valueForKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    show: PropTypes.bool,
    onClickMask: PropTypes.func,
    onClickCancel: PropTypes.func,
    onClickSubmit: PropTypes.func,
  }
  static defaultProps = {
    slotClassName: 'text-center'
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
  componentDidUpdate = () => {
    if (this.instance) {
      if (this.props.show) {
        this.setDefault();
        this.instance.show();
      }
      else this.instance.hide()
    } else {
      if (this.props.list.length > 0) {
        this.initInstance();
      }
    }
  }
  setDefault = () => {
    const {valueForKey, list} = this.props;
    let key = valueForKey || '';
    if (!key) {
      const defaultOpt = this.getDefaults();
      if (defaultOpt && defaultOpt.key) key = defaultOpt.key;
    }
    this.instance.clearSlots();
    this.instance.addSlot(list, key || '', this.props.slotClassName); // 添加列,参数:数据,默认key,样式(lock样式为锁定列)
  }
  getDefaults = () => {
    const {list, valueForKey, value} = this.props;
    if (!valueForKey && !value) {
      if (list && list[0]) return list[0];
      return [{key: '', value: ''}];
    }
    const values = list.filter((item) => {
      if (valueForKey) {
        if (valueForKey === item.key) return true
      } else if (value) {
        if (item.value === value) return true
      }
      return false
    });
    return values[0];
  }
  initInstance = () => {
    const {list} = this.props;
    if (!list || list.length === 0 || this.instance) return;
    // render数据
    const instance = new Instance({
      mask: this.$el,
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
    // 默认项
    const defaultOpt = this.getDefaults();
    let key = '';
    if (defaultOpt && defaultOpt.key) key = defaultOpt.key;
    instance.addSlot(list, key, this.props.slotClassName);
    if (this.props.show && instance) {
      instance.show()
    }
    this.instance = instance;
  }
  render() {
    const {maskClassName, maskStyle, className, style} = this.props;
    return createPortal(
      <div className={`mask picker-mask${maskClassName ? ' ' + maskClassName : ''}`} style={maskStyle} ref={(el) => {this.$el = el}}>
        <div className={`picker${className ? ' ' + className : ''}`} style={style}>
          <div className="picker-header">
            <a className="picker-cancel">{window._seeds_lang['cancel'] || '取消'}</a>
            <a className="picker-submit">{window._seeds_lang['finish'] || '完成'}</a>
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
