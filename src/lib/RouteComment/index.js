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

    buttons: PropTypes.array,
    /*
    {
      valid: PropTypes.bool,
      caption: PropTypes.node,
      style: PropTypes.object,
      className: PropTypes.string,
      onClick: PropTypes.func,
    }*/

    children: PropTypes.node
  };
  static defaultProps = {
    title: '填写意见',
    placeholder: '点击输入'
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
  onClick = ([item, index]) => {
    if (item.onClick) {
      item.onClick(this.$textarea.value, item, index);
    }
  }
  render() {
    const {title, placeholder, buttons, children, ...others} = this.props;
    return (
      <Page>
        <Header>
          <Titlebar caption={title}/>
        </Header>
        <Container>
          <div className="route-comment-input-box">
            <textarea ref={(el) => {this.$textarea = el}} className="route-comment-input" placeholder={placeholder} onChange={this.onChange} {...others}></textarea>
          </div>
          {children}
          {buttons && buttons.length === 1 &&
            buttons.map((item, index) => {
              return <Button key={index} args={[item, index]} onClick={this.onClick} className={`route-comment-button-single ${item.className || ''}`} disabled={item.valid && !this.state.isEnable} style={item.style}>{item.caption}</Button>
            })
          }
          {buttons && buttons.length > 1 &&
            <div className="route-comment-button-box">
              {buttons.map((item, index) => {
                return <Button key={index} args={[item, index]} onClick={this.onClick} className={`route-comment-button ${item.className || ''}`} disabled={item.valid && !this.state.isEnable} style={item.style}>{item.caption}</Button>
              })}
            </div>
          }
        </Container>
      </Page>
    );
  }
}
