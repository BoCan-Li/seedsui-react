import React, {useEffect, useContext, createRef, forwardRef} from 'react';
import {createPortal} from 'react-dom';
import Carrousel from './../Carrousel';
import InputPre from './../InputText';
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
  const refElMask = createRef(null)
  const refEl = createRef(null)
  const refElIcon = createRef(null)
  const refElSubmit = createRef(null)
  const instance = createRef(null)
  const refComponentInputText = createRef(null)
  const refComponentCarrousel = createRef(null)
  // 自动获取焦点
  useEffect(() => {
    let refInput = refComponentInputText.current.refElInput.current;
    if (autoFocus) {
      refInput.focus();
    }
  }, [show]);

  // 初始化
  useEffect(() => {
    // 输入框
    let refElInput = refComponentInputText.current.refElInput.current;
    let refFnPreAutoSize = refComponentInputText.current.refFnPreAutoSize;
    if (autoFocus && refElInput) refElInput.focus();
    if (instance.current) return
    instance.current = new Instance({
      data: data,

      mask: refElMask.current,
      isClickMaskHide: false,
      onClickMask: maskAttribute.onClick ? (s) => maskAttribute.onClick(s.event) : null,

      onClickSubmit: submitProps.onClick ? (s, value) => submitProps.onClick(s.event, value) : null,

      onChange: (s, value) => {
        if (refElInput && refElInput.nextSibling.tagName === 'PRE' && onChange) {
          onChange(s.event, value)
          // 自增高
          refFnPreAutoSize(refElInput, refElInput.nextSibling);
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
    var propsed = {}
    for (let n in props) {
      if (n !== 'onClick') {
        propsed[n] = props[n]
      }
    }
    return propsed;
  }

  // context
  const context = useContext(Context) || {};
  const locale = context.locale || {};


  // 剔除掉onClick事件, 因为在instance时已经回调了
  maskAttribute = filterProps(maskAttribute)
  submitProps = filterProps(submitProps)
  return createPortal(
    <div ref={refElMask} {...maskAttribute} className={`mask emoji-mask${show ? ' active' : ''}${maskAttribute.className ? ' ' + maskAttribute.className : ''}`}>
      <div ref={refEl} {...others} className={`emoji active${others.className ? ' ' + others.className : ''}`}>
        <div className="emoji-edit">
          {licon}
          {liconAttribute && <i {...liconAttribute} className={`icon${liconAttribute.className ? ' ' + liconAttribute.className : ''}`}></i>}
          <InputPre
            ref={refComponentInputText}
            className="emoji-edit-input"
            inputAttribute={{style: {padding: '0'}}}
            value={value}
            onChange={onChange}
            placeholder={placeholder || locale['say_something'] || '说点什么吧...'}
            {...inputProps}
          />
          <i ref={refElIcon} className={`icon emoji-edit-icon`}></i>
          <Button ref={refElSubmit} {...submitProps} className={`emoji-edit-submit${submitProps.className ? ' ' + submitProps.className : ''}`} disabled={!value}>{submitProps.caption || (locale['submit'] || '提交')}</Button>
        </div>
        <Carrousel ref={refComponentCarrousel} {...carrouselProps} pagination className={`carrousel-container emoji-carrousel${carrouselProps.className ? ' ' + carrouselProps.className : ''}`} style={{display: 'none'}}>
          {getFaceDOM()}
        </Carrousel>
      </div>
    </div>,
    portal || context.portal || document.getElementById('root') || document.body
  );
})

export default Emoji
