import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DB from 'components/seedsui/utils/db';
import styled from 'styled-components';

const Root = styled.div`
  display: block;
  white-space: nowrap;
  background: #FAFAFA;
  box-shadow: inset 0 -1px 0 0 #E5E5E5, 0 -1px 0 0 #E5E5E5;
  height: 109px;
  box-sizing: border-box;
  padding: 11px;
  overflow-x: auto;
  overflow-y: hidden;
`;

const ImgContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-right: 12px;
  width: 85px;
  height: 85px;
  background: url(${props => props.img}) no-repeat;
  background-size: contain;
  background-position: center;
  border: ${props => props.noImg ? 'none' : '1px solid #EEEEEE' };
`;

export default class ImgScroll extends Component {
  static propTypes = {
    imgs: PropTypes.array,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let { imgs } = this.props;
    imgs = imgs.map((img) => {
      return img ? DB.getStore('app_imgDomain') + img : '';
    });
    return (
      <Root>
        { imgs && imgs.map((img, index) => (
          <ImgContainer key={index} img={img} />
        ))}
      </Root>
    );
  }
}
