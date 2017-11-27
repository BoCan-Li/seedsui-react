import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import arrow from './arrow.png';

const TagItem = styled.span`
  display: inline-block;
  z-index: 1;
  background-color: #FF9008;
  color: #fff;
  font-size: 12px;
  border-radius: 50px;
  padding: 1px 7px 2px;
`;

const Icon = styled.img`
  width: 11px;
  vertical-align: middle;
`;

export default class Tag extends Component {
  static propTypes = {
    tag: PropTypes.string
  };


  render() {
    const {tag} = this.props;
    return (
      <TagItem>{tag} <Icon src={arrow}/></TagItem>
    );
  }
}
