import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bridge from './../Bridge';
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
    max: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    sourceType: PropTypes.array,
    sizeType: PropTypes.oneOfType([ // 压缩['original', 'compressed']
      PropTypes.array,
      PropTypes.string,
      PropTypes.number
    ]),

    showUpload: PropTypes.bool, // 显示上传按钮
    showDelete: PropTypes.bool, // 显示删除按钮
    readOnly: PropTypes.bool,

    showCount: PropTypes.bool, // 标题显示图片张字
    chooseOptions: PropTypes.object, // 选择照片参数
   
    onChange: PropTypes.func, // 照片发生变化
    onChooseSuccess: PropTypes.func, // 照片选择完成
    onUploadsSuccess: PropTypes.func, // 照片全部上传完成
    onUploadSuccess: PropTypes.func, // 照片上传完成
    onUploadFail: PropTypes.func, // 照片上传失败
    onDeleteSuccess: PropTypes.func // 照片删除完成
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
      instance: null
    }
  }
  componentDidMount = () => {
    // 初始化图片组件
    this.setState({
      instance: new Bridge.Image({
        onChooseSuccess: this.chooseSuccess,
        onUploadsSuccess: this.uploadsSuccess,
        onUploadSuccess: this.uploadSuccess,
        onUploadFail: this.uploadFail,
      })
    });
  }
  convertList = (imgMap) => {
    var list = [];
    if (Bridge.platform === 'waiqin') {
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
    } else if (Bridge.platform === 'dinghuo') {
      for (let img in imgMap) {
        list.push({
          id: img,
          src: 'LocalResource://imageid' + img,
          thumb: 'LocalResource://imageid' + img,
          sourceType: imgMap[img].sourceType
        });
      }
    } else if (Bridge.platform === 'weixin' || Bridge.platform === 'weixinwork') {
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
          name: img, // 外勤客户端用于上传到服务器dir+name拼接时使用
          src: img,
          thumb: img,
          sourceType: imgMap[img].sourceType,
          serverId: imgMap[img].serverId
        });
      }
    }
    return list;
  }
  onChange = (imgMap, op) => {
    var currentList = this.convertList(imgMap);
    // 过滤原有list中和现在list中相同的图片
    var prevList = this.props.list.filter((item) => {
      for (let current of currentList) {
        if (current.id === item.id) return false;
      }
      return true;
    })
    var list = currentList.concat(prevList);
    // Callback
    if (this.props.onChange) this.props.onChange(list, op);
  }
  chooseSuccess = (imgMap) => {
    this.onChange(imgMap, {op: 'chooseSuccess'});
    if (this.props.onChooseSuccess) this.props.onChooseSuccess(this.convertList(imgMap));
  }
  uploadsSuccess = (imgMap) => {
    this.onChange(imgMap, {op: 'uploadsSuccess'});
    if (this.props.onUploadsSuccess) this.props.onUploadsSuccess(this.convertList(imgMap));
  }
  uploadSuccess = (imgMap) => {
    this.onChange(imgMap, {op: 'uploadSuccess'});
    if (this.props.onUploadSuccess) this.props.onUploadSuccess(this.convertList(imgMap));
  }
  uploadFail = (imgMap, err) => {
    this.onChange(imgMap, Object.assign({op: 'uploadFail'}, err));
    if (this.props.onUploadFail) this.props.onUploadFail(this.convertList(imgMap), err);
  }
  chooseImg = () => {
    const {enableSafe, max, sourceType, sizeType, chooseOptions} = this.props;
    this.state.instance.choose({
      enableSafe: enableSafe, // 安全上传,第次只能传一张
      max: max,
      currentCount: this.props.list.length,
      sourceType: sourceType,
      sizeType: sizeType,
      chooseOptions: chooseOptions
    });
  }
  deleteImg = (item) => {
    const list = this.props.list.filter((photo) => {
      if (photo.id === item.id) return false
      return true
    });
    // Callback
    if (this.props.onChange) this.props.onChange(list, {op: 'deleteSuccess'});
    if (this.props.onDeleteSuccess) this.props.onDeleteSuccess(list);
  }
  render() {
    const {
      className, style,
      caption, captionStyle, captionClassName,
      list,
      enableSafe, max, sourceType, sizeType, showUpload, showDelete, readOnly, showCount, chooseOptions,
      onChange, onChooseSuccess, onUploadsSuccess, onDeleteSuccess,
      ...others
    } = this.props;
    
    return ([
    caption &&
      <div
        key="iuCaption"
        className={`grid-title${captionClassName ? ' ' + captionClassName : ''}`}
        style={captionStyle}>
        {caption}{showCount ? <span style={Count}>({list.length}/{max})</span> : null}
      </div>,
      <Grid
        key="iuGrid"
        onClickDelete={this.props.showDelete ? this.deleteImg : null}
        onClickAdd={this.chooseImg}
        list={list}
        showUpload={list.length < max && this.props.showUpload}
        showDelete={showDelete}
        className={`grid-album${className ? ' ' + className : ''}`}
        iconClassName="icon-full"
        wing={12}
        space={12}
        style={style}
        {...others}
      />
    ]);
  }
}
