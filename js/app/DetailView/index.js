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
  getDefaultProps(){
    navigator: null,
    chatterData: null,
    position: null,
    componentData: null,
    entityId: null,
    entityType: null,
    sumOfEntities: null
  },

  render(){
    return(
      <SobjContainer key={this.props.entityId} type={this.props.entityType} id={this.props.entityId}>
        <ContainerView navigator={this.props.navigator} chatterData={this.props.chatterData} position={this.props.position} componentData={this.props.componentData} entityId={this.props.entityId} sumOfEntities={this.props.sumOfEntities}/>
      </SobjContainer>
    )
  }
})
