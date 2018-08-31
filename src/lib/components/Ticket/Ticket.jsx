import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ticket extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    legend: PropTypes.node,
    children: PropTypes.node,
    onClick: PropTypes.func
  }
  constructor(props) {
    super(props);
  }

  render() {
    const {legend, children, style, className, onClick} = this.props;
    return (
      <div className={'ticket' + (className ? ' ' + className : '')} style={style} onClick={onClick}>
        <div className="ticket-legend">
          {legend}
        </div>
        <div className="ticket-container">
          {children}
        </div>
      </div>
    );
  }
}
