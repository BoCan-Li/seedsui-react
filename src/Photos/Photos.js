import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Photos extends Component {
  static propTypes = {
    list: PropTypes.array, // [{thumb: '', src: ''}]
    uploading: PropTypes.bool, // 是否上传中
    onChoose: PropTypes.func,
    onFile: PropTypes.func, // 显示file框, 并监听file框change事件
    onDelete: PropTypes.func,
    onClick: PropTypes.func
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  // 点击整个photos容器
  onClick = (e) => {
    const {list, onChoose, onDelete, onClick} = this.props;
    const target = e.target;
    if (target.classList.contains('photos-item')) { // 点击照片
      const index = target.getAttribute('data-index');
      if (index && onClick) onClick(e, list[index], Number(index));
    } else if (target.classList.contains('photos-delete')) { // 点击删除
      const index = target.parentNode.getAttribute('data-index');
      if (index && onDelete) onDelete(e, list[index], Number(index));
    } else if (target.classList.contains('photos-upload')) { // 点击添加
      if (onChoose) onChoose(e);
    }
  }
  // 点击file框
  onFile = (e) => {
    if (this.props.onFile) this.props.onFile(e);
    e.target.value = ''; // 防止选择重复图片时不触发
  }
  // 图片加载完成
  onLoad = (e) => {
    var target = e.target;
    target.parentNode.setAttribute('data-complete', '1');
  }
  // 图片加载失败
  onError = (e) => {
    var target = e.target;
    target.parentNode.setAttribute('data-complete', '0');
  }
  render() {
    const {
      list = [],
      uploading,
      onChoose,
      onFile,
      onDelete,
      onClick,
      ...others
    } = this.props;
    return (<div
      ref={el => {this.$el = el;}}
      {...others}
      className={`photos${others.className ? ' ' + others.className: ''}`}
      onClick={this.onClick}
    >
      {list.map((item, index) => {
        return <div
          key={index}
          data-index={index}
          className={`photos-item${item.className ? ' ' + item.className: ''}`}
          style={Object.assign({backgroundImage: `url(${item.thumb})`}, item.style || {})}
        >
          <img className="photos-item-img" src={item.thumb} alt="" onLoad={this.onLoad} onError={this.onError}/>
          <div className="photos-item-error"></div>
          <div className="photos-item-load"></div>
          {onDelete && <div className="photos-delete">
            <div className="photos-delete-icon"></div>
          </div>}
        </div>
      })}
      {/* 图片上传: 上传按钮 */}
      {(onChoose || onFile) && <div className="photos-item photos-upload">
        {onFile && <input type="file" name="uploadPic" onChange={this.onFile} accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"/>}
        {uploading && <div className="photos-upload-loading">
          <div className="photos-upload-loading-icon"></div>
        </div>}
      </div>}
    </div>);
  }
}
