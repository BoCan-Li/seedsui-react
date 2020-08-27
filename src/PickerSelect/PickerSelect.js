import React, {forwardRef, useRef, useImperativeHandle, useEffect, useContext} from 'react';
import {createPortal} from 'react-dom';
import Context from '../Context/instance.js';

const Picker = forwardRef(({
  portal,
  multiple = false, // 是否允许多选
  list = [], // [{id: '', name: ''}]
  split = ',',

  show = false,
  value,
  selected,

  maskAttribute = {},
  submitAttribute = {},
  cancelAttribute = {},
  optionAttribute = {},
  ...others
}, ref) =>  {
  const refEl = useRef(null)
  useImperativeHandle(ref, () => {
    return refEl.current
  });
  // context
  const context = useContext(Context) || {};
  const locale = context.locale || function (key) {return key || ''};
  useEffect(() => {
    if (!list || !list.length) return;
    [].slice.call(refEl.current.querySelectorAll('.pickerselect-option')).forEach((n, i) => {
      n.classList.remove('active');
      if (selected && selected.length) {
        for (let option of selected) {
          if ((option.id !== undefined && option.id === list[i].id) || option.name === list[i].name) {
            n.classList.add('active');
          }
        }
      } else if (value) {
        let selectedValues = value.split(split || ',');
        for (let name of selectedValues) {
          if (name === list[i].name) {
            n.classList.add('active');
          }
        }
      }
    })
  }, [show]) // eslint-disable-line
  // 构建值
  function buildValue (options) {
    if (!multiple) return options[0].name;
    const value = options.map((item) => {
      return item.name;
    });
    return value.join(split || ',');
  }
  // 点击遮罩
  function onClick (e) {
    if (e.target.classList.contains('picker-mask')) { // 点击遮罩
      if (maskAttribute.onClick) maskAttribute.onClick(e)
    } else if (e.target.classList.contains('pickerselect-option')) { // 点击项
      if (optionAttribute.onClick) optionAttribute.onClick(e)
      const index = e.target.getAttribute('data-index');
      if (!multiple && submitAttribute.onClick) {
        e.activeOptions = [list[index]];
        e.activeIndex = [Number(index)];
        const value = buildValue(e.activeOptions);
        const options = e.activeOptions;
        submitAttribute.onClick(e, value, options);
      } else {
        e.target.classList.toggle('active');
      }
    } else if (e.target.classList.contains('picker-submit')) { // 点击确定按钮
      var selectedOptions = [];
      var selectedIndex = [];
      [].slice.call(refEl.current.querySelectorAll('.pickerselect-option.active')).forEach((n) => {
        const index = n.getAttribute('data-index');
        selectedOptions.push(list[index]);
        selectedIndex.push(index);
      });
      e.activeOptions = selectedOptions;
      e.activeIndex = selectedIndex;
      const value = buildValue(e.activeOptions);
      const options = e.activeOptions;
      if (submitAttribute.onClick) submitAttribute.onClick(e, value, options);
    } else if (e.target.classList.contains('picker-cancel')) { // 点击取消按钮
      if (cancelAttribute.onClick) cancelAttribute.onClick(e);
    }
  }
  // 过滤已经回调的属性
  function filterProps (props) {
    if (!props) return {};
    const {onClick, ...otherProps} = props;
    return {...otherProps};
  }
    // 如果没有数据, 则不显示
    if (!list || !list.length) return null;
    // 剔除掉onClick事件, 因为在instance时已经回调了
    const otherMaskAttribute = filterProps(maskAttribute)
    const otherSubmitAttribute = filterProps(submitAttribute)
    const otherCancelAttribute = filterProps(cancelAttribute)
    const otherOptionAttribute = filterProps(optionAttribute)
    return createPortal(
      <div ref={refEl} {...otherMaskAttribute} className={`mask picker-mask${otherMaskAttribute.className ? ' ' + otherMaskAttribute.className : ''}${show ? ' active' : ''}`} onClick={onClick}>
        <div {...others} className={`pickerselect${others.className ? ' ' + others.className : ''}${show ? ' active' : ''}`}>
          <div className="picker-header">
            <a {...otherCancelAttribute} className={`picker-cancel${otherCancelAttribute.className ? ' ' + otherCancelAttribute.className : ''}`}>{otherCancelAttribute.caption || (locale('cancel') || '取消')}</a>
            <a {...otherSubmitAttribute} className={`picker-submit${otherSubmitAttribute.className ? ' ' + submitAttribute.className : ''}${multiple ? '' : ' disabled'}`}>{otherSubmitAttribute.caption || (locale('finish') || '完成')}</a>
          </div>
          <div className="pickerselect-wrapper">
            {list.map((item, index) => {
              return <div key={index} {...otherOptionAttribute} className={`pickerselect-option${otherOptionAttribute.className ? ' ' + otherOptionAttribute.className : ''}`} data-index={index}>
                <p className="pickerselect-option-caption">{item.name}</p>
                <i className="pickerselect-option-icon"></i>
              </div>
            })}
          </div>
        </div>
      </div>,
      portal || context.portal || document.getElementById('root') || document.body
    );
  })

  export default React.memo(Picker, (prevProps, nextProps) => {
    if (nextProps.show === prevProps.show) return true;
    return false;
  })
  
