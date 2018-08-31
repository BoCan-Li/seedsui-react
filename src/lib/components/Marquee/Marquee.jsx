import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Instance from './marquee.js'

export default class Marquee extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    list: PropTypes.array, // [{key: 'xx', value: ''}]

    contentStyle: PropTypes.object,
    contentClassName: PropTypes.string,

    step: PropTypes.number,
    duration: PropTypes.number,
    delay: PropTypes.number,
    direction: PropTypes.string, // top | bottom | left | right
    loop: PropTypes.bool,
    onClick: PropTypes.func
  }
  static defaultProps = {
    step: 50,
    duration: 300,
    delay: 2000,
    direction: 'top',
    loop: true
  }
  constructor(props) {
    super(props);
    this.state = {
      instance: null
    }
  }
  componentDidUpdate = (prevProps) => {
    if (!this.props.list.equals(prevProps.list)) {
      this.update();
    }
  }
  componentDidMount = () => {
    if (this.state.instance || this.props.list.length === 0) return;
    this.init();
  }
  update = () => {
    this.state.instance.setStart(0);
    this.state.instance.setEnd(this.props.step * (this.props.list.length - 1));
    this.state.instance.update();
    this.state.instance.play();
  }
  init = () => {
    const {list, step, duration, delay, direction, loop} = this.props;
    const instance = new Instance(this.$el, {
      start: 0,
      end: step * (list.length - 1),
      step,
      duration,
      delay,
      direction,
      loop
    });
    instance.play();
    this.setState({
      instance
    });
  }
  onClick = (item, index) => {
    if (this.props.onClick) this.props.onClick(item, index);
  }
  render() {
    const {
      className, style, list,
      contentClassName, contentStyle,
      step
    } = this.props;
    return (
      <ul ref={el => {this.$el = el;}} className={`marquee${className ? ' ' + className : ''}`} style={style}>
        {list && list.map((item, index) => {
          return <li className={`marquee-li${contentClassName ? ' ' + contentClassName : ''}`} style={Object.assign({height: step + 'px'}, contentStyle)} key={index} onClick={() => {this.onClick(item, index)}}>{item.value}</li>
        })}
      </ul>
    );
  }
}
