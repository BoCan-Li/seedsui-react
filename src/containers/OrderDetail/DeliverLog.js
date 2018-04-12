import React, { Component } from 'react'
import PropTypes from 'prop-types'
import arrow from 'components/icons/arrow.png';
import Group from 'components/seedsui/Group/Group.jsx';
import List from 'components/seedsui/List/List.jsx';

export default class DeliverLog extends Component {
  static propTypes = {
    list: PropTypes.array,
    name: PropTypes.string,
    goDelivery: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {list} = this.props;
    const listDOM = list.map((item, index) => {
      if (item.noArrow) return <List style={{marginLeft: '12px', paddingLeft: '0'}} className="oneline noclick border-b" caption={item.name} sndcaption={item.value && item.value} key={index}/>;
      return <List style={{marginLeft: '12px', paddingLeft: '0'}} className="oneline border-b" caption={item.name} sndcaption={item.value && item.value} onClick={item.onClick} key={index} riconSrc={arrow}/>;
    });
    return (
      <Group>
        {listDOM}
      </Group>
    );
  }
}
