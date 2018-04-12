import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Attributes from 'components/seedsui/Attributes/Attributes.jsx';
import Group from 'components/seedsui/Group/Group.jsx';

export default class Message extends Component {
  static propTypes = {
    label: PropTypes.string,
    message: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { label, message } = this.props;
    const items = [{name: label, value: message}];
    return (
      <Group>
        <Attributes list={items} nameClassName="color-sub" valueClassName="nowrap" valueStyle={{marginLeft: '8px'}}/>
      </Group>
    );
  }
}
