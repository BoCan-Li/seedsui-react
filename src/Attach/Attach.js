import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Attach = forwardRef(({
  list, // [{id: '', name: '', src: ''}]
  upload, // 上传按钮覆盖的dom
  uploading, // 是否上传中
  onChoose, // 浏览器会显示file框onChoose(e), 并监听file框change事件
  onDelete,
  onClick,
  ...others
}, ref) =>  {
  function getIcon (src) {
    let suffix =  src.substring(src.lastIndexOf('.') + 1, src.length)
    if (!suffix) return 'unknown'
    if ('RM,RMVB,MP4,3GP,AVI,MKV,WMV,MPG,VOB,FLV'.indexOf(suffix.toUpperCase()) !== -1) {
      return 'video'
    }
    if ('WAVE,MPEG,MP3,MPEG-4,MIDI,WMA,VQF,AMR,APE,FLAC,AAC'.indexOf(suffix.toUpperCase()) !== -1) {
      return 'audio'
    }
    if ('JPG,JPEG,WEBP,GIF,PNG,TIF,BMP'.indexOf(suffix.toUpperCase()) !== -1) {
      return 'audio'
    }
    if ('RAR,ZIP'.indexOf(suffix.toUpperCase()) !== -1) {
      return 'pack'
    }
    if ('DOC,DOCX'.indexOf(suffix.toUpperCase()) !== -1) {
      return 'word'
    }
    if ('XSL,EXCEL'.indexOf(suffix.toUpperCase()) !== -1) {
      return 'excel'
    }
    if ('PPT'.indexOf(suffix.toUpperCase()) !== -1) {
      return 'ppt'
    }
    if ('PDF'.indexOf(suffix.toUpperCase()) !== -1) {
      return 'pdf'
    }
    return 'unknown'
  }
  return (<div
    ref={ref}
    {...others}
    className={`attach${others.className ? ' ' + others.className: ''}`}
    onClick={this.onClick}
  >
    {list && list.length > 0 && list.map((item, index) => {
      return <div
        key={index}
        data-index={index}
        className={`photos-item${item.className ? ' ' + item.className: ''}`}
        style={Object.assign({backgroundImage: `url(${item.thumb})`}, item.style || {})}
      >
        <i className={`attach-icon ${getIcon(item.src)}`}></i>
        <div className="photos-item-error"></div>
        <div className="photos-item-load"></div>
        {onDelete && <div className="photos-delete">
          <div className="photos-delete-icon"></div>
        </div>}
        {item.children}
      </div>
    })}
    {/* 图片上传: 上传按钮 */}
    {onChoose && <div className="photos-item photos-upload">
      <input type="file" name="uploadPic" onChange={this.onFile} accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"/>
      {upload && upload}
      {uploading && <div className="photos-upload-loading">
        <div className="photos-upload-loading-icon"></div>
      </div>}
    </div>}
  </div>);
}
