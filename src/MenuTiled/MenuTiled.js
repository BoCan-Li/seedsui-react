// require PrototypeArray.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';

export default class MenuTiled extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    selectedId: PropTypes.string, // 默认选中项的id
    onClick: PropTypes.func,

    list: PropTypes.array
  }
  /* list: [{
    id: '',
    name: '',
    active: false,
    children
  }] */
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  componentDidUpdate = (prevProps) => {
    if (JSON.stringify(prevProps.list) !== JSON.stringify(this.props.list)) {
      if (this.props.list && this.props.list.length) {
        this.instance.setSelectedId(this.props.selectedId)
        var list = Object.clone(this.props.list);
        if (JSON.stringify(list).indexOf('"children"') === -1) {
          list = list.deepTree()
        }
        this.instance.setData(list)
      } else {
        this.instance.setData([])
      }
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
      onClick: this.onClick
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
      <div ref={el => {this.$el = el;}} className={`menutiled${className ? ' ' + className : ''}`} {...others}>
      </div>
    );
  }
}
