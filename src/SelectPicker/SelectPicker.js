import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

if (!window._seeds_lang) window._seeds_lang = {} // 国际化数据

export default class SelectPicker extends Component {
  static propTypes = {
    portal: PropTypes.object,
    multiple: PropTypes.bool, // 是否允许多选
    list: PropTypes.array, // [key: 'xx', value: 'xx']
    split: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    valueForKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    
    maskClassName: PropTypes.string,
    maskStyle: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,

    slotClassName: PropTypes.string,
    show: PropTypes.bool,
    onClickMask: PropTypes.func,
    onClickCancel: PropTypes.func,
    onClickSubmit: PropTypes.func,
  }
  static defaultProps = {
    split: ',',
    slotClassName: 'text-center'
  }
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
  }
  componentDidUpdate = (prevProps) => {
    if (this.$el && this.props.show !== prevProps.show) {
      const selectedKeys = Object.values(this.getSelected() || []) || [];
      [].slice.call(this.$el.querySelectorAll('.selectpicker-option')).forEach((n, i) => {
        if (selectedKeys.indexOf(this.props.list[i].key) !== -1) {
          n.classList.add('active');
        } else {
          n.classList.remove('active');
        }
      })
    }
  }
  getSelected = () => {
    const selected = this.props.valueForKey || this.props.value;
    const selectedName = this.props.valueForKey ? 'key' : 'value';
    if (selected) {
      const options = selected.split(this.props.split || ',').map((value) => {
        for (var i = 0, li; li = this.props.list[i++];) { // eslint-disable-line
          if (li[selectedName] === value) {
            return li.key;
          }
        }
        return '';
      });
      return options;
    } else {
      return [];
    }
  }
  onClick = (e) => {
    if (e.target.classList.contains('picker-mask')) { // 点击遮罩
      if (this.props.onClickMask) this.props.onClickMask(e)
    } else if (e.target.classList.contains('selectpicker-option')) { // 点击项
      if (this.props.onClickOption) this.props.onClickOption(e)
      const index = e.target.getAttribute('data-index');
      if (!this.props.multiple && this.props.onClickSubmit) {
        this.props.onClickSubmit([this.props.list[index]], Number(index));
      } else {
        e.target.classList.toggle('active');
      }
    } else if (e.target.classList.contains('picker-submit')) { // 点击确定按钮
      var selected = [];
      [].slice.call(this.$el.querySelectorAll('.selectpicker-option.active')).forEach((n) => {
        const index = n.getAttribute('data-index');
        selected.push(this.props.list[index])
      })
      if (this.props.onClickSubmit) this.props.onClickSubmit(selected);
    } else if (e.target.classList.contains('picker-cancel')) { // 点击取消按钮
      if (this.props.onClickCancel) this.props.onClickCancel(e);
    }
  }
  render() {
    const {
      show,
      list, multiple,
      maskClassName, maskStyle,
      className, style
    } = this.props;
    return createPortal(
      <div className={`mask picker-mask${maskClassName ? ' ' + maskClassName : ''}${show ? ' active' : ''}`} style={maskStyle} ref={(el) => {this.$el = el}} onClick={this.onClick}>
        <div className={`selectpicker${className ? ' ' + className : ''}${show ? ' active' : ''}`} style={style}>
          <div className="picker-header">
            <a className="picker-cancel">{window._seeds_lang['cancel'] || '取消'}</a>
            <a className={`picker-submit${multiple ? '' : ' disabled'}`}>{window._seeds_lang['finish'] || '完成'}</a>
          </div>
          <div className="selectpicker-wrapper">
            {list && list.length && list.map((item, index) => {
              return <div key={index} className={`selectpicker-option`} data-index={index}>
                <p className="selectpicker-option-caption">{item.value}</p>
                <i className="selectpicker-option-icon"></i>
              </div>
            })}
          </div>
        </div>
      </div>,
      this.props.portal || document.getElementById('root')
    );
  }
}
