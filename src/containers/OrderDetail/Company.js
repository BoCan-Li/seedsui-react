import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sliver from 'components/seedsui/Sliver/Sliver.jsx';

export default class Company extends Component {
  static propTypes = {
    name: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { name } = this.props;
    return (
      <Sliver caption={name} liconClassName="icon-build size16" style={{padding: '10px 12px'}}/>
    );
  }
}
