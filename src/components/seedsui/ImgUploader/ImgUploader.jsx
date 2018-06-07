import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bridge from './../utils/bridge';
import Grid from './../Grid/Grid.jsx';

const Count = {
  fontSize: '12px',
  color: '#999',
  verticalAlign: '0',
  marginLeft: '4px'
};

export default class ImgUploader extends Component {
  static propTypes = {
    valueBindProp: PropTypes.bool, // 值是否绑定属性
    className: PropTypes.string,
    style: PropTypes.object,
    caption: PropTypes.node,
    captionStyle: PropTypes.object,
    captionClassName: PropTypes.string,
    list: PropTypes.array, // 格式[{src: xxx, thumb: xxx}]

    max: PropTypes.number,
    sourceType: PropTypes.array,
    sizeType: PropTypes.array,

    showUpload: PropTypes.bool, // 显示上传按钮
    showDelete: PropTypes.bool, // 显示删除按钮
    preview: PropTypes.bool,
    readOnly: PropTypes.bool,

    showCount: PropTypes.bool,
    watermark: PropTypes.object, // 增加水印,参数:{time:'yyyy-MM-dd hh:mm:ss'}
   
    onShowLoad: PropTypes.func, // 显示遮罩
    onHideLoad: PropTypes.func, // 隐藏遮罩
    onError: PropTypes.func, // 错误回调
    onChooseSuccess: PropTypes.func, // 选择成功
    onChooseFail: PropTypes.func, // 选择失败
    onUploadsSuccess: PropTypes.func, // 上传成功
    onDeleteSuccess: PropTypes.func, // 删除成功
    onChange: PropTypes.func,
  }
  static defaultProps = {
    valueBindProp: false,
    max: 5,
    sourceType: ['album', 'camera'],
    sizeType: ['compressed'], // ['original', 'compressed']
    list: [], // 格式[{id: '', src: '', thumb: ''}]
    showUpload: false,
    showDelete: false,
    preview: true,
    readOnly: false,
    watermark: {
      time: null // 时间水印信息,格式'yyyy-MM-dd hh:mm:ss'
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      instance: null,
      count: 0, // 剩余可上传数量
      list: props.list,
      showUpload: props.showUpload
    }
  }
  componentDidMount = () => {
    // 获得图片地址
    var imgs = [];
    if (this.props.list) {
      this.props.list.forEach((item) => {
        imgs.push(item.src)
      });
    }
    // 初始化图片组件
    this.setState({
      instance: new bridge.Image({
        imgs: imgs,
        watermark: this.props.watermark,
        max: this.props.max,
        sourceType: this.props.sourceType,
        sizeType: this.props.sizeType,
        onShowLoad: this.props.onShowLoad, // 显示遮罩
        onHideLoad: this.props.onHideLoad, // 隐藏遮罩
        onError: this.props.onError, // 错误回调
        onChooseSuccess: this.onChooseSuccess,
        onChooseFail: this.onChooseFail,
        onUploadsSuccess: this.onUploadsSuccess,
        onDeleteSuccess: this.onDeleteSuccess
      })
    });
  }
  convertList = (imgs, imgMap) => {
    if (bridge.platform === 'waiqin') {
      console.log(1)
      var arrImgs = [];
      for (let img in imgMap) {
        arrImgs.push({
          id: img,
          src: imgMap[img].src,
          thumb: imgMap[img].base64
        });
      }
      return arrImgs;
    }
    console.log(2)
    return imgs.map((item) => {
      if (bridge.platform === 'dinghuo') {
        return {
          id: item,
          src: 'LocalResource://imageid' + item,
          thumb: 'LocalResource://imageid' + item
        }
      }
      return {
        id: item,
        src: item,
        thumb: item
      }
    });
  }
  onChange = (argImgs, argImgMap) => {
    var list = this.convertList(argImgs, argImgMap);
    console.log(list)
    this.setState({
      list
    });
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
    if (this.props.onChange) this.props.onChange(argImgs, argImgMap);
  }
  onChooseSuccess = (imgs, imgMap) => {
    this.onChange(imgs, imgMap);
    // Callback
    if (this.props.onChooseSuccess) this.props.onChooseSuccess(imgs, imgMap);
  }
  onChooseFail = (imgs, imgMap) => {
    this.onChange(imgs, imgMap);
    // Callback
    if (this.props.onChooseFail) this.props.onChooseFail(imgs, imgMap);
  }
  onUploadsSuccess = (imgs, imgMap) => {
    this.onChange(imgs, imgMap);
    // Callback
    if (this.props.onUploadsSuccess) this.props.onUploadsSuccess(imgs, imgMap);
  }
  onDeleteSuccess = (imgs, imgMap) => {
    this.onChange(imgs, imgMap);
    // Callback
    if (this.props.onDeleteSuccess) this.props.onDeleteSuccess(imgs, imgMap);
  }
  chooseImg = () => {
    if (this.props.readOnly) return;
    // 根据watermark.location判断拍照前是否先定位, 再选照片
    this.state.instance.choose();
  }
  deleteImg = (item) => {
    this.state.instance.deleteImg(item.id);
  }
  preview = (item, index) => {
    if (this.props.preview) this.state.instance.preview(index);
  }
  render() {
    const {
      valueBindProp,
      className, style,
      caption, captionClassName, captionStyle, max, showCount,
      showDelete
    } = this.props;
    let list = [];
    if (valueBindProp) list = this.props.list;
    else list = this.state.list;
    return ([
    caption && <div key="iuCaption" className={`grid-title${captionClassName ? ' ' + captionClassName : ''}`} style={captionStyle}>{caption}{showCount ? <span style={Count}>({this.state.count}/{max})</span> : null}</div>,
      <Grid onClickDelete={this.props.showDelete ? this.deleteImg : null} onClickAdd={this.chooseImg} onClickCell={this.preview} list={list} showUpload={this.state.showUpload} showDelete={showDelete} key="iuGrid" className={`grid-album${className ? ' ' + className : ''}`} wing={12} space={12} style={style}/>
    ]);
  }
}
