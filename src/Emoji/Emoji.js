import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import Carrousel from './../Carrousel';
import InputPre from './../InputPre';
import Button from './../Button';
import Instance from './instance.js';
import data from './instance.data.js';
import Context from '../../src/Context/instance.js';

export default class Emoji extends Component {
  static contextType = Context;
  static propTypes = {
    portal: PropTypes.object,
    show: PropTypes.bool, // ios内核必须隐藏, 不能移除dom, 弹出时才不会有bug, 所以必须用show
    data: PropTypes.object,

    autoFocus: PropTypes.bool,
    value: PropTypes.string,
    placeholder: PropTypes.string,

    maskAttribute: PropTypes.object,
    submitProps: PropTypes.object,
    inputProps: PropTypes.object,
    carrouselProps: PropTypes.object,
    liconAttribute: PropTypes.object,
    licon: PropTypes.node,

    onChange: PropTypes.func
  }
  static defaultProps = {
    autoFocus: false,
    data: data
  }
  constructor(props, context) {
    super(props, context);
  }
  componentDidUpdate = (prevProps) => {
    // 自动获取焦点
    if (this.props.autoFocus && prevProps.show !== this.props.show && this.props.show === true && this.$input) {
      this.$input.focus();
    }
  }
  componentDidMount = () => {
    // 输入框
    this.$inputEl = this.refs.$ComponentInputPre.$el;
    this.$input = this.refs.$ComponentInputPre.$input;
    // 提交按钮
    this.$submit = this.refs.$ComponentSubmit.$el;
    // 滑动表情框
    this.$carrousel = this.refs.$ComponentCarrousel.$el;
    if (this.props.autoFocus && this.$input) this.$input.focus();
    if (this.instance) return
    const {
      maskAttribute = {},
      submitProps = {},
      onChange
    } = this.props;
    this.instance = new Instance({
      data: this.props.data,

      mask: this.$el,
      isClickMaskHide: false,
      onClickMask: maskAttribute.onClick ? (s) => maskAttribute.onClick(s.event) : null,

      onClickSubmit: submitProps.onClick ? (s, value) => submitProps.onClick(s.event, value) : null,

      onChange: (s, value) => {
        if (onChange) {
          onChange(s.event, value)
          // 自增高
          if (this.refs.$ComponentInputPre && this.refs.$ComponentInputPre.$ComponentInputText) {
            this.refs.$ComponentInputPre.$ComponentInputText.preAutoSize()
          }
        }
      }
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
    // 全局配置
    let {
      locale = {}
    } = this.context;
    if (!locale) locale = {}
    let {
      portal,
      show,
      data,
      autoFocus,
      value,
      placeholder = locale['say_something'] || '说点什么吧...',
      maskAttribute = {},
      submitProps = {},
      inputProps = {},
      carrouselProps = {},
      liconAttribute,
      licon,
      onChange,
      ...others
    } = this.props;

    // 剔除掉onClick事件, 因为在instance时已经回调了
    maskAttribute = this.filterProps(maskAttribute)
    submitProps = this.filterProps(submitProps)
    return createPortal(
      <div ref={el => {this.$el = el;}} {...maskAttribute} className={`mask emoji-mask${show ? ' active' : ''}${maskAttribute.className ? ' ' + maskAttribute.className : ''}`}>
        <div {...others} className={`emoji active${others.className ? ' ' + others.className : ''}`}>
          <div className="emoji-edit">
            {licon}
            {liconAttribute && <i {...liconAttribute} className={`icon${liconAttribute.className ? ' ' + liconAttribute.className : ''}`}></i>}
            <InputPre
              ref="$ComponentInputPre"
              className="emoji-edit-input"
              inputAttribute={{style: {padding: '0'}}}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              {...inputProps}
            />
            <i ref={(el) => {this.$icon = el;}} className={`icon emoji-edit-icon`}></i>
            <Button ref="$ComponentSubmit" {...submitProps} className={`emoji-edit-submit${submitProps.className ? ' ' + submitProps.className : ''}`} disabled={!value}>{submitProps.caption || (locale['submit'] || '提交')}</Button>
          </div>
          <Carrousel ref="$ComponentCarrousel" {...carrouselProps} pagination className={`carrousel-container emoji-carrousel${carrouselProps.className ? ' ' + carrouselProps.className : ''}`} style={{display: 'none'}}>
            {this.getFaceDOM()}
          </Carrousel>
        </div>
      </div>,
      portal || this.context.portal || document.getElementById('root') || document.body
    );
  }
}
