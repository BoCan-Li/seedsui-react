import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';

export default class Marquee extends Component {
  static propTypes = {
    list: PropTypes.array, // [{key: 'xx', value: ''}]
    contentAttribute: PropTypes.object,
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
  }
  componentDidUpdate = (prevProps) => {
    if (!this.props.list.equals(prevProps.list)) {
      this.update();
    }
  }
  componentDidMount = () => {
    if (this.instance || this.props.list.length === 0) return;
    this.init();
  }
  update = () => {
    this.instance.setStart(0);
    this.instance.setEnd(this.props.step * (this.props.list.length - 1));
    this.instance.update();
    this.instance.play();
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
    this.instance = instance;
  }
  // 过滤已经回调的属性
  filterProps = (props) => {
    if (!props) return props;
    var propsed = {}
    for (let n in props) {
      if (n !== 'onClick') {
        propsed[n] = props[n]
      }
    }
    return propsed;
  }
  render() {
    let {
      list,
      contentAttribute = {},
      step,
      duration,
      delay,
      direction,
      loop,
      onClick,
      ...others
    } = this.props;

    // 剔除掉onClick事件, 因为在容器onClick已经回调了
    contentAttribute = this.filterProps(contentAttribute)

    return (
      <ul ref={el => {this.$el = el;}} {...others} className={`marquee${others.className ? ' ' + others.className : ''}`}>
        {list && list.map((item, index) => {
          return <li key={index} {...contentAttribute} className={`marquee-li${contentAttribute.className ? ' ' + contentAttribute.className : ''}`} style={Object.assign({height: step + 'px'}, contentAttribute.style || {})} onClick={(e) => {onClick(e, item, index)}}>{item.value}</li>
        })}
      </ul>
    );
  }
}
