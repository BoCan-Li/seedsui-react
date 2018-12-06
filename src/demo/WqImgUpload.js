import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImgUploader from '../lib/ImgUploader';

export default class WqImgUpload extends Component {
  static propTypes = {
    args: PropTypes.any,
    list: PropTypes.array,
    sourceType: PropTypes.array,
    sizeType: PropTypes.oneOfType([ // 压缩['original', 'compressed']
      PropTypes.array,
      PropTypes.string,
      PropTypes.number
    ]),
    max: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    onChange: PropTypes.func,
    watermark: PropTypes.object
  };
  static defaultProps = {
    list: [],
    max: 5
  }
  /* watermark = {
    caption: '', // 标题
    customerName: '', // 客户名称
    submitName: '', // 签收评价提交人
    distanceLocation: '' // 门店经纬度
    aiCheck: ''
  } */
  constructor(props) {
    super(props);
  }
  onChooseSuccess = (list) => {
    if (this.props.onChange) this.props.onChange(this.props.list.concat(list), this.props.args);
  }
  onDeleteSuccess = (list) => {
    if (this.props.onChange) this.props.onChange(list, this.props.args);
  }
  render() {
    const {list, max, sourceType, sizeType, watermark} = this.props;
    // 设置水印
    const wqWatermark = watermark ? {
      photoType: watermark.caption || '',
      customerName: watermark.customerName || '',
      cmLocation: watermark.distanceLocation || '',
      submitName: watermark.submitName || '',
      isAiPicCheck: watermark.isAiPicCheck || ''
    } : null;
    return (
      <ImgUploader
        list={list}
        max={max}
        chooseOptions={wqWatermark}
        onChooseSuccess={this.onChooseSuccess}
        onDeleteSuccess={this.onDeleteSuccess}
        caption="现场拍照"
        showUpload
        showDelete
        showCount
        className="between border-b"
        style={{margin: '0 12px 0 16px'}}
        captionStyle={{margin: '10px 12px 0 16px'}}
        sourceType={sourceType}
        sizeType={sizeType}
        iconBase="icon"
      />
    );
  }
}
/* 用法
  // 外勤图片处理
  getWqPicPath = (picList) => { // 设置pic_path提交服务器路径
    const {detail} = this.props;
    var paths = picList.map(item => {
      // 编辑页面: 已有照片,只需要返回name就可以了
      if (item.upload) return item.name
      // 新增的照片则需要自己拼
      return detail.upload_dir + '/' + item.name
    });
    return paths.join(',');
  }
  onWqPhotoChange = (photo, item) => {
    console.log(photo, item);
    this.onChange(photo, item);
  }
  uploadWqPhoto = () => {
    const {detail, fields} = this.props;
    // 所有图片
    let picList = [];
    fields.forEach((item) => {
      if (item.type === 'pic' && !item.upload && item.currentValue && item.currentValue.length > 0) {
        picList = picList.concat(item.currentValue);
      }
    });
    // 所有localIds
    var localIds = [];
    localIds = picList.map(item => {
      return item.src
    });
    // 离线上传
    if (localIds.length > 0) {
      Bridge.uploadImage({
        dir: detail.upload_dir,
        localIds
      });
    }
  }
  <WqImgUpload key={`pic${index}`} args={item} list={item.currentValue} max={item.max_num} sizeType={item.photowd} sourceType={item.is_realtime === '1' ? ['camera'] : ['album', 'camera']} onChange={this.onWqPhotoChange} watermark={{caption: '促销执行', customerName: detail.cm_name, aiCheck: item['allow-copy-check']}}/>
*/