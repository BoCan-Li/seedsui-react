import React, {forwardRef, useRef, useImperativeHandle, useEffect, useContext, useState} from 'react';
import Instance from './instance.js';
import BridgeBrowser from './../Bridge/browser';
import Context from '../Context/instance.js';

let loaded = 0; // eslint-disable-line

const Vott = forwardRef(({
  src,
  data = [],
  params = {}, // 设置实例化参数
  // data = {
  //   polygon: [ // 逆时针
  //     [x2, y1], // 右上
  //     [x1, y1], // 左上
  //     [x1, y2], // 左下
  //     [x2, y2], // 右下
  //   ],
  //   style: '',
  //   className: '',
  //   id: '',
  //   ...
  // }
  // params = {
  //   shapeAttributes: '形状属性'
  // }
  readOnly = true, // 是否只读
  preview = true, // 是否支持单击预览, readOnly为true时才生效
  watermark,
  onChange, // func(e, value, selected)
  ...others
}, ref) =>  {
  const refEl = useRef(null)
  useImperativeHandle(ref, () => {
    return refEl.current
  });
  const instance = useRef(null)
  // context
  const context = useContext(Context) || {};
  const locale = context.locale || function (key) {return key || ''};
  useEffect(() => {
    if (instance.current) instance.current.updateParams(params);
  }, [params])

  useEffect(() => {
    if (instance.current) instance.current.setReadOnly(readOnly);
  }, [readOnly])

  useEffect(() => {
    if (instance.current) {
      instance.current.updateParams({src: src});
      loaded = 0
      instance.current.update();
    }
  }, [src])

  useEffect(() => {
    if (instance.current) {
      instance.current.updateParams({data: data});
      loaded = 0
      instance.current.update();
    }
  }, [data])

  useEffect(() => {
    instance.current = new Instance(refEl.current, {
      readOnly: readOnly,
      data: data,
      src: src,
      onSuccess: load,
      onChange: change,
      ...params
    });
  }, []) // eslint-disable-line

  // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
  if (instance.current) {
    instance.current.params.onChange = change;
  }

  function change (s, item, list) {
    if (refEl.current) s.target = refEl.current
    if (onChange) onChange(s, item, list)
  }
  function load () {
    loaded = 1
  }
  function click () {
    previewImage()
  }
  function previewImage () {
    if (!readOnly || !preview || !loaded) return
    // 克隆Wrapper
    var wrapper = instance.current.wrapper;

    var previewHTML = `<div class="preview-layer"> <div class="vott-wrapper">${wrapper.innerHTML}</div></div>`;
    BridgeBrowser.previewImage({urls: [src], layerHTML: previewHTML, success: (s) => {
      var layer = s.container.querySelector('.preview-layer');
      wrapper = s.container.querySelector('.vott-wrapper');
      var svg = wrapper.querySelector('.vott-svg');
      svg.style.backgroundImage = 'initial';
      // 计算宽高
      var width = svg.style.width.replace('px', '');
      var height = svg.style.height.replace('px', '');
      var scale = 1
      if (width > height) { // 宽图计算
        scale = layer.clientWidth / width;
      } else { // 长图计算
        scale = layer.clientHeight / height;
      }
      wrapper.style.WebkitTransform = `scale(${scale}) translate(-50%,-50%)`
      wrapper.style.WebkitTransformOrigin = `0 0`
    }});
  }

  return (
    <div ref={refEl} {...others} className={`vott-container${others.className ? ' ' + others.className : ''}`}>
      <div className="vott-wrapper" onClick={click}>
        <svg className="vott-svg" preserveAspectRatio="none"></svg>
        {watermark && <div className="vott-watermark" style={{backgroundImage: `url(${watermark})`}}></div>}
      </div>
      <div className={`vott-loading active`}>
        <div className={`vott-loading-icon`}></div>
      </div>
      <div className={`vott-error`}>
        <div className={`vott-error-icon`}></div>
        <div className={`vott-error-caption`}>{locale('hint_image_failed_to_load') || '图片加载失败'}</div>
      </div>
    </div>
  );
})

export default Vott
