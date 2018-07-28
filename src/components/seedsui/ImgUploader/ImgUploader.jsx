import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bridge from './../utils/bridge';
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

    max: PropTypes.number,
    sourceType: PropTypes.array,
    sizeType: PropTypes.array,

    showUpload: PropTypes.bool, // 显示上传按钮
    showDelete: PropTypes.bool, // 显示删除按钮
    preview: PropTypes.bool,
    readOnly: PropTypes.bool,

    showCount: PropTypes.bool, // 标题显示图片张字
    watermark: PropTypes.object, // 增加水印,参数:{time:'yyyy-MM-dd hh:mm:ss'}
   
    onError: PropTypes.func, // 错误回调
    onChange: PropTypes.func // 照片发生变化
  }
  static defaultProps = {
    valueBindProp: false,
    max: 5,
    sourceType: ['album', 'camera'],
    sizeType: ['compressed'], // ['original', 'compressed']
    list: [],
    // 格式[{id: '用于删除标识', src: '', thumb: ''}]
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
      showUpload: props.showUpload
    }
  }
  componentDidMount = () => {
    // 初始化图片组件
    this.setState({
      instance: new bridge.Image({
        watermark: this.props.watermark,
        max: this.props.max,
        sourceType: this.props.sourceType,
        sizeType: this.props.sizeType,
        onShowLoad: this.props.onShowLoad, // 显示遮罩
        onHideLoad: this.props.onHideLoad, // 隐藏遮罩
        onError: (err) => { // 错误回调
          if (this.props.onError) {
            this.props.onError(err)
          } else {
            // 提示错误
            bridge.showToast(err.msg);
          }
        },
        onChooseSuccess: this.onChooseSuccess,
        onChooseFail: this.onChooseFail,
        onUploadsSuccess: this.onUploadsSuccess
      })
    });
  }
  convertList = (imgMap) => {
    var list = [];
    if (bridge.platform === 'waiqin') {
      for (let img in imgMap) {
        list.push({
          id: img,
          src: imgMap[img].src,
          thumb: imgMap[img].base64
        });
      }
    } else if (bridge.platform === 'dinghuo') {
      for (let img in imgMap) {
        list.push({
          id: img,
          src: 'LocalResource://imageid' + img,
          thumb: 'LocalResource://imageid' + img
        });
      }
    } else if (bridge.platform === 'weixin') {
      for (let img in imgMap) {
        list.push({
          id: img,
          src: img,
          thumb: img
        });
      }
    }
    return list;
  }
  onChange = (imgMap) => {
    var list = this.convertList(imgMap).concat(this.props.list);
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
    if (this.props.onChange) this.props.onChange(list);
  }
  onChooseSuccess = (imgMap) => {
    this.onChange(imgMap);
  }
  onChooseFail = (imgMap) => {
    this.onChange(imgMap);
  }
  onUploadsSuccess = (imgMap) => {
    this.onChange(imgMap);
  }
  chooseImg = () => {
    if (this.props.readOnly) return;
    this.state.instance.choose(this.props.list.length, this.props.watermark);
  }
  deleteImg = (item) => {
    const list = [];
    this.props.list.forEach((photo) => {
      if (photo.id !== item.id) {
        list.push(photo)
      }
    });
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
      <Grid onClickDelete={this.props.showDelete ? this.deleteImg : null} onClickAdd={this.chooseImg} list={list} showUpload={this.state.showUpload} showDelete={showDelete} key="iuGrid" className={`grid-album${className ? ' ' + className : ''}`} wing={12} space={12} style={style}/>
    ]);
  }
}
