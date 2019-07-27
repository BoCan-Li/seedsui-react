import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import Carrousel from './../Carrousel';
import InputPre from './../InputPre';
import Button from './../Button';
import Icon from './../Icon';
import Instance from './instance.js';
import data from './instance.data.js';

if (!window._seeds_lang) window._seeds_lang = {} // 国际化数据

export default class Emoji extends Component {
  static propTypes = {
    show: PropTypes.bool,
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

    licon: PropTypes.node,

    onChange: PropTypes.func,

    submitStyle: PropTypes.object,
    submitClassName: PropTypes.string,
    submitCaption: PropTypes.node,
    onClickSubmit: PropTypes.func,
  }
  static defaultProps = {
    autoFocus: false,
    data: data,
    placeholder: window._seeds_lang['say_something'] || '说点什么吧...',
    isClickMaskHide: false,
    submitCaption: window._seeds_lang['submit'] || '提交',
  }
  constructor(props) {
    super(props);
  }
  componentDidUpdate = (prevProps) => {
    // 自动获取焦点
    if (this.props.autoFocus && prevProps.show !== this.props.show && this.props.show === true && this.$inputPre) {
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
  // 遮罩
  onClickMask = (s, e) => {
    if (this.props.onClickMask) this.props.onClickMask(Object.getArgs(e, this.props.args));
  }
  // 提交按钮
  onClickSubmit = (value, s, e) => {
    if (this.props.onClickSubmit) this.props.onClickSubmit(value, Object.getArgs(e, this.props.args));
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
      show,
      data,
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
      licon,
      onChange,
      submitCaption,submitStyle, submitClassName, onClickSubmit,
      ...others
    } = this.props;
    return createPortal(
      <div ref={el => {this.$el = el;}} className={`mask emoji-mask${show ? ' active' : ''}${maskClassName ? ' ' + maskClassName : ''}`} style={maskStyle} onClick={this.onClickMask}>
        <div ref={el => {this.$container = el;}} className={`emoji active${className ? ' ' + className : ''}`} style={style} onClick={this.onClick}>
          {licon}
          <div className="emoji-edit">
            <InputPre
              ref={(el) => {this.$inputPre = el;}}
              className="emoji-edit-input"
              inputStyle={{padding: '0'}}
              valueBindProp
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              {...others}
            />
            <i ref={(el) => {this.$icon = el;}} className={`icon emoji-edit-icon`}></i>
            <Button className={`emoji-edit-submit${submitClassName ? ' ' + submitClassName : ''}`} style={submitStyle} disabled={!value} onClick={this.onClickSubmit}>{submitCaption}</Button>
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
