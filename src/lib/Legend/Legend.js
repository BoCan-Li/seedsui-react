import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Legend extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }

  render() {
    const {className, children, ...others} = this.props;
    return (
      <div className={`legend${className ? ' ' + className : ''}`} {...others}>
        <div className="legend-caption">
          {children}
        </div>
      </div>
    );
  }
}
