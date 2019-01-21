import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';

export default class Tree extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    treeStyle: PropTypes.object,
    treeClassName: PropTypes.string,
    
    checkbox: PropTypes.bool,
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

    onClickLastChild: PropTypes.func,

    onClick: PropTypes.func,
    onData: PropTypes.func
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
  componentDidUpdate = () => {
    if (this.props.list && this.props.list.length) {
      const {selected, list} = this.props;
      // 设置已选中
      if(Array.isArray(selected) && selected.length) {
        for (var opt of selected) {
          this.state.instance.addSelected(opt)
        }
      }
      // 开始渲染
      this.state.instance.setData(list);
      this.state.instance.update();
    }
  }
  componentDidMount = () => {
    if (this.state.instance) return;
    const {
      checkbox, bar,
      buttonAddHTML, buttonAddClassName, buttonAddSrc, onClickAdd,
      buttonDelHTML, buttonDelClassName, buttonDelSrc, onClickDel,
      onClickLastChild,
      onData
    } = this.props;
    const instance = new Instance(this.$tree, {
      checkbox,
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
      onClick: this.onClick,
      onData: onData
    });
    this.setState({
      instance
    });
  }
  onClick = (s) => {
    const {list, selected} = this.props;
    // item
    const id = s.targetLine.getAttribute('data-id');
    let item = list.filter(option => {
      if (option.id === id) return true;
      return false;
    });
    if (item && item.length > 0) {
      item = item[0];
    }
    // isActived
    let isActived = selected ? selected.filter((option) => {
      if (option.id === id) return true;
      return false;
    }) : null;
    if (isActived && isActived.length > 0) {
      isActived = true;
    } else {
      isActived = false;
    }
    // extandStatus
    const extandStatus = s.targetLine.classList.contains('extand');
    // childrenCount
    let childrenCount = 0;
    const ul = s.targetLine.nextElementSibling;
    if (ul && ul.tagName === 'UL') {
      childrenCount = ul.children.length;
    }
    
    if (this.props.onClick) this.props.onClick(s, item, isActived, extandStatus, childrenCount);
  }
  render() {
    const {style, className, treeStyle, treeClassName} = this.props;
    return (
      <div ref={(el) => {this.$el = el}} className={`tree-box${className ? ' ' + className : ''}`} style={style}>
        <ul ref={(el) => {this.$tree = el}} className={`tree${treeClassName ? ' ' + treeClassName : ''}`} style={treeStyle}></ul>
      </div>
    );
  }
}
