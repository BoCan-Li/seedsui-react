import React, {forwardRef, useRef, useImperativeHandle, useContext, useEffect} from 'react';
import {createPortal} from 'react-dom';
import treeData from './../PickerDistrict/instance.data.js';
import Instance from './instance.js';
import Context from '../Context/instance.js';

const PickerCity = forwardRef(({
  portal,
  data,
  dataFormat = { // {idPropertyName: 'id', namePropertyName: 'name', childPropertyName: 'children'}
    idPropertyName: 'id',
    namePropertyName: 'name',
    childPropertyName: 'children'
  },
  split = '-',

  type = 'district', // district | city
  show = false,
  value, // '北京-东城区'
  selected, // [{id: '', name: ''}]

  maskAttribute = {},
  submitAttribute = {},
  cancelAttribute = {},

  ...others
}, ref) =>  {
  const refEl = useRef(null)
  useImperativeHandle(ref, () => {
    return refEl.current
  });
  const instance = useRef(null)
  // context
  const context = useContext(Context) || {};
  const locale = context.locale || {};

  useEffect(() => {
    initInstance()
  }, []) // eslint-disable-line

  useEffect(() => {
    if (!instance.current) return
    if (show) {
      if (data) {
        instance.current.setData(data, {
          childPropertyName: dataFormat.childPropertyName,
          idPropertyName: dataFormat.idPropertyName,
          namePropertyName: dataFormat.namePropertyName
        })
      }
      setDefault();
      instance.current.show();
    } else {
      instance.current.hide()
    }
  }, [show])

  function setDefault () {
    if (selected && selected.length) {
      instance.current.setDefaultKeys(selected.map((item) => {
        return item.id
      }));
    } else {
      const defaultValues = getDefaultValues();
      instance.current.setDefaultValues(defaultValues);
    }
    instance.current.update();
  }
  function getDefaultValues () {
    // 默认值
    var defaultValue = value;
    var defaultValues = [];
    if (defaultValue) {
      defaultValues = defaultValue.split(split).map((item) => {
        return item.trim();
      });
    }
    return defaultValues;
  }
  function getDefaultKeys () {
    if (selected && selected.length > 1) {
      return selected.map((item) => {
        return item.id;
      });
    }
    return ['', '', ''];
  }
  function initInstance () {
    var defaultValues = getDefaultValues();
    var defaultKeys = getDefaultKeys();
    // render数据
    instance.current = new Instance({
      data: data || treeData,
      idPropertyName: dataFormat.idPropertyName,
      namePropertyName: dataFormat.namePropertyName,
      childPropertyName: dataFormat.childPropertyName,
      
      mask: refEl.current,
      split: split,
      viewType: type,
      defaultProvinceKey: defaultKeys[0] || '',
      defaultCityKey: defaultKeys[1] || '',
      defaultDistrictKey: defaultKeys[2] || '',
      defaultProvince: defaultValues[0] || '',
      defaultCity: defaultValues[1] || '',
      defaultDistrict: defaultValues[2] || '',
      onClickMask: (e) => {
        if (maskAttribute.onClick) maskAttribute.onClick(e)
      },
      onClickCancel: (e) => {
        if (cancelAttribute.onClick) cancelAttribute.onClick(e);
      },
      onClickSubmit: (e) => {
        const value = e.activeText;
        const options = e.activeOptions;
        if (submitAttribute.onClick) submitAttribute.onClick(e, value, options);
      },
      onHid: (e) => {
      }
    });
    if (show && instance.current) {
      setTimeout(function(){
        instance.current.show();
      },10);
    }
  }
  // 过滤已经回调的属性
  function filterProps (props) {
    if (!props) return {};
    const {onClick, ...otherProps} = props;
    return {...otherProps};
  }
  // 剔除掉onClick事件, 因为在instance时已经回调了
  const otherMaskAttribute = filterProps(maskAttribute)
  const otherSubmitAttribute = filterProps(submitAttribute)
  const otherCancelAttribute = filterProps(cancelAttribute)
  return createPortal(
    <div ref={refEl} {...otherMaskAttribute} className={`mask picker-mask${otherMaskAttribute.className ? ' ' + otherMaskAttribute.className : ''}`}>
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

export default React.memo(PickerCity, (prevProps, nextProps) => {
  if (nextProps.show === prevProps.show) return true;
  return false;
})
