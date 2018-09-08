import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import Carrousel from './../Carrousel';
import InputPre from './../InputPre';
import Button from './../Button';
import Instance from './emoji.js';

export default class Dialog extends Component {
  static propTypes = {
    portal: PropTypes.object,
    args: PropTypes.any,
    show: PropTypes.bool,

    value: PropTypes.string,
    placeholder: PropTypes.string,

    isClickMaskHide: PropTypes.bool,
    onClickMask: PropTypes.func,

    maskClassName: PropTypes.string,
    maskStyle: PropTypes.object,

    className: PropTypes.string,
    style: PropTypes.object,

    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
  }
  static defaultProps = {
    args: null,
    placeholder: '请输入',
    isClickMaskHide: false
  }
  constructor(props) {
    super(props);
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps.show !== this.props.show && this.props.show === true && this.$inputPre) {
      this.$inputPre.$input.focus();
    }
  }
  componentDidMount = () => {
    Instance.init(this.$inputPre.$input);
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
  onClickMask = (e) => {
    if (this.props.onClickMask) this.props.onClickMask(this.getArgs(e));
    e.stopPropagation();
  }
  onSubmit = (e) => {
    if (this.props.onSubmit) this.props.onSubmit(this.props.value, this.getArgs(e));
  }
  onClick = (e) => {
    const target = e.target;
    // 点击表情
    if (target.getAttribute('data-emoji')) {
      const value = Instance.insertFace(target.getAttribute('alt'));
      if (this.props.onChange) this.props.onChange(value, this.getArgs(e));
    }
    e.stopPropagation();
  }
  getFaceDOM = () => {
    // 将icons分页
    const icons = [];
    let page = 0;
    let index = 0;
    for (let name in Instance.icons) {
      if (index !== 0 && index % 21 === 0) {
        page++;
      }
      if (!icons[page]) icons[page] = [];
      icons[page].push({key: name, value: Instance.icons[name]});
      index++;
    }
    // 生成DOM
    return icons.map((icon, i) => {
      return <div key={`page${i}`}>
        {icon.map((item, index) => {
          return <a key={`face${index}`} data-emoji={item.value} alt={item.key}>&nbsp;</a>
        })}
      </div>
    });
  }
  render() {
    const {
      value,
      show, placeholder,
      maskClassName, maskStyle,
      className, style,
      onChange
    } = this.props;
    return createPortal(
      <div ref={el => {this.$el = el;}} className={`mask emoji-mask${maskClassName ? ' ' + maskClassName : ''}${show ? ' active' : ''}`} style={maskStyle} onClick={this.onClickMask}>
        <div className={`emoji${className ? ' ' + className : ''}${show ? ' active' : ''}`} style={style} onClick={this.onClick}>
          <Carrousel pagination className="carrousel-container" style={{height: '186px'}}>
            {this.getFaceDOM()}
          </Carrousel>
          <InputPre
            ref={(el) => {this.$inputPre = el;}}
            className="emoji-input" inputClassName="basketline" inputStyle={{padding: '4px 8px'}}
            valueBindProp
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rcaption={<Button className="link outline emoji-button" disabled={!value} onClick={this.onSubmit}>提交</Button>}
          />
        </div>
      </div>,
      this.props.portal || document.getElementById('root')
    );
  }
}
