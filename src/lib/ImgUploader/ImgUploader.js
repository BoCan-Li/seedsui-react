// require PrototypeObject.js
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
    captionAfter: PropTypes.node,
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
   
    onDeleteSuccess: PropTypes.func, // 照片删除完成
    onChange: PropTypes.func, // 照片发生变化
    onChooseBefore: PropTypes.func, // 选择照片之前校验, 返回true则继续, 返回false则停止
    onChooseSuccess: PropTypes.func, // 照片选择完成
    // 以下回调,只有微信有
    onChooseFail: PropTypes.func, // 照片选择错误
    onUploadsSuccess: PropTypes.func, // 照片全部上传完成
    onUploadSuccess: PropTypes.func, // 照片上传完成
    onUploadFail: PropTypes.func // 照片上传失败
    
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
  }
  componentDidMount = () => {
    // 初始化图片组件
    this.instance = new Bridge.Image({
      onChooseSuccess: this.chooseSuccess,
      // 以下回调,只有微信有
      onChooseFail: this.props.onChooseFail,
      onUploadsSuccess: this.uploadsSuccess,
      onUploadSuccess: this.uploadSuccess,
      onUploadFail: this.uploadFail,
    });
  }
  // 转换成照片格式
  convertList = (imgMap) => {
    var list = [];
    if (Bridge.platform === 'waiqin') {
      for (let img in imgMap) {
        list.push({
          id: img, // 外勤客户端中,id就是name
          name: img, // 外勤客户端用于上传到服务器dir+name拼接时使用
          src: imgMap[img].src,
          thumb: imgMap[img].base64,
          sourceType: imgMap[img].sourceType,
          base64: imgMap[img].path
        });
      }
    } else if (Bridge.platform === 'dinghuo') {
      for (let img in imgMap) {
        list.push({
          id: img,
          name: img,
          src: 'LocalResource://imageid' + img,
          thumb: 'LocalResource://imageid' + img,
          sourceType: imgMap[img].sourceType
        });
      }
    } else if (Bridge.platform === 'weixin' || Bridge.platform === 'weixinwork') {
      for (let img in imgMap) {
        list.push({
          id: img,
          name: img,
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
          name: img,
          src: img,
          thumb: img,
          sourceType: imgMap[img].sourceType,
          serverId: imgMap[img].serverId
        });
      }
    }
    return list;
  }
  // 微信: 过滤上传失败的图片
  filterUploadFail = (imgMap) => {
    // 为已选列表加入serverId
    let list = this.props.list.map((item) => {
      if (imgMap[item.id] && !item.serverId) {
        item.serverId = imgMap[item.id].serverId;
      }
      return item;
    });
    // 过滤上传失败的图片
    let failIndexs = [];
    list = list.filter((item, index) => {
      if (item.serverId) return true;
      failIndexs.push(index + 1);
      return false;
    });
    if (failIndexs && failIndexs.length) {
      Bridge.showToast('您选择的第' + failIndexs.join(',') + '张图片上传失败, 请重新拍照上传', {mask: false});
    }
    return list;
  }
  // 图片选择完成
  chooseSuccess = (imgMap, res) => {
    // 拼接所有图片
    const list = this.props.list.concat(this.convertList(imgMap));
    if (this.props.onChooseSuccess) this.props.onChooseSuccess(list, res);
    if (this.props.onChange) this.props.onChange(list, res);
  }
  // 微信: 图片全部上传成功
  uploadsSuccess = (imgMap) => {
    // 过滤掉上传失败的图片
    let list = this.filterUploadFail(imgMap);
    // Callback
    if (this.props.onUploadsSuccess) this.props.onUploadsSuccess(list);
    if (this.props.onChange) this.props.onChange(list);
  }
  // 微信: 单个图片上传成功
  uploadSuccess = (imgMap, res) => {
    if (this.props.onUploadSuccess) {
      // 过滤掉上传失败的图片
      let list = this.filterUploadFail(imgMap);
      this.props.onUploadSuccess(list, res);
    }
  }
  // 微信: 单个图片上传失败, 这里并没有删除上传失败的图片, 是因为全部上传完成后会走onUploadsSuccess, 由uploadsSuccess统一删除
  uploadFail = (imgMap, res) => { // imgMap, {id, index, item, errMsg}
    if (this.props.onUploadFail) {
      // 过滤掉上传失败的图片
      let list = this.filterUploadFail(imgMap);
      this.props.onUploadFail(list, res);
    }
  }
  // 选择照片
  chooseImg = async () => {
    // 选择前校验
    if (this.props.onChooseBefore) {
      let allowChoose = await this.props.onChooseBefore();
      if (!allowChoose) return;
    }
    const {list, enableSafe, max, sourceType, sizeType, chooseOptions, chooseRepeat} = this.props;
    // 是否允许选择重复照片
    let localIds = [];
    if (!chooseRepeat) {
      localIds = list.map((item) => {
        return item.id;
      });
    }
    this.instance.choose({
      enableSafe: enableSafe, // 安全上传,第次只能传一张
      max: max,
      currentCount: this.props.list.length,
      sourceType: sourceType,
      sizeType: sizeType,
      localIds: localIds, // 已选照片, 只有微信生效
      chooseOptions: chooseOptions
    });
  }
  // 删除照片
  deleteImg = (item) => {
    const list = this.props.list.filter((photo) => {
      if (photo.id === item.id) return false
      return true
    });
    // Callback
    if (this.props.onChange) this.props.onChange(list);
    if (this.props.onDeleteSuccess) this.props.onDeleteSuccess(list);
  }
  render() {
    const {
      className, style,
      caption, captionStyle, captionClassName, captionAfter,
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
        {caption}
        {showCount ? <span style={Count}>({list.length}/{max})</span> : null}
        {captionAfter}
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
