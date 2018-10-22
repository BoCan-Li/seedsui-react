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
    onSubmit: PropTypes.func,
    submitStyle: PropTypes.object
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
  onSubmit = () => {
    if (this.props.onSubmit) this.props.onSubmit(this.$textarea.value)
  }
  render() {
    const {title, placeholder, submitStyle} = this.props;
    return (
      <Page>
        <Header>
          <Titlebar caption={title}/>
        </Header>
        <Container>
          <div style={{padding: '10px 0', backgroundColor: 'white'}} className="border-b">
            <textarea ref={(el) => {this.$textarea = el}} style={{display: 'block', width: '100%', lineHeight: '22px', border: '0', padding: '0 12px', boxSizing: 'border-box', height: '100px'}} placeholder={placeholder} onChange={this.onChange}></textarea>
          </div>
          <Button onClick={this.onSubmit} className={`lg primary`} disabled={!this.state.isEnable} style={Object.assign({margin: '30px 60px', borderRadius: '4px'}, submitStyle)}>提交</Button>
        </Container>
      </Page>
    );
  }
}
