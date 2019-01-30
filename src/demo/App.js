import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Container from '../lib/Container';
import Bridge from '../lib/Bridge';
import Emoji from '../lib/Emoji';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
			showEmoji: true,
			value: ''
		}
  }
  componentDidMount() {
    Bridge.debug = true;
  }
  
  onChange = (value) => {
		this.setState({
			value: value
		})
	}
	
	toggleEmoji = () => {
		this.setState((prevState) => {
			return {
				showEmoji: !prevState.showEmoji
			}
		})
	}
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{ borderColor: 'red' }} backCaption="返回" />
      </Header>
      <Container>
				{this.state.showEmoji && <Emoji autoFocus onChange={this.onChange} value={this.state.value}/>}
				<input type="button" value="显隐" onClick={this.toggleEmoji}/>
      </Container>
    </Page>
  }
};
