import React, { forwardRef, useRef, useEffect, useContext } from 'react';
import {createPortal} from 'react-dom';
import Instance from './instance.js';
import Context from '../Context/instance.js';

const Picker = forwardRef(({
  portal,
  list = [], // [{key: '', value: ''}]

  show = false,
  value,
  valueForKey,

  maskAttribute = {},
  submitAttribute = {},
  cancelAttribute = {},
  slotAttribute = {},
  ...others
}, ref) =>  {
  ref = useRef(null);
  const instance = useRef(null);
  useEffect(() => {
    initInstance()
  }, [])

  useEffect(() => {
    if (instance.current) {
      if (show && list.length) {
        setDefault();
        instance.current.show();
      } else {
        instance.current.hide()
      }
    } else if (list && list.length > 0) {
      initInstance();
    }
  }, [show])

  function setDefault () {
    let key = valueForKey || '';
    if (!key) {
      const defaultOpt = getDefaults();
      if (defaultOpt && defaultOpt.key) key = defaultOpt.key;
    }
    instance.current.clearSlots();
    instance.current.addSlot(list, key || '', slotAttribute.className || 'text-center'); // 添加列,参数:数据,默认key,样式(lock样式为锁定列)
  }

  function getDefaults () {
    if (!valueForKey && !value) {
      if (list && list[0]) return list[0];
      return [{key: '', value: ''}];
    }
    const values = list.filter((item) => {
      if (valueForKey) {
        if (valueForKey === item.key) return true
      } else if (value) {
        if (item.value === value) return true
      }
      return false
    });
    return values[0];
  }

  function initInstance () {
    if (!list || !list.length || instance.current) return;
    // render数据
    instance.current = new Instance({
      mask: ref.current,
      onClickMask: (e) => {
        if (maskAttribute.onClick) maskAttribute.onClick(e)
      },
      onClickCancel: (e) => {
        if (cancelAttribute.onClick) cancelAttribute.onClick(e);
      },
      onClickSubmit: (e) => {
        const value = e.activeOptions[0].value;
        const options = e.activeOptions;
        if (submitAttribute.onClick) submitAttribute.onClick(e, value, options);
      },
      onHid: (e) => {
      }
    });
    // 默认项
    const defaultOpt = getDefaults();
    let key = '';
    if (defaultOpt && defaultOpt.key) key = defaultOpt.key;
    instance.current.addSlot(list, key, slotAttribute.className || 'text-center');
    if (show && instance.current) {
      instance.current.show()
    }
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
  const otherMaskAttribute = filterProps(maskAttribute)
  const otherSubmitAttribute = filterProps(submitAttribute)
  const otherCancelAttribute = filterProps(cancelAttribute)
  return createPortal(
    <div ref={ref} {...otherMaskAttribute} className={`mask picker-mask${otherMaskAttribute.className ? ' ' + otherMaskAttribute.className : ''}`}>
      <div {...others} className={`picker${others.className ? ' ' + others.className : ''}`}>
        <div className="picker-header">
          <a {...otherCancelAttribute} className={`picker-cancel${otherCancelAttribute.className ? ' ' + otherCancelAttribute.className : ''}`}>{otherCancelAttribute.caption || (locale['cancel'] || '取消')}</a>
          <a {...otherSubmitAttribute} className={`picker-submit${otherSubmitAttribute.className ? ' ' + otherSubmitAttribute.className : ''}`}>{otherSubmitAttribute.caption || (locale['finish'] || '完成')}</a>
        </div>
        <div className="picker-wrapper">
          <div className="picker-layer">
            <div className="picker-layer-frame"></div>
          </div>
          <div className="picker-slotbox"></div>
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
