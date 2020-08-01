import React, {useRef, useContext, useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import MapUtil from './../MapUtil';
import Page from './../Page';
import Header from './../Header';
import Container from './../Container';
import Notice from './../Notice';
import Bridge from './../Bridge';
import Wrapper from './Wrapper';
import Close from './Close';
import helper from './helper';
import Context from './../Context/instance.js';

function MapView ({
  ak, // 百度地图key
  show = true, // 百度地图不能移除DOM, 再渲染
  portal,
  caption,
  onHide,
  // 其它属性
  center = '江苏省,南京市',
  // 标记点
  points, // [[118.798128, 31.968592], [118.619429,32.113449]] => 南京南站, 老山
  // 圆形
  circle, // {point: [118.798128, 31.968592], radius: 1000} => 南京南站
  // 多边形
  polygon, // [[lng, lat], [lng, lat]]
  // 地区
  district, // {province: {id: "320000", name: "江苏"}, city: {id: "320100", name: "南京市"}, district: {id: "320105", name: "建邺区"}}
  // 子元素
  header,
  children
}) {
  // context
  const context = useContext(Context) || {};
  const locale = context.locale || function (key) {return key || ''};

  const refWrapperEl = useRef(null);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (!ak) {
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

    helper.initMap(refWrapperEl.current, center, (result) => {
      if (typeof result === 'string') {
        setErrMsg(result);
        return;
      }
    });
  }

  // 绘制标记点
  useEffect(() => {
    if (points && points.length && show) {
      console.log('绘制标记')
      helper.drawMarkers(points)
    }
  }, [points]) // eslint-disable-line

  // 绘制圆形
  useEffect(() => {
    if (circle && circle.point && show) {
      console.log('绘制圆形')
      helper.drawCircle(circle.point, circle.radius)
    }
  }, [circle]) // eslint-disable-line

  // 绘制多边形
  useEffect(() => {
    if (polygon && show) {
      console.log('绘制多边形')
      helper.drawPolygon(polygon)
    }
  }, [polygon]) // eslint-disable-line

  // 绘制地区
  useEffect(() => {
    if (district && show) {
      console.log('绘制区域')
      let districtName = [];
      for (let name in district) {
        districtName.push(district[name].name);
      }
      helper.drawDistrict(districtName.join(','))
    }
  }, [district]) // eslint-disable-line

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

  const DOM = <Page className={show ? '' : 'hide'}>
    {header && <Header>{header}</Header>}
    <Container>
      <Wrapper ref={refWrapperEl}/>
      {onHide && <Close onClick={onHide}/>}
      {children}
    </Container>
    {errMsg && <Notice caption={errMsg}/>}
  </Page>;
  if (portal) {
    return createPortal(
      DOM,
      portal
    );
  }
  return DOM;
}
export default MapView