// require PrototypeArray.js
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
  }
  componentDidUpdate = (prevProps) => {
    if (this.props.list && this.props.list.length && JSON.stringify(prevProps.list) !== JSON.stringify(this.props.list)) {
      this.instance.setSelectedId(this.props.selectedId)
      var list = Object.clone(this.props.list);
      if (JSON.stringify(list).indexOf('"children"') === -1) {
        list = list.deepTree()
      }
      this.instance.setData(list)
    }
  }
  componentDidMount = () => {
    if (this.instance) return;
    var list = Object.clone(this.props.list);
    if (JSON.stringify(list).indexOf('"children"') === -1) {
      list = list.deepTree()
    }
    const instance = new Instance(this.$el, {
      data: list,
      selectedId: this.props.selectedId,
      onClick: this.onClick // (item, isActive, isExtend: true展开 | false收缩)
    });
    this.instance = instance;
  }
  onClick = (s, item, isActived, isExtend) => {
    // childrenCount
    var childrenCount = item.children && item.children.length ? item.children.length : 0;

    if (this.props.onClick) this.props.onClick(s, item, isActived, isExtend, childrenCount);
  }
  render() {
    const {className, selectedId, onClick, list, ...others} = this.props;
    return (
      <ul ref={el => {this.$el = el;}} className={`menutree${className ? ' ' + className : ''}`} {...others}>
      </ul>
    );
  }
}
