import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import Instance from './instance.js';

if (!window._seeds_lang) window._seeds_lang = {} // 国际化数据

export default class Picker extends Component {
  static propTypes = {
    portal: PropTypes.object,
    list: PropTypes.array, // [{key: '', value: ''}]

    show: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    valueForKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),

    maskAttribute: PropTypes.object,
    submitAttribute: PropTypes.object,
    cancelAttribute: PropTypes.object,
    slotAttribute: PropTypes.object
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    const {
      list
    } = this.props;
    if (!list || !list.length) return;
    this.initInstance()
  }
  shouldComponentUpdate = (nextProps) => {
    if (nextProps.show === this.props.show) return false;
    return true;
  }
  componentDidUpdate = () => {
    const {
      list = [],
      show
    } = this.props;
    if (this.instance) {
      if (show && list.length) {
        this.setDefault();
        this.instance.show();
      } else {
        this.instance.hide()
      }
    } else {
      if (list.length > 0) {
        this.initInstance();
      }
    }
  }
  setDefault = () => {
    const {
      valueForKey,
      list,
      slotAttribute = {}
    } = this.props;
    let key = valueForKey || '';
    if (!key) {
      const defaultOpt = this.getDefaults();
      if (defaultOpt && defaultOpt.key) key = defaultOpt.key;
    }
    this.instance.clearSlots();
    this.instance.addSlot(list, key || '', slotAttribute.className || 'text-center'); // 添加列,参数:数据,默认key,样式(lock样式为锁定列)
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
    const {
      list,
      show,
      maskAttribute = {},
      submitAttribute = {},
      cancelAttribute = {},
      slotAttribute = {}
    } = this.props;
    if (!list || list.length === 0 || this.instance) return;
    // render数据
    this.instance = new Instance({
      mask: this.$el,
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
    // 默认项
    const defaultOpt = this.getDefaults();
    let key = '';
    if (defaultOpt && defaultOpt.key) key = defaultOpt.key;
    console.log(key)
    this.instance.addSlot(list, key, slotAttribute.className || 'text-center');
    if (show && this.instance) {
      this.instance.show()
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
    let {
      portal,
      list,
      show,
      value,
      valueForKey,

      maskAttribute = {},
      submitAttribute = {},
      cancelAttribute = {},
      slotAttribute = {},
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
            <a {...cancelAttribute} className={`picker-cancel${cancelAttribute.className ? ' ' + cancelAttribute.className : ''}`}>{cancelAttribute.caption || (window._seeds_lang['cancel'] || '取消')}</a>
            <a {...submitAttribute} className={`picker-submit${submitAttribute.className ? ' ' + submitAttribute.className : ''}`}>{cancelAttribute.caption || (window._seeds_lang['finish'] || '完成')}</a>
          </div>
          <div className="picker-wrapper">
            <div className="picker-layer">
              <div className="picker-layer-frame"></div>
            </div>
            <div className="picker-slotbox"></div>
          </div>
        </div>
      </div>,
      portal || document.getElementById('root') || document.body
    );
  }
}
