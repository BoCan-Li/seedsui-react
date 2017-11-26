import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Group from 'components/seedsui/Group/Group.jsx';
import Attributes from 'components/seedsui/Attributes/Attributes.jsx';

export default class Pay extends Component {
  static propTypes = {
    list: PropTypes.array
  }
  constructor(props, context) {
    super(props, context);
    console.log(props.list);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }
  render() {
    const {list} = this.props;
    return (
      <Group>
        <Attributes list={list}>
          <hr/>
        </Attributes>
      </Group>
    );
  }
}
