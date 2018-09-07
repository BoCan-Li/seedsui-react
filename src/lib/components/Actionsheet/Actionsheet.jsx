import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

export default class Actionsheet extends Component {
  static propTypes = {
    portal: PropTypes.object,
    args: PropTypes.any,
    show: PropTypes.bool,

    duration: PropTypes.number,

    list: PropTypes.array, // [{caption: string, onClick: func}]

    maskStyle: PropTypes.object,
    maskClassName: PropTypes.string,
    onClickMask: PropTypes.func,

    style: PropTypes.object,
    className: PropTypes.string,

    cancelStyle: PropTypes.object,
    cancelClassName: PropTypes.string,
    cancelCaption: PropTypes.node,
    onClickCancel: PropTypes.func,
  }
  static defaultProps = {
    cancelCaption: '取消',
  }
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
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
  onClickCancel = (e) => {
    if (this.props.onClickCancel) this.props.onClickCancel(this.getArgs(e));
    e.stopPropagation();
  }
  onClick = (e) => {
    const target = e.target;
    const index = target.getAttribute('data-index');
    if (this.props.onClick) {
      this.props.onClick(this.props.list[index], Number(index));
      e.stopPropagation();
    }
  }
  render() {
    const {
      duration, show,
      maskClassName, maskStyle,
      className, style,
      list,
      groupStyle, groupClassName,
      optionStyle, optionClassName,
      cancelCaption, cancelStyle, cancelClassName, onClickCancel
    } = this.props;
    return createPortal(
      <div ref={(el) => {this.$el = el}} className={`mask actionsheet-mask${maskClassName ? ' ' + maskClassName : ''}${show ? ' active' : ''}`} style={Object.assign(duration !== undefined ? {WebkitTransitionDuration: duration + 'ms'} : {}, maskStyle)} onClick={this.onClickMask}>
        <div className={`actionsheet${className ? ' ' + className : ''}${show ? ' active' : ''}`} style={Object.assign(duration !== undefined ? {WebkitTransitionDuration: duration + 'ms'} : {}, style)} data-animation="slideUp">
          <div className={`actionsheet-group${groupClassName ? ' ' + groupClassName : ''}`} style={groupStyle}>
            {list && list.map((item, index) => {
              return <a className={`actionsheet-option${optionClassName ? ' ' + optionClassName : ''}`} style={optionStyle} key={index} data-index={index} onClick={this.onClick}>{item.caption}</a>
            })}
          </div>
          {onClickCancel && <a className={`actionsheet-cancel${cancelClassName ? ' ' + cancelClassName : ''}`} style={cancelStyle} onClick={this.onClickCancel}>{cancelCaption}</a>}
        </div>
      </div>,
      this.props.portal || document.getElementById('root')
    );
  }
}
