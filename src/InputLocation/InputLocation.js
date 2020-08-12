import React, {forwardRef, useRef, useImperativeHandle, useContext, useState, useEffect, Fragment, useDebugValue} from 'react';
import InputText from './../InputText';
import Bridge from './../Bridge';
import MapView from './../MapView';
import MapChoose from './../MapChoose';
import Context from '../Context/instance.js';

// 函数组件因为没有实例, 所以也没有ref, 必须通过forwardRef回调ref
const InputLocation = forwardRef(({
  ak, // 地图预览和选择地点时需要传入, 如果地图已经加载, 则不需要传入ak
  loadingValue,
  failedValue,
  readOnly, // 无: 点击整行定位; false: 允许手动修改位置信息; true: 只读,点击无效;
  autoLocation, // 自动定位, 选点模式不支持自动定位
  onClick,
  onChange,
  type = 'location', // location: 点击定位当前位置, choose: 点击选择地点
  preview = true, // 是否支持单击预览, readOnly为true时才生效 
  selected, // {latitude: '纬度', longitude: '经度', address:'地址'}
  ...others
}, ref) =>  {
  const refEl = useRef(null)
  useImperativeHandle(ref, () => {
    return refEl.current
  });
  // 地图预览
  const [viewMapShow, setViewMapShow] = useState(false);
  const [viewMapData, setViewMapData] = useState(null);
  // 地图选点
  const [chooseMapInit, setChooseMapInit] = useState(false);
  const [chooseMapShow, setChooseMapShow] = useState(false);
  let [chooseMapData, setChooseMapData] = useState(null);

  const context = useContext(Context) || {};
  const locale = context.locale || function (key) {return key || ''};
  if (!loadingValue || typeof loadingValue !== 'string') {
    loadingValue = locale('location') || '定位中...';
  }
  if (!failedValue || typeof failedValue !== 'string') {
    failedValue = locale('hint_location_failed') || '定位失败, 请检查定位权限是否开启'
  }

  useEffect(() => {
    async function fetchData () {
      // 自动定位
      if (autoLocation) {
        if (selected && selected.latitude && selected.longitude) {
          if (selected.address) { // 有地址, 则定位完成
            if (onChange) onChange({target: refEl.current}, selected.address, selected);
          } else { // 无地址, 则需要地址逆解析
            setStatus('-1'); // 定位中...
            const result = await Bridge.getAddress({ // 只支持gcj02
              latitude: selected.latitude,
              longitude: selected.longitude
            });
            const address = result && result.address ? result.address : ''
            if (address) {
              setStatus('1')
              // 回调onChange
              if (onChange) onChange({target: refEl.current}, address, result);
              // 自动定位设置选择地图的数据
              chooseMapData = {
                point: [selected.longitude, selected.latitude],
                address: address
              };
              setChooseMapData(chooseMapData);
            } else {
              setStatus('0')
            }
          }
        } else {
          location({
            target: refEl.current,
            currentTarget: refEl.current
          }, true)
        }
      }
      // 选点模式, 默认读取传入的坐标
      if (type === 'choose' && selected && selected.latitude && selected.longitude) {
        if (!chooseMapData || !chooseMapData.point || !chooseMapData.address) {
          setChooseMapData({
            point: [selected.longitude, selected.latitude],
            address: selected.address || ''
          })
        }
      }
    }
    fetchData();
  }, [])

  const [status, setStatus] = useState('1') // 定位状态, -1.定位中和0.定位失败时隐藏text框, 显示定位中或者定位失败的div, 1定位成功显示文本框
  function clickHandler (event, value) {
    var e = event.nativeEvent;
    // 触发点击事件
    if (onClick) {
      onClick(e, value);
    }
    // 只读状态下仅能预览定位
    if (readOnly) {
      if (preview) { // 预览
        if (selected && selected.longitude && selected.latitude) {
          setViewMapData({
            point: [selected.longitude, selected.latitude],
            address: selected.address,
            show: true
          });
          setViewMapShow(true);
          preview(e, {errMsg: `preview:ok`})
        } else {
          if (typeof preview === 'function') {
            preview(e, {errMsg: `preview:fail${locale('hint_location_preview_fail') || '坐标不正确, 预览失败'}`})
          }
        }
      }
      return;
    }
    // 正在定位不允许操作
    if (status === '-1') {
      return;
    }

    // 编辑状态下仅允许点击右边图标定位
    if (readOnly === false) {
      if (e.target.classList.contains('input-location-icon')) {
        location(e);
      } else if (status === '0') { // 非只读状态下, 点击错误面板, 允许手动输入位置
        setStatus('1');
      }
      return;
    }

    // 非编辑状态下点击整行定位
    location(e);
  }

  // 定位, isAutoLocation表示初始化时自动定位
  function location (e, isAutoLocation) {
    Bridge.debug = true
    // 如果type为choose为选择定位
    if (!isAutoLocation && type === 'choose') {
      if (!chooseMapInit) {
        setChooseMapInit(true);
      }
      setChooseMapShow(true);
      return;
    }
    // 定位中...
    setStatus('-1');
    Bridge.getLocation({
      type: 'gcj02',
      success: async (data) => {
        // 客户端中不需要再getAddress
        if (data.address) {
          // 赋值
          if (onChange) {
            onChange(e, data.address, data);
            setStatus('1');
            // 自动定位设置选择地图的数据
            setChooseMapData({
              point: [data.longitude, data.latitude],
              address: data.address
            });
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
          // 自动定位设置选择地图的数据
          setChooseMapData({
            point: [data.longitude, data.latitude],
            address: address
          });
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

  // 选点
  function chooseHandler (e, value, data) {
    setChooseMapShow(false)
    const address = data && data.address ? data.address : ''
    if (onChange) onChange({target: refEl.current}, address, data);
  }

  // 计算class, 防止重要class被覆盖
  let inputClassName = (others.inputAttribute || {}).className || '';
  let riconClassName = (others.riconAttribute || {}).className;
  if (riconClassName === undefined) {
    riconClassName = `input-location-icon size24 ${type === 'choose' ? 'input-location-icon-choose' : 'input-location-icon-location'}`
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
      onClick={clickHandler}
      onChange={onChange}
      children={statusDOM}
      {...others}
      riconAttribute={readOnly ? null : Object.assign({}, others.riconAttribute, {className: `${status === '-1' ? riconClassName + ' input-location-icon-active' : riconClassName}`})}
      inputAttribute={Object.assign({}, others.inputAttribute, {className: statusDOM ? 'hide-important input-location-success ' + inputClassName: 'input-location-success ' + inputClassName})} // 定位中和定位失败时隐藏text框, 显示定位中或者定位失败的div
    />
    {viewMapData && <MapView
      ak={ak}
      show={viewMapShow}
      header={viewMapData.address ? <div className="map-bar border-b">{viewMapData.address}</div> : null}
      points={[viewMapData.point]}
      portal={context.portal || document.getElementById('root') || document.body}
      onHide={() => setViewMapShow(false)}
    />}
    {chooseMapInit && <MapChoose
      ak={ak}
      show={chooseMapShow}
      autoLocation
      point={chooseMapData && chooseMapData.point ? chooseMapData.point : null}
      address={chooseMapData && chooseMapData.address ? chooseMapData.address : null}
      portal={context.portal || document.getElementById('root') || document.body}
      onHide={() => setChooseMapShow(false)}
      onChange={chooseHandler}
    />}
  </Fragment>
})

export default InputLocation
