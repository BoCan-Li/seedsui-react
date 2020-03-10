import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance';
import './fixtable.css';

export default class FixTable extends Component {
  static propTypes = {
    thead: PropTypes.node,
    tbody: PropTypes.node,
    theadFixed: PropTypes.bool,
    columnFixed: PropTypes.number,
    onBottomRefresh: PropTypes.func
  }
  static defaultProps = {
  }
  componentDidMount () {
    if (this.instance) return;
    const {
      onBottomRefresh
    } = this.props;
    this.instance = new Instance(this.$el, {
      onBottomRefresh: onBottomRefresh
    });
  }
  render() {
    const {
      thead,
      tbody,
      theadFixed = true,
      columnFixed = 0,
      onBottomRefresh,
      ...others
    } = this.props;
    if (!thead || !tbody) return null;
    return (
      <div ref={el => { this.$el = el; }} {...others} className={'fixtable wrap' + (others.className ? ' ' + others.className : '')}>
        <div className="fixtable-scroller">
          <table className="fixtable-scroller-table" cellSpacing="0">
            {thead}
            {tbody}
          </table>
          {onBottomRefresh && <div className="fixtable-scroller-bottom">
            <div className="fixtable-bottom-loading"></div>
            <div className="fixtable-bottom-caption">正在加载...</div>
          </div>}
        </div>
        {/* 固定头部 */}
        {theadFixed && <div className="fixtable-fixed">
          <table className="fixtable-fixed-head" cellSpacing="0">
            {thead}
            {tbody}
          </table>
        </div>}
        {/* 固定左列 */}
        {columnFixed && <div className="fixtable-fixed">
          <table className="fixtable-fixed-column" cellSpacing="0">
            {tbody}
          </table>
        </div>}
      </div>
    );
  }
}
