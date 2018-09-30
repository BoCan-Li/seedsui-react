import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';

export default class MenuTree extends Component {
  static propTypes = {
    className: PropTypes.string,
    activeId: PropTypes.string, // 默认选中项的id
    onClick: PropTypes.func,

    list: PropTypes.array
  }
  /* list: [{
    id: '',
    caption: '',
    active: false,
    children
  }] */
  static defaultProps = {
  }
  constructor(props) {
    super(props);
    this.state = {
      instance: null
    }
  }
  shouldComponentUpdate = (nextProps) => {
    if (this.props.list.length === nextProps.list.length) {
      return false;
    }
    return true;
  }
  componentDidUpdate = (prevProps) => {
    this.state.instance.setActiveId(this.props.activeId)
    this.state.instance.setData(this.props.list)
  }
  componentDidMount = () => {
    const {list, activeId} = this.props;
    if (this.state.instance) return;
    const instance = new Instance(this.$el, {
      data: list,
      activeId,
      onClick: this.props.onClick // (item, isActive, isExtand: -1无子节点 | true展开 | false收缩, childrenCount))
    });
    this.setState({
      instance
    });
  }
  render() {
    const {className, activeId, onClick, list, ...others} = this.props;
    return (
      <ul ref={el => {this.$el = el;}} className={`menutree${className ? ' ' + className : ''}`} {...others}>
      </ul>
    );
  }
}
