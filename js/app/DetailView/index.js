'use strict';

import React from 'react';
import ReactNative from 'react-native';

const {
  View,
  Text
} = ReactNative;

import {SobjContainer} from 'react.force.datacontainer';

import ContainerView from './View';

module.exports = React.createClass({
  render(){
    return(
      <SobjContainer key={this.props.route.entityId} type={this.props.route.entityType} id={this.props.route.entityId}>
        <ContainerView route={this.props.route} navigator={this.props.navigator}/>
      </SobjContainer>
    )
  }
})
