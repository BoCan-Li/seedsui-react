import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ticket extends Component {
  static propTypes = {
    className: PropTypes.string,
    legendStyle: PropTypes.object,
    legendClassName: PropTypes.string,
    legend: PropTypes.node,
    containerStyle: PropTypes.object,
    containerClassName: PropTypes.string,
    children: PropTypes.node
  }
  constructor(props) {
    super(props);
  }

  render() {
    const {
      className,
      legend, legendStyle, legendClassName,
      children, containerStyle, containerClassName,
      ...others
    } = this.props;
    return (
      <div className={'ticket' + (className ? ' ' + className : '')} {...others}>
        <div className={'ticket-legend' + (legendClassName ? ' ' + legendClassName : '')} style={legendStyle}>
          {legend}
        </div>
        <div className={'ticket-container' + (containerClassName ? ' ' + containerClassName : '')} style={containerStyle}>
          {children}
        </div>
      </div>
    );
  }
}
