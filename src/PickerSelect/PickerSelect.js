import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

if (!window._seeds_lang) window._seeds_lang = {} // 国际化数据

export default class PickerSelect extends Component {
  static propTypes = {
    portal: PropTypes.object,
    multiple: PropTypes.bool, // 是否允许多选
    list: PropTypes.array, // [{key: '', value: ''}]
    split: PropTypes.string,

    show: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    valueForKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),

    maskAttribute: PropTypes.object,
    submitAttribute: PropTypes.object,
    cancelAttribute: PropTypes.object,
    optionAttribute: PropTypes.object
  }
  static defaultProps = {
    split: ','
  }
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
  }
  componentDidUpdate = (prevProps) => {
    const {
      list,
      show
    } = this.props;
    if (!list || !list.length) return;
    if (this.$el && show !== prevProps.show) {
      const selectedKeys = Object.values(this.getSelectedKeys() || []) || [];
      [].slice.call(this.$el.querySelectorAll('.pickerselect-option')).forEach((n, i) => {
        if (selectedKeys.indexOf(list[i].key) !== -1) {
          n.classList.add('active');
        } else {
          n.classList.remove('active');
        }
      })
    }
  }
  // 获取选中的key
  getSelectedKeys = () => {
    const {
      list,
      valueForKey,
      value,
      split
    } = this.props;
    const selected = valueForKey || value;
    const selectedName = valueForKey ? 'key' : 'value';
    if (selected) {
      const options = selected.split(split || ',').map((val) => {
        for (var i = 0, option; option = list[i++];) { // eslint-disable-line
          if (option[selectedName] === val) {
            return option.key;
          }
        }
        return '';
      });
      return options;
    } else {
      return [];
    }
  }
  // 点击遮罩
  onClick = (e) => {
    const {
      multiple,
      list,
      maskAttribute = {},
      optionAttribute = {},
      submitAttribute = {},
      cancelAttribute = {}
    } = this.props;
    if (e.target.classList.contains('picker-mask')) { // 点击遮罩
      if (maskAttribute.onClick) maskAttribute.onClick(e)
    } else if (e.target.classList.contains('pickerselect-option')) { // 点击项
      if (optionAttribute.onClick) optionAttribute.onClick(e)
      const index = e.target.getAttribute('data-index');
      if (!multiple && submitAttribute.onClick) {
        e.activeOptions = [list[index]];
        e.activeIndex = [Number(index)];
        submitAttribute.onClick(e);
      } else {
        e.target.classList.toggle('active');
      }
    } else if (e.target.classList.contains('picker-submit')) { // 点击确定按钮
      var selected = [];
      var selectedIndex = [];
      [].slice.call(this.$el.querySelectorAll('.pickerselect-option.active')).forEach((n) => {
        const index = n.getAttribute('data-index');
        selected.push(list[index]);
        selectedIndex.push(index);
      });
      e.activeOptions = selected;
      e.activeIndex = selectedIndex;
      if (submitAttribute.onClick) submitAttribute.onClick(e);
    } else if (e.target.classList.contains('picker-cancel')) { // 点击取消按钮
      if (cancelAttribute.onClick) cancelAttribute.onClick(e);
    }
  }
  // 过滤已经回调的属性
  filterProps = (props) => {
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
      multiple,
      list,
      split,
      show,
      value,
      valueForKey,

      maskAttribute = {},
      submitAttribute = {},
      cancelAttribute = {},
      optionAttribute = {},
      ...others
    } = this.props;
    // 剔除掉onClick事件, 因为在instance时已经回调了
    maskAttribute = this.filterProps(maskAttribute)
    submitAttribute = this.filterProps(submitAttribute)
    cancelAttribute = this.filterProps(cancelAttribute)
    optionAttribute = this.filterProps(optionAttribute)
    return createPortal(
      <div ref={(el) => {this.$el = el}} {...maskAttribute} className={`mask picker-mask${maskAttribute.className ? ' ' + maskAttribute.className : ''}${show ? ' active' : ''}`} onClick={this.onClick}>
        <div {...others} className={`pickerselect${others.className ? ' ' + others.className : ''}${show ? ' active' : ''}`}>
          <div className="picker-header">
            <a {...cancelAttribute} className={`picker-cancel${cancelAttribute.className ? ' ' + cancelAttribute.className : ''}`}>{cancelAttribute.caption || (window._seeds_lang['cancel'] || '取消')}</a>
            <a {...submitAttribute} className={`picker-submit${submitAttribute.className ? ' ' + submitAttribute.className : ''}${multiple ? '' : ' disabled'}`}>{cancelAttribute.caption || (window._seeds_lang['finish'] || '完成')}</a>
          </div>
          <div className="pickerselect-wrapper">
            {list && list.length && list.map((item, index) => {
              return <div key={index} {...optionAttribute} className={`pickerselect-option${optionAttribute.className ? ' ' + optionAttribute.className : ''}`} data-index={index}>
                <p className="pickerselect-option-caption">{item.value}</p>
                <i className="pickerselect-option-icon"></i>
              </div>
            })}
          </div>
        </div>
      </div>,
      portal || document.getElementById('root') || document.body
    );
  }
}
