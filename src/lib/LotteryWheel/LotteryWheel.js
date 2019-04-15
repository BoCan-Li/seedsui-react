import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';

export default class LotteryWheel extends Component {
  static propTypes = {
    // 数据源
    data: PropTypes.array, // [{text: '', icon: '', font: '', fontTop...同数据默认值}]
    // 数据默认值
    fontFamily: PropTypes.string,
    fontSize: PropTypes.number,
    fontTop: PropTypes.number,
    fontFillStyle: PropTypes.string,

    bgFillStyle: PropTypes.string,
    bgStrokeStyle: PropTypes.string,
    bgLineWidth: PropTypes.number,

    iconWidth: PropTypes.number,
    iconHeight: PropTypes.number,
    iconTop: PropTypes.number,
    // 不能使用style制定宽高,canvas用style的width|height会导致绘图位置不正确
    width: PropTypes.number, // 宽度
    height: PropTypes.number, // 高度
    style: PropTypes.object,
    className: PropTypes.string,
    // 间隔
    spacing: PropTypes.number,
    // 保存
    suffix: PropTypes.string,
    quality: PropTypes.number,
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  componentDidUpdate (prevProps) {
    if (JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)) {
      this.instance.params.data = this.props.data;
      this.instance.init();
    }
  }
  componentDidMount () {
    if (this.instance) return;
    var instance = new Instance(this.$el, {
      // 间隔
      spacing: this.props.spacing,
      // 数据
      data: this.props.data,
      // 数据默认值
      font: this.props.font,
      fontTop: this.props.fontTop,
      fontFillStyle: this.props.fontFillStyle,

      bgFillStyle: this.props.bgFillStyle,
      bgStrokeStyle: this.props.bgStrokeStyle,
      bgLineWidth: this.props.bgLineWidth,

      iconWidth: this.props.iconWidth,
      iconHeight: this.props.iconHeight,
      iconTop: this.props.iconTop,
      // 保存
      suffix: this.props.suffix,
      quality: this.props.quality
    });
    this.instance = instance;
  }
  render() {
    const {width, height, className, style} = this.props;
    return (
      <canvas ref={el => {this.$el = el;}} width={width} height={height} className={className} style={style}>
        Canvas抽奖轮盘
      </canvas>
    );
  }
}
