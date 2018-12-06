import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImgUploader from '../lib/ImgUploader';
import Bridge from '../lib/Bridge';

const watermarkInfo = {
  caption: '',
  customerName: '',
  submitName: '',
  time: '',
  address: '',
  distance: ''
};
let watermark = [];

export default class WxImgUpload extends Component {
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
    distanceLocation: '' // 计算比较的偏差位置
  } */
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    Bridge.debug = true;
    if (this.props.watermark && !Object.isEmptyObject(this.props.watermark)) {
      this.watermarkInit();
    }
  }
  onChooseSuccess = (list) => {
    if (this.props.onChange) this.props.onChange(this.props.list.concat(this.watermarkList(list)), this.props.args);
  }
  onUploadsSuccess = (list) => {
    if (this.props.onChange) this.props.onChange(list, this.props.args);
  }
  onUploadFail = (list) => {
    if (this.props.onChange) this.props.onChange(list, this.props.args);
  }
  onDeleteSuccess = (list) => {
    if (this.props.onChange) this.props.onChange(list, this.props.args);
  }
  /* --------------------
    微信水印处理
  ----------------------*/
  watermarkInit = () => {
    watermarkInfo.caption = this.props.watermark.caption;
    watermarkInfo.customerName = this.props.watermark.customerName;
    watermarkInfo.submitName = this.props.watermark.submitName;
    watermarkInfo.time = new Date().format('yyyy-MM-dd hh:mm');
    // 设置address与distance
    this.watermarkLocation(() => {
      if (watermarkInfo.caption) watermark.push(watermarkInfo.caption)
      if (watermarkInfo.customerName) watermark.push(watermarkInfo.customerName)
      if (watermarkInfo.submitName) {
        watermark.push(watermarkInfo.submitName + ' ' + watermarkInfo.time)
      } else {
        watermark.push(watermarkInfo.time)
      }
      if (watermarkInfo.address) watermark.push(watermarkInfo.address)
      if (watermarkInfo.distance) watermark.push(watermarkInfo.distance)
    });
  }
  watermarkLocation = (success) => {
    const {distanceLocation} = this.props.watermark;
    // loading
    Bridge.showLoading();
    // 获取位置
    Bridge.getLocation({
      onSuccess: (data) => {
        // 设置偏差
        if (distanceLocation) {
          let point = distanceLocation.split(',');
          var distance = Bridge.getDistance({
            point1: {
              longitude: point[1],
              latitude: point[0]
            },
            point2: {
              longitude: data.longitude,
              latitude: data.latitude
            },
            onError: (err) => {
              Bridge.showToast(err.msg, {mask: false});
            }
          });
          if (distance) distance = '偏差' + (distance * 1000) + '米';
          watermarkInfo.distance = distance;
        }
        // 客户端自带地址
        if (data.address) {
          Bridge.hideLoading();
          // 设置地址
          var address = data.address;
          watermarkInfo.address = address;
          if (success) success();
          return;
        }
        // 地址逆解析
        if (data.longitude && data.latitude) {
          Bridge.getAddress({
            latitude: data.latitude,
            longitude: data.longitude,
            type: 'gcj02',
            onSuccess: (addrs) => {
              Bridge.hideLoading();
              // 设置地址
              var address = addrs.address;
              watermarkInfo.address = address;
              if (success) success();
            },
            onError: () => {
              Bridge.hideLoading();
              Bridge.showToast('获取位置名称失败,请稍后重试', {mask: false});
              if (success) success();
            }
          });
        }
      },
      onError: (err) => {
        Bridge.hideLoading();
        if (success) success();
      }
    });
  }
  watermarkList = (list) => {
    if (this.props.watermark && !Object.isEmptyObject(this.props.watermark)) {
      return list.map((item) => {
        item.watermark = watermark;
        return item;
      })
    } else {
      return list
    }
  }
  render() {
    const {list, max, sourceType, sizeType} = this.props;
    return (
      <ImgUploader
        list={list}
        max={max}
        onChooseSuccess={this.onChooseSuccess}
        onUploadsSuccess={this.onUploadsSuccess}
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
      />
    );
  }
}
