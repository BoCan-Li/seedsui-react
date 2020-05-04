import React, {useEffect, useContext, createRef, forwardRef} from 'react';
import {createPortal} from 'react-dom';
import Carrousel from './../Carrousel';
import InputPre from './../InputPre';
import Button from './../Button';
import Instance from './instance.js';
import emojiData from './instance.data.js';
import Context from '../Context/instance.js';

const Emoji = forwardRef(({
  portal,
  show, // ios内核必须隐藏, 不能移除dom, 弹出时才不会有bug, 所以必须用show
  data = emojiData,

  autoFocus = false,
  value,
  placeholder,

  maskAttribute = {},
  submitProps = {},
  inputProps = {},
  carrouselProps = {},
  liconAttribute,
  licon,

  onChange,
  ...others
}, ref) =>  {
  const instance = createRef(null)
  // 自动获取焦点
  useEffect(() => {
    let elInput = ref.current.querySelector('.input-pre');
    if (autoFocus && elInput && show) {
      elInput.focus();
    }
  }, [show]);

  // 自动扩充功能
  function preAutoSize (target, preTarget) {
    target.style.height = preTarget.clientHeight + 'px';
  }
  // 初始化
  useEffect(() => {
    // 输入框
    let elInput = ref.current.querySelector('.input-pre');
    if (!elInput) return;
    let elPre = elInput.nextElementSibling;
    if (elPre.tagName !== 'PRE') return;
    if (autoFocus && elInput) elInput.focus();
    if (instance.current) return
    instance.current = new Instance({
      data: data,
      mask: ref.current,
      isClickMaskHide: false,
      onClickMask: (s) => {
        if (maskAttribute.onClick) maskAttribute.onClick(s.event)
      },
      onClickSubmit: (s) => {
        if (submitProps.onClick) submitProps.onClick(s.event)
      },
      onChange: (s, value) => {
        if (onChange) {
          onChange(s.event, value)
          // 自增高
          preAutoSize(elInput, elPre);
        }
      }
    });
  }, []) // eslint-disable-line

  // 表情
  function getFaceDOM () {
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
  function filterProps (props) {
    if (!props) return props;
    var propsed = Object.clone(props);
    if (propsed && propsed.onClick) delete propsed.onClick
    // for (let n in props) {
    //   if (n !== 'onClick') {
    //     propsed[n] = props[n]
    //   }
    // }
    return propsed;
  }

  // 过滤已经回调的属性
  function filterProps (props) {
    const {onClick, ...otherProps} = props;
    return {...otherProps};
  }

  // context
  const context = useContext(Context) || {};
  const locale = context.locale || {};


  // 剔除掉onClick事件, 因为在instance时已经回调了
  const otherMaskAttribute = filterProps(maskAttribute);
  const otherSubmitProps = filterProps(submitProps);
  return createPortal(
    <div ref={ref} {...maskAttribute} className={`mask emoji-mask${show ? ' active' : ''}${otherMaskAttribute.className ? ' ' + otherMaskAttribute.className : ''}`}>
      <div {...others} className={`emoji active${others.className ? ' ' + others.className : ''}`}>
        <div className="emoji-edit">
          {licon}
          {liconAttribute && <i {...liconAttribute} className={`icon${liconAttribute.className ? ' ' + liconAttribute.className : ''}`}></i>}
          <InputPre
            className="emoji-edit-input"
            inputAttribute={{style: {padding: '0'}}}
            value={value}
            onChange={onChange}
            placeholder={placeholder || locale['say_something'] || '说点什么吧...'}
            {...inputProps}
          />
          <i className={`icon emoji-edit-icon`}></i>
          <Button {...otherSubmitProps} className={`emoji-edit-submit${otherSubmitProps.className ? ' ' + otherSubmitProps.className : ''}`} disabled={!value}>{otherSubmitProps.caption || (locale['submit'] || '提交')}</Button>
        </div>
        <Carrousel {...carrouselProps} pagination className={`carrousel-container emoji-carrousel${carrouselProps.className ? ' ' + carrouselProps.className : ''}`} style={{display: 'none'}}>
          {getFaceDOM()}
        </Carrousel>
      </div>
    </div>,
    portal || context.portal || document.getElementById('root') || document.body
  );
})

export default Emoji
