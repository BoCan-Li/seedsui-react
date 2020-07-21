import React, {forwardRef, useState} from 'react';
import Preview from './../Preview';

const Photos = forwardRef(({
  type,
  list, // [{id: '', name: '', thumb: '', src: ''}]
  upload, // 上传按钮覆盖的dom
  uploading, // 是否上传中
  onChoose, // 浏览器会显示file框onChoose(e), 并监听file框change事件
  onDelete,
  onClick,
  preview = true, // 是否支持单击预览, readOnly为true时才生效
  ...others
}, ref) =>  {
  const [previewCurrent, setPreviewCurrent] = useState(null);
  // 点击整个photos容器
  function click (event) {
    const e = event.nativeEvent;
    const target = e.target;
    e.targetType = type;
    if (target.type === 'file') {
      target.value = ''; // 防止选择重复图片时不触发
    }
    if (target.classList.contains('photos-upload')) { // 点击添加
      if (onChoose) onChoose(e);
    } else if (target.classList.contains('photos-item')) { // 点击照片
      const index = target.getAttribute('data-index');
      if (index && onClick) onClick(e, list[index], Number(index));
      // 预览
      if (preview) {
        setPreviewCurrent(Number(index));
      }
    } else if (target.classList.contains('photos-delete')) { // 点击删除
      const index = target.parentNode.getAttribute('data-index');
      if (index && onDelete) onDelete(e, list[index], Number(index));
    }
  }
  // file框选择
  function fileChange (event) {
    const e = event.nativeEvent;
    if (onChoose) onChoose(e);
    e.stopPropagation();
  }
  // 图片加载完成
  function load (e) {
    var target = e.target;
    target.parentNode.setAttribute('data-complete', '1');
  }
  // 图片加载失败
  function error (e) {
    var target = e.target;
    target.parentNode.setAttribute('data-complete', '0');
  }

  return (<div
    ref={ref}
    {...others}
    className={`photos${others.className ? ' ' + others.className: ''}`}
    onClick={click}
  >
    {list && list.length > 0 && list.map((item, index) => {
      return <div
        key={index}
        data-index={index}
        className={`photos-item${item.className ? ' ' + item.className: ''}`}
        style={Object.assign({backgroundImage: `url(${item.thumb})`}, item.style || {})}
      >
        <img className="photos-item-img" src={item.thumb} alt="" onLoad={load} onError={error}/>
        <div className="photos-item-error"></div>
        <div className="photos-item-load"></div>
        {type === 'video' && <div className="photos-item-video">
          <div className="photos-item-video-icon"></div>
        </div>}
        {onDelete && <div className="photos-delete">
          <div className="photos-delete-icon"></div>
        </div>}
        {item.children}
      </div>
    })}
    {/* 图片上传: 上传按钮 */}
    {onChoose && <div className="photos-item photos-upload">
      {/* 拍照或者视频图标 */}
      <div className={`photos-upload-icon${type === 'video' ? ' video' : ''}`}></div>
      {/* 拍照 */}
      {/* PC端使用file框 */}
      {type !== 'video' && !navigator.userAgent.toLowerCase().match(/applewebkit.*mobile.*/) && <input type="file" name="uploadPic" onChange={fileChange} accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"/>}
      {upload && upload}
      {type !== 'video' && uploading && <div className="photos-upload-loading">
        <div className="photos-upload-loading-icon"></div>
      </div>}
      {/* 视频 */}
      {type === 'video' && uploading && <div className="photos-upload-loading">
        <div className="photos-upload-loading-icon"></div>
      </div>}
    </div>}
    {/* 预览 */}
    {typeof previewCurrent === 'number' &&
      <Preview
        onHide={() => setPreviewCurrent(null)}
        list={list} // 需要预览的资源列表{url: '图片或视频的地址', type: 'video|image, 默认image', poster: '封面地址'}
        current={previewCurrent}
      />
    }
  </div>);
})

export default Photos
