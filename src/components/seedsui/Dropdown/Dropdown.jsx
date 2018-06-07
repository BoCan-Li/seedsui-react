import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabbar from 'components/seedsui/Tabbar';
import Dialog from 'components/seedsui/Dialog/Dialog.jsx';
import MenuTiled from 'components/seedsui/MenuTiled/MenuTiled.jsx';

export default class Dropdown extends Component {
  static propTypes = {
    portal: PropTypes.object, // 传送到DOM
    top: PropTypes.number,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    list: PropTypes.array // [{caption: '分类', data: [{id: '1',caption: '测试数据1',children:[]}]}]
  }
  static defaultProps = {
    list: []
  }
  constructor(props) {
    super(props);
    this.state = {
      tabbarActiveIndex: -1,
      tabbar: [],
      activeMenuId: '',
      menus: [],
      top: 0,
      dialogShow: false
    };
  }
  componentDidUpdate = (prevProps) => {
    // 如果数据长度不一样,或者上次没有data,此次有data,则刷新
    if ((prevProps.list.length !== this.props.list.length) || (prevProps.list[0] && !prevProps.list[0].data && this.props.list[0].data)) {
      this.refresh();
    // 如果选中项有变化也要刷新
    } else if (this.props.list.some((item, i) => {return item.id !== prevProps.list[i].id;})) {
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
        caption: item.caption,
        riconClassName: 'shape-triangle-down',
        riconActiveStyle: {borderTopColor: '#EB464A'}
      });
    };
    this.setState({
      tabbar,
    });
  }
  onClickTab = (item, index) => {
    // 设置弹框的数据
    this.setState({
      activeMenuId: this.state.tabbar[index].id,
      menus: this.props.list[index].data
    });
    if (this.state.tabbarActiveIndex >= 0) {
      this.setState({
        tabbarActiveIndex: -1,
        dialogShow: false
      });
    } else {
      this.setState({
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
  onClickMenu = (item) => {
    if (item.children && item.children.length > 0) return;
    const tabbar = this.state.tabbar;
    const activeIndex = this.state.tabbarActiveIndex;
    // 如果选中的标题是全部,则显示原始标题,例如:点击分类,选择全部,则应当显示分类
    if (item.id === this.props.list[activeIndex].id) {
      tabbar[activeIndex].id = this.props.list[activeIndex].id;
      tabbar[activeIndex].caption = this.props.list[activeIndex].caption;
    // 设置选中的标题显示在tabbar上
    } else {
      tabbar[activeIndex].id = item.id;
      tabbar[activeIndex].caption = item.caption;
    }
    this.setState({
      tabbar: tabbar,
      tabbarActiveIndex: -1,
      dialogShow: false
    });
    // 触发onChange事件
    if (this.props.onChange) this.props.onChange(tabbar);
  }
  render() {
    const DOM = [<Tabbar key="tabbar" ref={el => {this.$tabbar = el}} exceptOnClickActive={false} list={this.state.tabbar} onClick={this.onClickTab} activeIndex={this.state.tabbarActiveIndex} className="tabbar-dropdown tabbar-tiled border-b"/>];
    if (this.props.portal) {
      DOM.push(<Dialog key="dialog" portal={this.props.portal} onClickMask={this.onClickMask} animation="slideDown" style={{width: '100%'}} maskStyle={{top: this.state.top + 'px'}} show={this.state.dialogShow}>
        <MenuTiled list={this.state.menus} activeId={this.state.activeMenuId} onClick={this.onClickMenu}/>
      </Dialog>);
    }
    return DOM;
  }
}
