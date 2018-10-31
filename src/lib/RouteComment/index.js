import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Page from './../Page';
import Header from './../Header';
import Titlebar from './../Titlebar';
import Container from './../Container';
import Button from './../Button';

export default class RouteComment extends Component {
  static propTypes = {
    title: PropTypes.string,
    placeholder: PropTypes.string,

    submitValid: PropTypes.bool,
    cancelValid: PropTypes.bool,

    submitCaption: PropTypes.node,
    submitStyle: PropTypes.object,
    submitClassName: PropTypes.string,
    onClickSubmit: PropTypes.func,

    cancelCaption: PropTypes.node,
    cancelStyle: PropTypes.object,
    cancelClassName: PropTypes.string,
    onClickCancel: PropTypes.func,
  };
  static defaultProps = {
    submitValid: true,
    cancelValid: true,
    title: '填写意见',
    placeholder: '点击输入',
    submitCaption: '提交',
    submitClassName: 'lg primary',
    cancelCaption: '取消',
    cancelClassName: 'lg bg-white'
  }
  constructor(props) {
    super(props);
    this.state = {
      isEnable: false
    }
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  onChange = (e) => {
    const target = e.target;
    if (target.value && !this.state.isEnable) {
      this.setState({
        isEnable: true
      })
    } else if(!target.value && this.state.isEnable) {
      this.setState({
        isEnable: false
      })
    }
  }
  onClickSubmit = () => {
    if (this.props.onClickSubmit) this.props.onClickSubmit(this.$textarea.value, {op: 'submit'})
  }
  onClickCancel = () => {
    if (this.props.onClickCancel) this.props.onClickCancel(this.$textarea.value, {op: 'cancel'})
  }
  render() {
    const {title, placeholder, submitValid, cancelValid, submitCaption, submitStyle, submitClassName, onClickSubmit, cancelCaption, cancelStyle, cancelClassName, onClickCancel, ...others} = this.props;
    return (
      <Page>
        <Header>
          <Titlebar caption={title}/>
        </Header>
        <Container>
          <div className="route-comment-input-box">
            <textarea ref={(el) => {this.$textarea = el}} className="route-comment-input" placeholder={placeholder} onChange={this.onChange} {...others}></textarea>
          </div>
          {!this.props.onClickCancel &&
            <Button onClick={this.onClickSubmit} className={`route-comment-button-single route-comment-button ${submitClassName}`} disabled={submitValid && !this.state.isEnable} style={submitStyle}>{submitCaption}</Button>
          }
          {this.props.onClickCancel &&
          <div className="route-comment-button-box">
            <Button onClick={this.onClickCancel} className={`route-comment-button ${cancelClassName}`} disabled={cancelValid && !this.state.isEnable} style={cancelStyle}>{cancelCaption}</Button>
            <Button onClick={this.onClickSubmit} className={`route-comment-button ${submitClassName}`} disabled={submitValid && !this.state.isEnable} style={submitStyle}>{submitCaption}</Button>
          </div>}
        </Container>
      </Page>
    );
  }
}
