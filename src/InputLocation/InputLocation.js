import React, {forwardRef, useRef, useImperativeHandle, useContext, useState, useEffect, Fragment} from 'react';
import InputText from './../InputText';
import Bridge from './../Bridge';
import MapView from './../MapView';
import Context from '../Context/instance.js';

// 函数组件因为没有实例, 所以也没有ref, 必须通过forwardRef回调ref
const InputLocation = forwardRef(({
  loadingValue,
  failedValue,
  readOnly, // 无: 点击整行定位; false: 允许手动修改位置信息; true: 只读,点击无效;
  autoLocation,
  onClick,
  onChange,
  preview = true, // 是否支持单击预览, readOnly为true时才生效
  selected, // {latitude: '纬度', longitude: '经度', address:'地址'}
  ...others
}, ref) =>  {
  const refEl = useRef(null)
  useImperativeHandle(ref, () => {
    return refEl.current
  });
  const [mapShow, setMapShow] = useState(false);
  const [mapData, setMapData] = useState(null);

  const context = useContext(Context) || {};
  const locale = context.locale || function (key) {return key || ''};
  if (!loadingValue || typeof loadingValue !== 'string') {
    loadingValue = locale('location') || '定位中...';
  }
  if (!failedValue || typeof failedValue !== 'string') {
    failedValue = locale('hint_location_failed') || '定位失败, 请检查定位权限是否开启'
  }

  useEffect(() => {
    if (autoLocation) {
      location({
        target: refEl.current,
        currentTarget: refEl.current
      })
    }
  }, [])

  const [status, setStatus] = useState('1') // 定位状态, 定位中和定位失败时隐藏text框, 显示定位中或者定位失败的div
  function click (event, value) {
    // 正在定位不允许操作
    if (status === '-1') {
      return;
    }
    // 触发点击事件
    var e = event.nativeEvent;
    if (onClick) {
      onClick(e, value);
    }
    // 只读状态不允许定位
    if (readOnly === true) {
      if (preview && selected && selected.longitude && selected.latitude) { // 预览
        setMapData({
          point: [selected.longitude, selected.latitude],
          address: selected.address,
          show: true
        });
        setMapShow(true);
      }
      return;
    }
    // 非只读状态下, 点击错误面板, 允许手动输入位置
    if (readOnly === false && status === '0') {
      setStatus('1');
      return;
    }
    // 如果非只读, 则仅允许点击图标定位
    if (readOnly === false && !e.target.classList.contains('input-location-icon')) {
      return;
    }
    // 定位
    location(e);
  }

  function location (e) {
    Bridge.debug = true
    // 定位中...
    setStatus('-1')
    Bridge.getLocation({
      type: 'gcj02',
      success: async (data) => {
        // 客户端中不需要再getAddress
        if (data.address) {
          // 赋值
          if (onChange) {
            onChange(e, data.address, data);
            setStatus('1')
          }
          return;
        }
        const result = await Bridge.getAddress({ // 只支持gcj02
          latitude: data.latitude,
          longitude: data.longitude
        });
        const address = result && result.address ? result.address : ''
        if (onChange) onChange(e, address, result);
        if (address) {
          setStatus('1')
        } else {
          setStatus('0')
        }
      },
      fail: (res) => {
        // 赋值
        if (onChange) onChange(e, '', null)
        setStatus('0')
        // 提示定位失败
        // Bridge.showToast(res.errMsg, {mask: false});
      }
    });
  }

  // 计算class, 防止重要class被覆盖
  let inputClassName = (others.inputAttribute || {}).className || '';
  let riconClassName = (others.riconAttribute || {}).className;
  if (riconClassName === undefined) {
    riconClassName = 'input-location-icon size24'
  }
  // 加载和错误面板, 显示这些面板时将会隐藏文本框, 样式必须与文本框一致
  let statusDOM = null;
  if (status === '-1') {
    statusDOM = <div className={`input-text ${inputClassName} input-location`} style={(others.inputAttribute || {}).style || {}}>{loadingValue}</div>
  } else if (status === '0') {
    statusDOM = <div className={`input-text ${inputClassName} input-location-error`} style={(others.inputAttribute || {}).style || {}}>{failedValue}</div>;
  }
  return <Fragment>
    <InputText
      ref={refEl}
      readOnly={!readOnly && readOnly !== false ? true : readOnly} // 不填写readOnly则认为文本框不允许输入, 只有readOnly为false时才允许输入
      onClick={click}
      onChange={onChange}
      children={statusDOM}
      {...others}
      riconAttribute={readOnly ? null : Object.assign({}, others.riconAttribute, {className: `${status === '-1' ? riconClassName + ' input-location-icon-active' : riconClassName}`})}
      inputAttribute={Object.assign({}, others.inputAttribute, {className: statusDOM ? 'hide-important input-location-success ' + inputClassName: 'input-location-success ' + inputClassName})} // 定位中和定位失败时隐藏text框, 显示定位中或者定位失败的div
    />
    {mapData && <MapView
      ak='3pTjiH1BXLjASHeBmWUuSF83'
      show={mapShow}
      header={mapData.address ? <div className="mapview-bar border-b">{mapData.address}</div> : null}
      points={[mapData.point]}
      portal={context.portal || document.getElementById('root') || document.body}
      onHide={() => setMapShow(false)}
    />}
  </Fragment>
})

export default InputLocation
