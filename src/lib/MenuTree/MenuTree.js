import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';

export default class MenuTree extends Component {
  static propTypes = {
    className: PropTypes.string,
    selectedId: PropTypes.string, // 默认选中项的id
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
  componentDidUpdate = () => {
    if (this.props.list && this.props.list.length) {
      this.state.instance.setSelectedId(this.props.selectedId)
      this.state.instance.setData(this.props.list)
    }
  }
  componentDidMount = () => {
    const {list, selectedId} = this.props;
    if (this.state.instance) return;
    const instance = new Instance(this.$el, {
      data: list,
      selectedId,
      onClick: this.props.onClick // (item, isActive, isExtand: -1无子节点 | true展开 | false收缩, childrenCount))
    });
    this.setState({
      instance
    });
  }
  render() {
    const {className, selectedId, onClick, list, ...others} = this.props;
    return (
      <ul ref={el => {this.$el = el;}} className={`menutree${className ? ' ' + className : ''}`} {...others}>
      </ul>
    );
  }
}
