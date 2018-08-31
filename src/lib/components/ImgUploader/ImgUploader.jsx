import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bridge from './../../bridge';
import Grid from './../Grid';

const Count = {
  fontSize: '12px',
  color: '#999',
  verticalAlign: '0',
  marginLeft: '4px'
};

export default class ImgUploader extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    caption: PropTypes.node,
    captionStyle: PropTypes.object,
    captionClassName: PropTypes.string,
    list: PropTypes.array,

    enableSafe: PropTypes.bool,
    max: PropTypes.number,
    sourceType: PropTypes.array,
    sizeType: PropTypes.array,

    showUpload: PropTypes.bool, // 显示上传按钮
    showDelete: PropTypes.bool, // 显示删除按钮
    readOnly: PropTypes.bool,

    showCount: PropTypes.bool, // 标题显示图片张字
    watermark: PropTypes.object, // 增加水印
   
    onChange: PropTypes.func // 照片发生变化
  }
  static defaultProps = {
    enableSafe: false, // 安全上传,第次只能传一张
    max: 5,
    sourceType: ['album', 'camera'],
    sizeType: ['compressed'], // ['original', 'compressed']
    list: [], // 格式[{id: '用于删除标识,订货和微信上传的值', src: '预览地址,外勤客户端上传的地址', thumb: '缩略图'}]
    showUpload: false,
    showDelete: false
  }
  constructor(props) {
    super(props);
    this.state = {
      instance: null,
      count: 0, // 剩余可上传数量
      showUpload: true
    }
  }
  componentDidMount = () => {
    // 初始化图片组件
    this.setState({
      instance: new bridge.Image({
        onChooseSuccess: this.onChooseSuccess,
        onUploadsSuccess: this.onUploadsSuccess,
        onUploadFail: this.onUploadFail,
      })
    });
  }
  convertList = (imgMap) => {
    var list = [];
    if (bridge.platform === 'waiqin') {
      for (let img in imgMap) {
        list.push({
          id: img, // 外勤客户端中,id就是name
          src: imgMap[img].src,
          thumb: imgMap[img].base64,
          sourceType: imgMap[img].sourceType,
          name: img,
          base64: imgMap[img].path
        });
      }
    } else if (bridge.platform === 'dinghuo') {
      for (let img in imgMap) {
        list.push({
          id: img,
          src: 'LocalResource://imageid' + img,
          thumb: 'LocalResource://imageid' + img,
          sourceType: imgMap[img].sourceType
        });
      }
    } else if (bridge.platform === 'weixin') {
      for (let img in imgMap) {
        list.push({
          id: img,
          src: img,
          thumb: img,
          sourceType: imgMap[img].sourceType,
          serverId: imgMap[img].serverId
        });
      }
    } else { // browser测试
      for (let img in imgMap) {
        list.push({
          id: img,
          src: img,
          thumb: img,
          sourceType: imgMap[img].sourceType,
          serverId: imgMap[img].serverId
        });
      }
    }
    return list;
  }
  onChange = (imgMap) => {
    var currentList = this.convertList(imgMap);
    // 过滤原有list中和现在list中相同的图片
    var prevList = this.props.list.filter((item) => {
      for (let current of currentList) {
        if (current.id === item.id) return false;
      }
      return true;
    })
    var list = currentList.concat(prevList);
    // 显示和隐藏添加按钮
    if (list.length >= this.props.max) {
      this.setState({
        showUpload: false
      });
    } else {
      this.setState({
        showUpload: true
      });
    }
    // 设置数量
    this.setState({
      count: list.length
    });
    // Callback
    if (this.props.onChange) this.props.onChange(list);
  }
  onChooseSuccess = (imgMap) => {
    this.onChange(imgMap);
  }
  onUploadFail = (index) => {
    // 删除上传错误的一项
    const list = Object.clone(this.props.list);
    list.splice(index, 1);
    // Callback
    if (this.props.onChange) this.props.onChange(list);
    // 上传失败,则重新鉴权
    bridge.config({
      onError: (res) => {
        bridge.showToast(res.msg, {mask: false});
      }
    });
  }
  onUploadsSuccess = (imgMap) => {
    this.onChange(imgMap);
  }
  chooseImg = () => {
    const {enableSafe, max, sourceType, sizeType, watermark} = this.props;
    this.state.instance.choose({
      enableSafe: enableSafe, // 安全上传,第次只能传一张
      max: max,
      currentCount: this.props.list.length,
      sourceType: sourceType,
      sizeType: sizeType,
      watermark: watermark
    });
  }
  deleteImg = (item) => {
    const list = this.props.list.filter((photo) => {
      if (photo.id === item.id) return false
      return true
    });
    this.setState({
      count: list.length
    })
    // Callback
    if (this.props.onChange) this.props.onChange(list);
  }
  render() {
    const {
      list,
      className, style,
      caption, captionClassName, captionStyle, max, showCount,
      showDelete
    } = this.props;
    return ([
    caption && <div key="iuCaption" className={`grid-title${captionClassName ? ' ' + captionClassName : ''}`} style={captionStyle}>{caption}{showCount ? <span style={Count}>({this.state.count}/{max})</span> : null}</div>,
      <Grid onClickDelete={this.props.showDelete ? this.deleteImg : null} onClickAdd={this.chooseImg} list={list} showUpload={this.state.showUpload && this.props.showUpload} showDelete={showDelete} key="iuGrid" className={`grid-album${className ? ' ' + className : ''}`} wing={12} space={12} style={style}/>
    ]);
  }
}
