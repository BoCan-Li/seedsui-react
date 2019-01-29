import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import Carrousel from './../Carrousel';
import InputPre from './../InputPre';
import Button from './../Button';
import Instance from './instance.js';
import data from './instance.data.js';

export default class Emoji extends Component {
  static propTypes = {
    data: PropTypes.object,

    portal: PropTypes.object,
    args: PropTypes.any,

    autoFocus: PropTypes.bool,

    value: PropTypes.string,
    placeholder: PropTypes.string,

    isClickMaskHide: PropTypes.bool,
    onClickMask: PropTypes.func,

    maskClassName: PropTypes.string,
    maskStyle: PropTypes.object,

    className: PropTypes.string,
    style: PropTypes.object,

    onChange: PropTypes.func,
    onClickSubmit: PropTypes.func,
  }
  static defaultProps = {
    autoFocus: false,
    data: data,
    placeholder: '说点什么吧...',
    isClickMaskHide: false
  }
  constructor(props) {
    super(props);
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps.autoFocus !== this.props.autoFocus && this.props.autoFocus === true && this.$inputPre) {
      this.$inputPre.$input.focus();
    }
  }
  componentDidMount = () => {
    if (this.props.autoFocus && this.$inputPre) this.$inputPre.$input.focus();
    if (this.instance) return
    var instance = new Instance({
      data: this.props.data,

      mask: this.$el,
      isClickMaskHide: this.props.isClickMaskHide,
      onClickMask: this.onClickMask,

      onClickSubmit: this.onClickSubmit,

      onChange: this.props.onChange
    });
    this.instance = instance;
  }
  getArgs = (e) => {
    var args = this.props.args;
    if (args !== undefined) {
      if (typeof args === 'string' && args === '$event') {
        args = e;
      } else if (Array.isArray(args) && args.indexOf('$event') > -1) {
        args[args.indexOf('$event')] = e;
      }
    } else {
      args = e;
    }
    return args;
  }
  // 遮罩
  onClickMask = (s, e) => {
    if (this.props.onClickMask) this.props.onClickMask(this.getArgs(e));
  }
  // 提交按钮
  onClickSubmit = (value, s, e) => {
    if (this.props.onClickSubmit) this.props.onClickSubmit(value, this.getArgs(e));
  }
  // 表情
  getFaceDOM = () => {
    const {data} = this.props;
    // icons分页变量
    const icons = [];
    let page = 0;
    let index = 0;
    let count = 23;
    // icons分页
    for (let name in data) {
      if (index !== 0 && index % count === 0) {
        page++;
      }
      if (!icons[page]) icons[page] = [];
      icons[page].push({key: name, value: data[name]});
      index++;
    }
    // 生成DOM
    return icons.map((icon, i) => {
      return <div key={`page${i}`} className={`emoji-carrousel-slide`}>
        {icon.map((item, index) => {
          return <a key={`face${index}`} className={`emoji-face`} data-emoji={item.value} title={item.key}>&nbsp;</a>
        })}
        <a className={`emoji-face-delete`}>&nbsp;</a>
      </div>
    });
  }
  
  render() {
    const {
      portal,
      args,
      autoFocus,
      value,
      placeholder,
      isClickMaskHide,
      onClickMask,
      maskClassName,
      maskStyle,
      className,
      style,
      onChange,
      onClickSubmit,
      ...others
    } = this.props;
    return createPortal(
      <div ref={el => {this.$el = el;}} className={`mask emoji-mask active${maskClassName ? ' ' + maskClassName : ''}`} style={maskStyle} onClick={this.onClickMask}>
        <div ref={el => {this.$container = el;}} className={`emoji active${className ? ' ' + className : ''}`} style={style} onClick={this.onClick}>
          <div className="emoji-edit">
            <InputPre
              ref={(el) => {this.$inputPre = el;}}
              className="emoji-edit-input" inputStyle={{padding: '4px 8px'}}
              valueBindProp
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              {...others}
            />
            <i ref={(el) => {this.$icon = el;}} className={`icon emoji-edit-icon`}></i>
            <Button className="emoji-edit-submit" disabled={!value} onClick={this.onClickSubmit}>提交</Button>
          </div>
          <Carrousel ref={(el) => {this.$carrousel = el;}} pagination className={`carrousel-container emoji-carrousel`} style={{display: 'none'}}>
            {this.getFaceDOM()}
          </Carrousel>
        </div>
      </div>,
      this.props.portal || document.getElementById('root')
    );
  }
}
