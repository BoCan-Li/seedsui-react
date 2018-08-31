import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Legend extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func
  }
  static defaultProps = {
    className: 'legend-through'
  }
  constructor(props) {
    super(props);
  }

  render() {
    const {children, style, className, onClick} = this.props;
    return (
      <div className={className} style={style} onClick={onClick}>
        <div className="legend-caption">
          {children}
        </div>
      </div>
    );
  }
}
