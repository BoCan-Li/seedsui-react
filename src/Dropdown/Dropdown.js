import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabbar from './../Tabbar';
import Dialog from './../Dialog';
import MenuTiled from './../MenuTiled';

export default class Dropdown extends Component {
  static propTypes = {
    portal: PropTypes.object, // 传送到DOM
    top: PropTypes.number,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    list: PropTypes.array // [{name: '分类', data: [{id: '1',name: '测试数据1',children:[]}]}]
  }
  static defaultProps = {
    list: []
  }
  constructor(props) {
    super(props);
    this.state = {
      tabbarActiveIndex: -1,
      tabbar: [],
      menusSelectedId: '',
      menus: [],
      top: 0,
      dialogShow: false
    };
  }
  componentDidUpdate = (prevProps) => {
    if (JSON.stringify(prevProps.list) !== JSON.stringify(this.props.list)) {
      this.refresh();
    }
  }
  componentDidMount = () => {
    // 计算距离头部
    let top = this.props.top;
    if (!top) {
      top = this.$tabbar.$el.offsetTop + 40;
    }
    this.setState({
      top
    });
    // 更新数据
    this.refresh();
  }
  refresh = () => {
    // tabbar 和 MenuTiled
    const tabbar = [];
    for (let item of this.props.list) {
      tabbar.push({
        id: item.id,
        name: item.name,
        ricon: <span className='icon tab-icon shape-triangle-down'></span>
      });
    };
    this.setState({
      tabbar,
    });
  }
  onClickTab = (e, item, index) => {
    if (this.state.tabbarActiveIndex >= 0) {
      this.setState({
        // 设置弹框的数据
        menusSelectedId: this.state.tabbar[index].id,
        menus: this.props.list[index].data,
        // 隐藏弹框
        tabbarActiveIndex: -1,
        dialogShow: false
      });
    } else {
      this.setState({
        // 设置弹框的数据
        menusSelectedId: this.state.tabbar[index].id,
        menus: this.props.list[index].data,
        // 显示弹框
        tabbarActiveIndex: index,
        dialogShow: true
      });
    }
  }
  onClickMask = () => {
    this.setState({
      tabbarActiveIndex: -1,
      dialogShow: false
    });
  }
  onClickMenu = (e, item) => {
    if (item.children && item.children.length > 0) return;
    const tabbar = this.state.tabbar;
    const activeIndex = this.state.tabbarActiveIndex;
    // 如果选中的标题是全部,则显示原始标题,例如:点击分类,选择全部,则应当显示分类
    if (item.id === this.props.list[activeIndex].id) {
      tabbar[activeIndex].id = this.props.list[activeIndex].id;
      tabbar[activeIndex].name = this.props.list[activeIndex].name;
    // 设置选中的标题显示在tabbar上
    } else {
      tabbar[activeIndex].id = item.id;
      tabbar[activeIndex].name = item.name;
    }
    this.setState({
      tabbar: tabbar,
      tabbarActiveIndex: -1,
      dialogShow: false
    });
    // 触发onChange事件
    if (this.props.onChange) this.props.onChange(e, tabbar);
  }
  render() {
    const {
      portal,
      top,
      disabled,
      onChange,
      list,
      ...others
    } = this.props;
    const DOM = [<Tabbar
      key="tabbar"
      disabled={disabled}
      ref={el => {this.$tabbar = el}}
      exceptOnClickActive={false}
      list={this.state.tabbar}
      onClick={this.onClickTab}
      activeIndex={this.state.tabbarActiveIndex}
      className="tabbar-dropdown tabbar-tiled border-b"
      {...others}
    />];
    DOM.push(<Dialog
      key="dialog"
      portal={this.props.portal}
      maskAttribute={{onClick: this.onClickMask, style: {top: this.state.top + 'px'}}}
      animation="slideDown"
      style={{width: '100%'}}
      show={this.state.dialogShow}
    >
      <MenuTiled
        list={this.state.menus}
        selectedId={this.state.menusSelectedId}
        onClick={this.onClickMenu}
      />
    </Dialog>);
    return DOM;
  }
}
