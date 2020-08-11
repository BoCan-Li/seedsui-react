import React, {forwardRef, useRef, useImperativeHandle, useContext, useState, useEffect} from 'react';
import {createPortal} from 'react-dom';
import MapUtil from './../MapUtil';
import Page from './../Page';
import Header from './../Header';
import Container from './../Container';
import Footer from './../Footer';
import Notice from './../Notice';
import Bridge from './../Bridge';
import Wrapper from './Wrapper';
import Close from './Close';
import Location from './Location';
import helper from './helper';
import Context from './../Context/instance.js';

const MapChoose = forwardRef(({
  ak, // 百度地图key
  show = true, // 百度地图不能移除DOM, 再渲染
  portal,
  caption,
  autoLocation,
  onHide,
  onChange,
  // 其它属性
  center = '江苏省,南京市',
  // 标记点
  point, // [118.798128, 31.968592] => 南京南站
  // 子元素
  header,
  children
}, ref) =>  {
  // 创建ref, useRef每次都会返回相同的引用, 所以用createRef
  const refEl = useRef(null)
  const refWrapperEl = useRef(null);
  useImperativeHandle(ref, () => {
    return refEl.current
  });
  // context
  const context = useContext(Context) || {};
  const locale = context.locale || function (key) {return key || ''};

  const [errMsg, setErrMsg] = useState('');
  let [address, setAddress] = useState('');
  let [data, setData] = useState(null);

  useEffect(() => {
    if (!window.BMap && !ak) {
      setErrMsg(locale('hint_map_ak') || '请传入百度地图ak');
      return;
    }
    MapUtil.load({
      ak: ak,
      success: () => {
        initData();
      },
      fail: () => {
        setErrMsg(locale('hint_map_failed_load') || '地图库加载失败, 请稍后再试');
      }
    })
    // 移除组件时注销
    return () => {
      helper.destroy();
    }
  }, []) // eslint-disable-line

  // 隐藏时, 移除标注
  // useEffect(() => {
  //   if (show === false) {
  //     helper.destroy();
  //   }
  // }, [show])

  // 初始化地图
  function initData () {
    if (!window.BMap) { // 如果有高德地图, 则加上 || !window.AMap
      setErrMsg(locale('hint_map_failed_load') || '地图库加载失败, 请稍后再试');
      return;
    }
    console.log('初始化地图' + center)
    if (!refWrapperEl.current) {
      setErrMsg(locale('hint_map_no_container') || '地图容器不存在');
      return;
    }
    // 拖拽结束回调
    helper.onDragEnd = function (res) {
      address = res && res.address ? res.address : '';
      setAddress(address);
      setData(res);
    }
    // 初始化地图
    helper.initMap(refWrapperEl.current, center, (result) => {
      if (typeof result === 'string') {
        setErrMsg(result);
        return;
      }
      // 自动定位
      if (!point && autoLocation) {
        locationHandler()
      }
    });
  }

  // 立即定位
  function locationHandler () {
    Bridge.debug = true;
    Bridge.getLocation({
      type: 'gcj02',
      success: async (data) => {
        helper.initMarker([data.longitude, data.latitude])
        // 客户端中不需要再getAddress
        if (data.address) {
          setAddress(address);
          setData(data);
          return;
        }
        const result = await Bridge.getAddress({ // 只支持gcj02
          latitude: data.latitude,
          longitude: data.longitude
        });
        
        const address = result && result.address ? result.address : ''
        setAddress(address);
        setData(result);
      },
      fail: (res) => {
        Bridge.showToast(res.errMsg, {mask: false});
      }
    });
  }

  // 提交
  function submitHandler () {
    if (onChange) {
      onChange({target: refEl.current}, address, data)
    }
  }

  // 绘制标记点
  useEffect(() => {
    if (point && point.length && show) {
      console.log('绘制标记')
      helper.initMarker(point)
    }
  }, [point]) // eslint-disable-line

  // 标题
  useEffect(() => {
    if (caption && show) {
      Bridge.setTitle(caption);
    }
  }, [caption])

  // 中断绘制
  useEffect(() => {
    if (show) {
      if (errMsg) {
        helper.abort = true;
      } else {
        helper.abort = false;
      }
    }
  }, [errMsg])

  const DOM = <Page ref={refEl} className={show ? '' : 'hide'}>
    {header && <Header>{header}</Header>}
    <Container>
      <Wrapper ref={refWrapperEl}/>
      {onHide && <Close onClick={onHide}/>}
      <Location onClick={locationHandler}/>
      {children}
    </Container>
    <Footer className="map-footer">
      <div className="map-footer-content">
        <p className="map-footer-content-caption">{locale('current_location') || '当前位置'}</p>
        <p className="map-footer-content-sndcaption">{address || ' '}</p>
      </div>
      {address && <span className="map-footer-submit" onClick={submitHandler}>{locale('ok') || '确定'}</span>}
    </Footer>
    {errMsg && <Notice caption={errMsg}/>}
  </Page>;
  if (portal) {
    return createPortal(
      DOM,
      portal
    );
  }
  return DOM;
})

export default MapChoose