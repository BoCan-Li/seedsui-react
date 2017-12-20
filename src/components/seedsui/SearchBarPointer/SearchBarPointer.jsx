import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router';
import bridge from 'components/seedsui/utils/bridge';

@withRouter
export default class SearchBarPointer extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    url: PropTypes.string,
    onClickCancel: PropTypes.func
  };

  constructor(props) {
    super(props);
  }
  goSearch = () => {
    const {history, url} = this.props;
    bridge.isHomePage(function (data) {
      if (data.result.toString() === '1') bridge.openWindow({url: url + '?isFromApp=1'});
      else history.push(url);
    });
  }
  render() {
    const { placeholder, onClickCancel } = this.props;
    return (
      <div className="searchbar">
        <div className="searchbar-form" onClick={this.goSearch}>
          <i className="searchbar-icon-search"></i>
          <input type="search" className="searchbar-input" readOnly placeholder={placeholder}/>
        </div>
        {onClickCancel && <div className="searchbar-button" onClick={onClickCancel}>取消</div>}
      </div>
    );
  }
}
