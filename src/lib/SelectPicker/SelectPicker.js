import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import Instance from './instance.js';

export default class SelectPicker extends Component {
  static propTypes = {
    portal: PropTypes.object,
    multiple: PropTypes.bool, // 是否允许多选
    list: PropTypes.array, // [key: 'xx', value: 'xx']
    split: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    valueForKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    className: PropTypes.string,
    style: PropTypes.object,
    slotClassName: PropTypes.string,
    show: PropTypes.bool,
    onClickMask: PropTypes.func,
    onClickCancel: PropTypes.func,
    onClickSubmit: PropTypes.func,
  }
  static defaultProps = {
    split: ',',
    slotClassName: 'text-center'
  }
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    this.initInstance();
  }
  shouldComponentUpdate = (nextProps) => {
    if (nextProps.show === this.props.show) return false;
    return true;
  }
  componentDidUpdate = (prevProps) => {
    if (this.instance) {
      if (this.props.show) {
        this.setDefaults();
        this.instance.show();
      }
      else this.instance.hide()
    }
  }
  setDefaults = () => {
    const selected = this.props.valueForKey || this.props.value;
    const selectedName = this.props.valueForKey ? 'key' : 'value';
    if (selected) {
      const options = selected.split(this.props.split || ',').map((value) => {
        for (var i = 0, li; li = this.props.list[i++];) { // eslint-disable-line
          if (li[selectedName] === value) {
            return li;
          }
        }
        return {
          key: value,
          value: value
        };
      });
      this.instance.setActiveOptions(options);
    } else {
      this.instance.setActiveOptions([]);
    }
  }
  initInstance = () => {
    if (this.instance) return;
    // render数据
    const instance = new Instance({
      multiple: this.props.multiple || false,
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
      onClickOption: (e) => {
        if (!this.props.multiple && this.props.onClickSubmit) this.props.onClickSubmit(e);
      },
      onHid: (e) => {
      }
    });
    this.instance = instance;
    this.setDefaults();
    if (this.props.show && instance) {
      instance.show()
    }
  }
  render() {
    const {list, multiple, className, style} = this.props;
    return createPortal(
      <div className="mask picker-mask" ref={(el) => {this.$el = el}}>
        <div className={`selectpicker${className ? ' ' + className : ''}`} style={style}>
          <div className="picker-header">
            <a className="picker-cancel">取消</a>
            <a className={`picker-submit${multiple ? '' : ' disabled'}`}>完成</a>
          </div>
          <div className="selectpicker-wrapper">
            {list && list.length && list.map((item, index) => {
              return <div key={index} className="selectpicker-option" data-key={item.key} data-value={item.value}>
                <p className="selectpicker-option-caption">{item.value}</p>
                <i className="selectpicker-option-icon"></i>
              </div>
            })}
          </div>
        </div>
      </div>,
      this.props.portal || document.getElementById('root')
    );
  }
}
