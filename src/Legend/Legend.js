import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Legend extends Component {
  static propTypes = {
    children: PropTypes.node
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }

  render() {
    const {children, ...others} = this.props;
    return (
      <div ref={(el) => {this.$el = el;}} {...others} className={`legend${others.className ? ' ' + others.className : ''}`}>
        <div className="legend-caption">
          {children}
        </div>
      </div>
    );
  }
}
