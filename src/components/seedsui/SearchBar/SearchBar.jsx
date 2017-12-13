import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SearchBar extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onClear: PropTypes.func,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      value: props.value || '',
      showClear: false
    };
  }
  componentDidMount() {
    this.searchInput.focus();
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value,
        showClear: true
      });
    }
  }
  onClear = () => {
    this.setState({
      value: '',
      showClear: false
    });
    this.searchInput.focus();
    if (this.props.onClear) this.props.onClear();
  }
  onChange = () => {
    if (this.searchInput.value.length === 0) {
      this.setState({showClear: false});
    } else {
      this.setState({showClear: true});
    }
    this.searchInput.focus();
    this.setState({
      value: this.searchInput.value
    });
    if (this.props.onChange) this.props.onChange(this.searchInput.value);
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
    this.searchInput.blur();
  }
  onCancel = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    } else {
      history.go(-1);
    }
  }
  render() {
    const { placeholder } = this.props;
    return (
      <div className="searchbar">
        <form className="searchbar-form" onSubmit={this.onSubmit}>
          <i className="searchbar-icon-search"></i>
          <input type="search" ref={input => this.searchInput = input} className="searchbar-input" placeholder={placeholder} onChange={this.onChange} value={this.state.value}/>
          {this.state.showClear && <i className="searchbar-icon-clear" onClick={this.onClear}></i>}
        </form>
        <div className="searchbar-button" onClick={this.onCancel}>取消</div>
      </div>
    );
  }
}
