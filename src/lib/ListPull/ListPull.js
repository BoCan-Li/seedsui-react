import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance';
import Button from './../Button';

export default class ListPull extends Component {
  static propTypes = {
    list: PropTypes.array, // [{container: node, lButtons: [{value: '按钮文字', className: 'warn', style: object}], rButtons: 同lButtons}]
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
        const item = this.props.list[index];
        let btn = null;
        const i = e.target.getAttribute('data-i');
        const direction = e.target.getAttribute('data-direction');
        if (i && direction) {
          if (direction === 'left') {
            btn = item.lButtons[i];
          } else {
            btn = item.rButtons[i];
          }
        }
        if (this.props.onClick) this.props.onClick(item, index, btn)
      },
      onShowedLeft: this.props.onShowedLeft,
      onShowedRight: this.props.onShowedRight
    });
    this.setState({
      instance
    });
  }
  render() {
    const { list, style, className } = this.props;
    return (
      <ul ref={el => { this.$el = el; }} className={`list-pull${className ? ' ' + className : ''}`} style={style}>
        {list.map((item, index) => {
          return <li key={`button${index}`} data-index={`${index}`} className="border-b list-pull-li">
            {item.lButtons && item.lButtons.length && <div className="list-pull-left">
              {item.lButtons.map((button, i) => {
                return <Button key={`button${i}`} data-index={`${index}`} data-i={`${i}`} data-direction="left" className={`list-pull-button${button.className ? ' ' + button.className : ''}`} style={button.style}>{button.value}</Button>
              })}
            </div>}
            <div className="list-pull-handler" data-index={`${index}`}>
              {item.container}
            </div>
            {item.rButtons && item.rButtons.length && <div className="list-pull-right">
              {item.rButtons.map((button, i) => {
                return <Button key={`button${i}`} data-index={`${index}`} data-i={`${i}`} data-direction="right" className={`list-pull-button${button.className ? ' ' + button.className : ''}`} style={button.style}>{button.value}</Button>
              })}
            </div>}
          </li>
        })}
      </ul>
    );
  }
}
