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
    customerLocation: '' // 门店经纬度
    submitName: '', // 签收评价提交人
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
      cmLocation: watermark.customerLocation || '',
      submitName: watermark.submitName || '',
      isAiPicCheck: watermark.isAiPicCheck || ''
    } : null;
    return (
      <ImgUploader
        list={list}
        max={max}
        watermark={wqWatermark}
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
