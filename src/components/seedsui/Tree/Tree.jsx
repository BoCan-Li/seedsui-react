import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './tree.js';

export default class Tree extends Component {
  static propTypes = {
    multiple: PropTypes.bool,
    bar: PropTypes.oneOfType([ // 选中栏
      PropTypes.string,
      PropTypes.node
    ]),
    selected: PropTypes.array, // [{id: '', name: '', parentid: ''}]
    list: PropTypes.array, // [{id: '', name: '', parentid: ''}]

    buttonAddHTML: PropTypes.string,
    buttonAddClassName: PropTypes.string,
    buttonAddSrc: PropTypes.string,
    onClickAdd: PropTypes.func,

    buttonDelHTML: PropTypes.string,
    buttonDelClassName: PropTypes.string,
    buttonDelSrc: PropTypes.string,
    onClickDel: PropTypes.func,

    onClickLastChild: PropTypes.func
  }
  static defaultProps = {
    list: []
  }
  constructor(props) {
    super(props);
    this.state = {
      instance: null
    };
  }
  shouldComponentUpdate = (nextProps) => {
    if (!nextProps.list.length) {
      return false;
    }
    if (this.props.list.length !== nextProps.list.length) {
      return true;
    }
    if (!this.$tree.children.length) {
      return true;
    }
    return false;
  }
  componentDidUpdate = () => {
    const {selected, list} = this.props;
    //渲染
    if (list.length) {
      console.log(selected)
      // 设置已选中
      if(Array.isArray(selected) && selected.length) {
        for (var opt of selected) {
          this.state.instance.addSelected(opt)
        }
      }
      // 开始渲染
      this.state.instance.setData(list);
      this.state.instance.update();
      this.state.instance.addAllExtand();
    }
  }
  componentDidMount = () => {
    if (this.state.instance) return;
    const {multiple, bar,
          buttonAddHTML, buttonAddClassName, buttonAddSrc, onClickAdd,
          buttonDelHTML, buttonDelClassName, buttonDelSrc, onClickDel,
          onClickLastChild} = this.props;
    const instance = new Instance(this.$tree, {
      multiple,
      bar,
      buttonAddHTML,
      buttonAddClassName,
      buttonAddSrc,
      onClickAdd,
      buttonDelHTML,
      buttonDelClassName,
      buttonDelSrc,
      onClickDel,
      onClickLastChild, // 没有子节点
    });
    this.setState({
      instance
    });
  }
  render() { 
    return (
      <div ref={(el) => {this.$el = el}} className="tree-box">
        <ul ref={(el) => {this.$tree = el}} className="tree"></ul>
      </div>
    );
  }
}
