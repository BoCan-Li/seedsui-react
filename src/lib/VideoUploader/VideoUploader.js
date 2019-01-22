import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    sizeType: PropTypes.oneOfType([ // 压缩['original', 'compressed']
      PropTypes.array,
      PropTypes.string,
      PropTypes.number
    ]),

    showUpload: PropTypes.bool, // 显示上传按钮
    showDelete: PropTypes.bool, // 显示删除按钮
    readOnly: PropTypes.bool,

    showCount: PropTypes.bool, // 标题显示图片张字
   
    onChange: PropTypes.func // 照片发生变化
  }
  static defaultProps = {
    enableSafe: false, // 安全上传,第次只能传一张
    max: 5,
    sourceType: ['album', 'camera'],
    sizeType: ['compressed'], // ['original', 'compressed']
    list: [], // 格式[{id: '用于删除标识,订货和微信上传的值', src: '预览地址,外勤客户端上传的地址', base64: '', type: 'video'}]
    showUpload: false,
    showDelete: false
  }
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
  }
  render() {
    const {
      list,
      className, style,
      caption, captionClassName, captionStyle, max, showCount,
      showDelete
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
        type="video"
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
      />
    ]);
  }
}
