import React, {forwardRef, useRef, useImperativeHandle, useEffect, useContext, useState} from 'react';
import Instance from './instance.js';
import BridgeBrowser from './../Bridge/browser';
import Context from '../Context/instance.js';

let loaded = 0;

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
  const locale = context.locale || {};
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
  }, [])

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
    var svg = instance.current.svg;
    var previewHTML = `<div class="preview-layer">${svg.outerHTML}</div>`;
    BridgeBrowser.previewImage({urls: [src], layerHTML: previewHTML, success: (s) => {
      var layer = s.container.querySelector('.preview-layer');
      svg = s.container.querySelector('.vott-svg');
      svg.style.backgroundImage = 'initial';
      var width = svg.style.width.replace('px', '');
      var height = svg.style.height.replace('px', '');
      // 计算宽高
      var scale = 1
      if (width > height) { // 宽图计算
        scale = layer.clientWidth / width;
      } else { // 长图计算
        scale = layer.clientHeight / height;
      }
      svg.style.WebkitTransform = `scale(${scale}) translate(-50%,-50%)`
      svg.style.WebkitTransformOrigin = `0 0`
    }});
  }

  return (
    <div className="vott-container" {...others} ref={refEl}>
      <svg className="vott-svg" preserveAspectRatio="none" onClick={click}></svg>
      <div className={`vott-loading active`}>
        <div className={`vott-loading-icon`}></div>
      </div>
      <div className={`vott-error`}>
        <div className={`vott-error-icon`}></div>
        <div className={`vott-error-caption`}>{locale['hint_image_failed_to_load'] || '图片加载失败'}</div>
      </div>
    </div>
  );
})

export default Vott
