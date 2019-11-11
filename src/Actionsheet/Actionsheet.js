import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

if (!window._seeds_lang) window._seeds_lang = {} // 国际化数据

export default class Actionsheet extends Component {
  static propTypes = {
    portal: PropTypes.object,
    show: PropTypes.bool,

    list: PropTypes.array, // [{caption: string, onClick: func}]

    maskAttribute: PropTypes.object,
    groupAttribute: PropTypes.object,
    optionAttribute: PropTypes.object,

    cancelCaption: PropTypes.node,
    cancelAttribute: PropTypes.object,

    onClick: PropTypes.func
  }
  static defaultProps = {
    cancelCaption: window._seeds_lang['cancel'] || '取消'
  }
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
  }
  onClick = (e) => {
    const {
      onClick = {},
      maskAttribute = {},
      groupAttribute = {},
      optionAttribute = {},
      cancelAttribute = {}
    } = this.props;
    var target = e.target;
    // 获取值
    var item = null;
    var index = null;
    if (target.classList.contains('actionsheet-option')) {
      index = target.getAttribute('data-index');
      index = Number(index);
      item = this.props.list[index] || null;
    }
    // 区分点击事件
    e.stopPropagation()
    if (target.classList.contains('actionsheet-option') && optionAttribute.onClick) {
      optionAttribute.onClick(e, item, index);
      return;
    }
    if (target.classList.contains('actionsheet-group') && groupAttribute.onClick) {
      groupAttribute.onClick(e, item, index);
      return;
    }
    if (target.classList.contains('actionsheet-mask') && maskAttribute.onClick) {
      maskAttribute.onClick(e, item, index);
      return;
    }
    if (target.classList.contains('actionsheet-cancel') && cancelAttribute.onClick) {
      cancelAttribute.onClick(e, item, index);
      return;
    }
    if (onClick) onClick(e, item, index);
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

      list,

      maskAttribute = {},
      groupAttribute = {},
      optionAttribute = {},
      
      cancelCaption,
      cancelAttribute = {},

      onClick,
      ...others
    } = this.props;

    // 剔除掉onClick事件, 因为在容器onClick已经回调了
    var showCancel = cancelAttribute.onClick;
    maskAttribute = this.filterProps(maskAttribute)
    groupAttribute = this.filterProps(groupAttribute)
    optionAttribute = this.filterProps(optionAttribute)
    cancelAttribute = this.filterProps(cancelAttribute)

    return createPortal(
      <div ref={(el) => {this.$el = el}} {...maskAttribute} className={`mask actionsheet-mask${maskAttribute.className ? ' ' + maskAttribute.className : ''}${show ? ' active' : ''}`} onClick={this.onClick}>
        <div data-animation="slideUp" {...others} className={`actionsheet${others.className ? ' ' + others.className : ''}${show ? ' active' : ''}`}>
          <div {...groupAttribute} className={`actionsheet-group${groupAttribute.className ? ' ' + groupAttribute.className : ''}`}>
            {list && list.map((item, index) => {
              return <a {...optionAttribute} className={`actionsheet-option${optionAttribute.className ? ' ' + optionAttribute.className : ' border-b'}`} key={index} data-index={index}>{item.caption}</a>
            })}
          </div>
          {showCancel && <a {...cancelAttribute} className={`actionsheet-cancel${cancelAttribute.className ? ' ' + cancelAttribute.className : ''}`}>{cancelCaption}</a>}
        </div>
      </div>,
      portal || document.getElementById('root') || document.body
    );
  }
}
