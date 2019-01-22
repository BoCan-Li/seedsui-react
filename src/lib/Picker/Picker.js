import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {createPortal} from 'react-dom'
import Instance from './instance.js'

export default class Picker extends Component {
  static propTypes = {
    portal: PropTypes.object,
    list: PropTypes.array, // [{key: '', value: ''}]
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
    const {list, value} = this.props;
    if (!value) return value;
    const values = list.filter((item) => {
      return item.value === value
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
