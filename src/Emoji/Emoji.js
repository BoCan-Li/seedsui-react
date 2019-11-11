import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import Carrousel from './../Carrousel';
import InputPre from './../InputPre';
import Button from './../Button';
import Instance from './instance.js';
import data from './instance.data.js';

if (!window._seeds_lang) window._seeds_lang = {} // 国际化数据

export default class Emoji extends Component {
  static propTypes = {
    portal: PropTypes.object,
    show: PropTypes.bool, // ios内核必须隐藏, 不能移除dom, 弹出时才不会有bug, 所以必须用show
    data: PropTypes.object,

    autoFocus: PropTypes.bool,
    value: PropTypes.string,
    placeholder: PropTypes.string,

    maskAttribute: PropTypes.object,
    submitAttribute: PropTypes.object,
    inputProps: PropTypes.object,
    liconAttribute: PropTypes.object,
    licon: PropTypes.node,

    onChange: PropTypes.func
  }
  static defaultProps = {
    autoFocus: false,
    data: data,
    placeholder: window._seeds_lang['say_something'] || '说点什么吧...',
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
    const {
      maskAttribute = {},
      submitAttribute = {}
    } = this.props;
    this.instance = new Instance({
      data: this.props.data,

      mask: this.$el,
      isClickMaskHide: false,
      onClickMask: maskAttribute.onClick || null,

      onClickSubmit: submitAttribute.onClick || null,

      onChange: this.props.onChange
    });
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
  // 过滤已经回调的属性
  filterProps = (props) => {
    if (!props) return props;
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
      show,
      data,
      autoFocus,
      value,
      placeholder,
      maskAttribute = {},
      submitAttribute = {},
      inputProps = {},
      liconAttribute = {},
      licon,
      onChange,
      ...others
    } = this.props;

    // 剔除掉onClick事件, 因为在instance时已经回调了
    maskAttribute = this.filterProps(maskAttribute)
    submitAttribute = this.filterProps(submitAttribute)

    return createPortal(
      <div ref={el => {this.$el = el;}} {...maskAttribute} className={`mask emoji-mask${show ? ' active' : ''}${maskAttribute.className ? ' ' + maskAttribute.className : ''}`}>
        <div {...others} className={`emoji active${others.className ? ' ' + others.className : ''}`}>
          {licon}
          {liconAttribute && <i {...liconAttribute} className={`icon${liconAttribute.className ? ' ' + liconAttribute.className : ''}`}></i>}
          <div className="emoji-edit">
            <InputPre
              ref={(el) => {this.$inputPre = el;}}
              className="emoji-edit-input"
              inputAttribute={{style: {padding: '0'}}}
              valueBindProp
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              {...inputProps}
            />
            <i ref={(el) => {this.$icon = el;}} className={`icon emoji-edit-icon`}></i>
            <Button {...submitAttribute} className={`emoji-edit-submit${submitAttribute.className ? ' ' + submitAttribute.className : ''}`} disabled={!value}>{submitAttribute.caption || (window._seeds_lang['submit'] || '提交')}</Button>
          </div>
          <Carrousel ref={(el) => {this.$carrousel = el;}} pagination className={`carrousel-container emoji-carrousel`} style={{display: 'none'}}>
            {this.getFaceDOM()}
          </Carrousel>
        </div>
      </div>,
      portal || document.getElementById('root') || document.body
    );
  }
}
