import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance';
import Button from './../Button';

export default class ListPull extends Component {
  static propTypes = {
    list: PropTypes.array, // [{container: node, lButtons: [{onClick: fn, value: string, className: 'warn'}], rButtons: 同lButtons}]
    style: PropTypes.object,
    className: PropTypes.string,
    onClick: PropTypes.func,
    onShowedLeft: PropTypes.func,
    onShowedRight: PropTypes.func
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
      onClick: (e) => {
        const index = e.target.getAttribute('data-index');
        const args1 = this.props.list[index];
        let args2 = null;
        const i = e.target.getAttribute('data-i');
        const direction = e.target.getAttribute('data-direction');
        if (i && direction) {
          if (direction === 'left') {
            args2 = args1.lButtons[i];
          } else {
            args2 = args1.rButtons[i];
          }
        }
        if (this.props.onClick) this.props.onClick(args1, args2)
      },
      onShowedLeft: (e) => {
        if (this.props.onShowedLeft) this.props.onShowedLeft(e)
      },
      onShowedRight: (e) => {
        if (this.props.onShowedRight) this.props.onShowedRight(e)
      }
    });
    this.setState({
      instance
    });
  }
  render() {
    const { list, style, className } = this.props;
    return (
      <ul ref={el => { this.$el = el; }} className={`listpull${className ? ' ' + className : ''}`} style={style}>
        {list.map((item, index) => {
          return <li key={`button${index}`} data-index={`${index}`} className="border-b listpull-li">
            {item.lButtons && item.lButtons.length && <div className="listpull-left">
              {item.lButtons.map((button, i) => {
                return <Button key={`button${i}`} data-index={`${index}`} data-i={`${i}`} data-direction="left" className={`listpull-button${button.className ? ' ' + button.className : ''}`} style={button.style}>{button.value}</Button>
              })}
            </div>}
            <div className="listpull-handler" data-index={`${index}`}>
              {item.container}
            </div>
            {item.rButtons && item.rButtons.length && <div className="listpull-right">
              {item.rButtons.map((button, i) => {
                return <Button key={`button${i}`} data-index={`${index}`} data-i={`${i}`} data-direction="right" className={`listpull-button${button.className ? ' ' + button.className : ''}`} style={button.style}>{button.value}</Button>
              })}
            </div>}
          </li>
        })}
      </ul>
    );
  }
}
