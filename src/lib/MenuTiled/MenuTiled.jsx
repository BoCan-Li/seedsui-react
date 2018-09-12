import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';

export default class MenuTiled extends Component {
  static propTypes = {
    style: PropTypes.object,
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
      onClick: this.onClick
    });
    this.setState({
      instance
    });
  }
  onClick = (item, isActived, isExtand) => {
    if (isExtand && this.props.onClick) this.props.onClick(item);
  }
  render() {
    const {className, style} = this.props;
    return (
      <div ref={el => {this.$el = el;}} className={`menutiled${className ? ' ' + className : ''}`} style={style}>
      </div>
    );
  }
}
