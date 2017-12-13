import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Notice from './../Notice/Notice.jsx';
export default class NoData extends Component {
  static propTypes = {
    img: PropTypes.string,
    text: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
    args: PropTypes.array
  }
  static defaultProps = {
    img: 'data:image/png;base64,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',
    text: '暂无数据'
  }
  constructor(props) {
    super(props);
  }
  render() {
    const { img, text, className, style, onClick, args } = this.props;
    return (
      <Notice text={text} className={className} style={style} onClick={onClick} args={args} img={img}/>
    );
  }
}
