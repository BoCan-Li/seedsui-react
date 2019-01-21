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
    this.state = {
      instance: null
    }
  }
  componentDidUpdate = (prevProps) => {
    if (this.props.list && this.list.length) {
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
      onClick: this.props.onClick
    });
    this.setState({
      instance
    });
  }
  render() {
    const {className, selectedId, onClick, list, ...others} = this.props;
    return (
      <div ref={el => {this.$el = el;}} className={`menutiled${className ? ' ' + className : ''}`} {...others}>
      </div>
    );
  }
}
