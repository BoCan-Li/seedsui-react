import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Title extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    legend: PropTypes.node,
    children: PropTypes.node,
    onClick: PropTypes.func
  }
  static defaultProps = {
    className: 'title-through'
  }
  constructor(props) {
    super(props);
  }

  render() {
    const {legend, children, style, className, onClick} = this.props;
    return (
      <div className={className} style={style} onClick={onClick}>
        <div className="title-caption">
          {children}
        </div>
      </div>
    );
  }
}
