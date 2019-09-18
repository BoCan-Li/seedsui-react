// require PrototypeArray.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';

export default class Tree extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    treeStyle: PropTypes.object,
    treeClassName: PropTypes.string,
    
    multiple: PropTypes.bool, // 是否需要多选
    checkbox: PropTypes.bool, // 是否可选
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
    multiple: true,
    list: []
  }
  constructor(props) {
    super(props);
  }
  componentDidUpdate = (prevProps) => {
    if (JSON.stringify(prevProps.list) !== JSON.stringify(this.props.list)) {
      if (this.props.list && this.props.list.length) {
        const {selected} = this.props;
        var list = Object.clone(this.props.list);
        if (JSON.stringify(list).indexOf('"children"') !== -1) {
          list = list.flattenTree()
        }
        // 设置已选中
        if(Array.isArray(selected) && selected.length) {
          for (var opt of selected) {
            this.instance.addSelected(opt)
          }
        }
        // 开始渲染
        this.instance.setData(list);
        this.instance.update();
      } else {
        this.instance.setData([]);
        this.instance.update();
      }
    }
  }
  componentDidMount = () => {
    if (this.instance) return;
    const {
      multiple, checkbox, bar,
      buttonAddHTML, buttonAddClassName, buttonAddSrc, onClickAdd,
      buttonDelHTML, buttonDelClassName, buttonDelSrc, onClickDel,
      onClickLastChild,
      onData
    } = this.props;
    // 更新数据
    var list = Object.clone(this.props.list);
    if (JSON.stringify(list).indexOf('"children"') !== -1) {
      list = list.flattenTree()
    }
    const instance = new Instance(this.$tree, {
      data: list,
      multiple,
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
    this.instance = instance;
    // 设置已选中
    const {selected} = this.props;
    if(Array.isArray(selected) && selected.length) {
      for (var opt of selected) {
        this.instance.addSelected(opt)
      }
    }
    this.instance.update();
  }
  onClick = (s) => {
    const {selected} = this.props;
    var list = Object.clone(this.props.list);
    if (JSON.stringify(list).indexOf('"children"') !== -1) {
      list = list.flattenTree()
    }
    // item
    const id = s.targetLine.getAttribute('data-id');
    let item = list.getFlattenTreeNode(id);
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
    // childrenCount
    let childrenCount = 0;
    const ul = s.targetLine.nextElementSibling;
    if (ul && ul.tagName === 'UL') {
      childrenCount = ul.children.length;
    }
    // isExtend
    const isExtend = s.targetLine.classList.contains('extend');
    
    
    if (this.props.onClick) this.props.onClick(s, item, isActived, isExtend, childrenCount);
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
