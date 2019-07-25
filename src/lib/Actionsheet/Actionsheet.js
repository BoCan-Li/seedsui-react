import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

const _ = window._seedsLang || {} // 国际化数据

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

    groupStyle: PropTypes.object,
    groupClassName: PropTypes.string,

    optionStyle: PropTypes.object,
    optionClassName: PropTypes.string,

    cancelStyle: PropTypes.object,
    cancelClassName: PropTypes.string,
    cancelCaption: PropTypes.node,
    onClickCancel: PropTypes.func,

    onClick: PropTypes.func
  }
  static defaultProps = {
    cancelCaption: _['cancel'] || '取消',
    optionClassName: 'border-b'
  }
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
  }
  onClick = (e) => {
    const target = e.target;
    if (target.classList.contains('actionsheet-mask')) {
      if (this.props.onClickMask) {
        this.props.onClickMask();
        e.stopPropagation();
      }
    } else if (target.classList.contains('actionsheet-option')) {
      const index = target.getAttribute('data-index');
      if (this.props.onClick) {
        this.props.onClick(this.props.list[index], Number(index));
        e.stopPropagation();
      }
    } else if (target.classList.contains('actionsheet-cancel')) {
      if (this.props.onClickCancel) {
        this.props.onClickCancel();
        e.stopPropagation();
      }
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
      <div ref={(el) => {this.$el = el}} className={`mask actionsheet-mask${maskClassName ? ' ' + maskClassName : ''}${show ? ' active' : ''}`} style={Object.assign(duration !== undefined ? {WebkitTransitionDuration: duration + 'ms'} : {}, maskStyle)} onClick={this.onClick}>
        <div className={`actionsheet${className ? ' ' + className : ''}${show ? ' active' : ''}`} style={Object.assign(duration !== undefined ? {WebkitTransitionDuration: duration + 'ms'} : {}, style)} data-animation="slideUp">
          <div className={`actionsheet-group${groupClassName ? ' ' + groupClassName : ''}`} style={groupStyle}>
            {list && list.map((item, index) => {
              return <a className={`actionsheet-option${optionClassName ? ' ' + optionClassName : ''}`} style={optionStyle} key={index} data-index={index}>{item.caption}</a>
            })}
          </div>
          {onClickCancel && <a className={`actionsheet-cancel${cancelClassName ? ' ' + cancelClassName : ''}`} style={cancelStyle}>{cancelCaption}</a>}
        </div>
      </div>,
      this.props.portal || document.getElementById('root')
    );
  }
}
