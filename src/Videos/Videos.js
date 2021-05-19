import React, { forwardRef, useContext, useRef, Fragment, useState } from 'react'
import Bridge from './../Bridge'
import Photos from './../Photos'
import VideoFull from './../VideoFull'
// import Camera from './../Camera';
import Context from './../Context/instance.js'

const Videos = forwardRef(
  (
    {
      onClick,
      showPlay = false,
      // onChoose,
      preview = true, // 是否支持单击预览, readOnly为true时才生效
      onPreviewHide, // 关闭预览回调
      // 显隐路由
      routePath = 'componentPage=1',
      // 属性
      videoFullProps = {},
      ...others
    },
    ref
  ) => {
    // context
    const context = useContext(Context) || {}
    const locale =
      context.locale ||
      function (remark) {
        return remark || ''
      }

    const refVideoFull = useRef(null)
    // h5预览
    const [previewItem, setPreivewItem] = useState(null)
    // 点击预览
    function handleClick(e, src, options, index) {
      let item = options[0]
      if (onClick) {
        onClick(e, src, options, index)
      }
      if (!preview) return
      if (!item.src) {
        Bridge.showToast(locale('没有参数src', 'no_param_src'), { mask: false })
      }
      // 增加历史记录
      Bridge.addHistoryBack(() => {
        closePreview('history')
      }, `${routePath}`)
      // preview回调
      if (typeof preview === 'function') preview(e, src, options, index)
      // 客户端预览视频有问题, 所以使用h5预览
      setPreivewItem(item)
    }
    // 关闭h5预览, [closeType] history: 地址栏返回; 其它: 主动隐藏;
    function closePreview(closeType) {
      if (window.location.href.indexOf(routePath) !== -1) {
        window.history.go(-1)
      } else {
        setPreivewItem(null)
        if (onPreviewHide) onPreviewHide(closeType)
      }
    }
    /*
  // h5录相
  const [showRecord, setShowRecord] = useState(false);
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
  function record (e) {
    if (onChoose) {
      onChoose(e);
    }
  }
  */
    return (
      <Fragment>
        <Photos
          ref={ref}
          {...others}
          onClick={handleClick}
          // onChoose={choose}
          type="video"
          preview={false}
          children={
            showPlay ? ( // 视频播放图标
              <div className="photos-item-video">
                <div className="photos-item-video-icon"></div>
              </div>
            ) : null
          }
        />
        {/* h5预览 */}
        {previewItem && (
          <VideoFull
            ref={refVideoFull}
            portal={document.getElementById('root') || document.body}
            poster={previewItem.thumb}
            src={previewItem.src}
            autoPlay
            bar={<div className="videofull-close" onClick={closePreview}></div>}
            {...videoFullProps}
          />
        )}
        {/* 录相 */}
        {/* {showRecord && <Camera
      onHide={() => setShowRecord(false)}
      onRecord={record}
    />} */}
      </Fragment>
    )
  }
)

export default Videos
