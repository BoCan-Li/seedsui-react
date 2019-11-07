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
    var item = null;
    var index = null;
    if (e.target.classList.contains('actionsheet-option')) {
      index = target.getAttribute('data-index');
      index = Number(index);
      item = this.props.list[index] || null;
    }
    if (this.props.onClick) {
      this.props.onClick(e, item, index);
      e.stopPropagation()
    }
  }
  render() {
    const {
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
    return createPortal(
      <div ref={(el) => {this.$el = el}} {...maskAttribute} className={`mask actionsheet-mask${maskAttribute.className ? ' ' + maskAttribute.className : ''}${show ? ' active' : ''}`} onClick={this.onClick}>
        <div data-animation="slideUp" {...others} className={`actionsheet${others.className ? ' ' + others.className : ''}${show ? ' active' : ''}`}>
          <div {...groupAttribute} className={`actionsheet-group${groupAttribute.className ? ' ' + groupAttribute.className : ''}`}>
            {list && list.map((item, index) => {
              return <a {...optionAttribute} className={`actionsheet-option${optionAttribute.className ? ' ' + optionAttribute.className : ' border-b'}`} key={index} data-index={index}>{item.caption}</a>
            })}
          </div>
          {cancelAttribute.onClick && <a {...cancelAttribute} className={`actionsheet-cancel${cancelAttribute.className ? ' ' + cancelAttribute.className : ''}`}>{cancelCaption}</a>}
        </div>
      </div>,
      portal || document.getElementById('root')
    );
  }
}
