import React, {forwardRef, useRef, Fragment, useState} from 'react';
import Bridge from './../Bridge';
import Photos from './../Photos';
import VideoFull from './../VideoFull';
import Camera from './../Camera';
import Context from './../Context/instance.js';

const Videos = forwardRef(({
  onClick,
  onChoose,
  preview = true, // 是否支持单击预览, readOnly为true时才生效
  ...others
}, ref) =>  {
  // context
  const context = useContext(Context) || {};
  const locale = context.locale || {};
  
  const refVideoFull = useRef(null);
  // h5预览
  const [previewItem, setPreivewItem] = useState(null);
  // h5录相
  const [showRecord, setShowRecord] = useState(false);
  // 点击预览
  function click (e, item, index) {
    if (onClick) {
      onClick(e, item, index);
    }
    if (!preview) return;
    if (!item.src) {
      Bridge.showToast(locale['no_param_src'] || '没有参数src', {mask: false})
    }
    // 客户端预览视频有问题, 所以使用h5预览
    setPreivewItem(item);
  }
  // 关闭h5预览
  function closePreview () {
    setPreivewItem(null);
  }
  // 录制视频
  function choose (e) {
    if (Bridge.platform !== 'wq') {
      setShowRecord(true);
      return;
    }
    if (onChoose) {
      onChoose(e);
    }
  }
  // h5录相
  function record (e, file) {
    const event = {
      target: file,
      targetType: 'video',
      type: 'video/mp4'
    }
    if (onChoose) {
      onChoose(event);
    }
  }
  return <Fragment>
    <Photos
      ref={ref}
      {...others}
      onClick={click}
      onChoose={choose}
      type="video"
      preview={false}
    />
    {/* h5预览 */}
    {previewItem && <VideoFull
      ref={refVideoFull}
      portal={document.getElementById('root') || document.body}
      poster={previewItem.thumb}
      src={previewItem.src}
      autoPlay
      bar={
        <div className="videofull-close" onClick={closePreview}></div>
      }
    />}
    {/* 录相 */}
    {showRecord && <Camera
      onHide={() => setShowRecord(false)}
      onRecord={record}
    />}
  </Fragment>;
})

export default Videos
