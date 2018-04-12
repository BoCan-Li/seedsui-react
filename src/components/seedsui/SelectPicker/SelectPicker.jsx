import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import Instance from './selectpicker.js';

export default class SelectPicker extends Component {
  static propTypes = {
    portal: PropTypes.object,
    multiple: PropTypes.bool, // 是否允许多选
    list: PropTypes.array, // [key: 'xx', value: 'xx']
    className: PropTypes.string,
    style: PropTypes.object,
    slotClassName: PropTypes.string,
    value: PropTypes.string,
    show: PropTypes.bool,
    onChange: PropTypes.func,
    onClickMask: PropTypes.func,
    onClickCancel: PropTypes.func,
    onClickSubmit: PropTypes.func,
  }
  static defaultProps = {
    multiple: true,
    slotClassName: 'text-center'
  }
  constructor(props) {
    super(props);
    this.state = {
      instance: null
    }
  }
  componentDidMount = () => {
    this.initInstance();
  }
  shouldComponentUpdate = (nextProps) => {
    if (nextProps.show === this.props.show) return false;
    return true;
  }
  componentDidUpdate = (prevProps) => {
    if (this.state.instance) {
      if (this.props.show) {
        if (this.props.value) {
          const options = this.props.value.split(',').map((item) => {
            return {
              key: item,
              value: item
            }
          });
          this.state.instance.setActiveOptions(options);
        } else {
          this.state.instance.setActiveOptions([]);
        }
        this.state.instance.show();
      }
      else this.state.instance.hide()
    }
  }
  initInstance = () => {
    if (this.state.instance) return;
    // render数据
    const instance = new Instance({
      multiple: this.props.multiple,
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
        if (this.props.multiple === false && this.props.onClickSubmit) this.props.onClickSubmit(e);
      },
      onHid: (e) => {
      }
    });
    if (this.props.value) {
      const options = this.props.value.split(',').map((item) => {
        return {
          key: item,
          value: item
        }
      });
      instance.setActiveOptions(options);
    }
    if (this.props.show && instance) {
      instance.show()
    }
    this.setState({
      instance
    });
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
