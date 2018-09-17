import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance';
import Button from './../Button';

export default class ListPull extends Component {
  static propTypes = {
    list: PropTypes.array, // [{container: node, buttons: [{onClick: fn, value: string, className: 'warn'}]}]
    style: PropTypes.object,
    className: PropTypes.string,
    onClick: PropTypes.func
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
    this.state = {
      instance: null
    }
  }
  componentDidMount() {
    var instance = new Instance(this.$el, {
      onClick: function (e) {
        console.log(e.target)
      },
      onPull: function (e) {
        // console.log(e)
      }
    });
    this.setState({
      instance
    });
  }
  onClick = (args) => {
    if (this.props.onClick) this.props.onClick(args)
  }
  render() {
    const { list, style, className } = this.props;
    return (
      <ul ref={el => { this.$el = el; }} className={`listpull${className ? ' ' + className : ''}`} style={style}>
        {list.map((item, index) => {
          return <li key={`button${index}`} className="border-b listpull-li" onClick={this.onClick.bind(this, item)}>
            <div className="listpull-left">
              <div className="unread SID-ListBtnRead">未读</div>
            </div>
            <div className="listpull-handler">
              {item.container}
            </div>
            <div className="listpull-right">
              {item.buttons.map((button, i) => {
                return <Button key={`button${i}`} className={`listpull-button${button.className ? ' ' + button.className : ''}`} args={item} onClick={() => {console.log(1)}}>{button.value}</Button>
              })}
            </div>
          </li>
        })}
      </ul>
    );
  }
}
