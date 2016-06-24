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
      <SobjContainer key={this.props.entityId} type={this.props.entityType} id={this.props.entityId}>
        <ContainerView navigator={this.props.navigator} chatterData={this.props.chatterData} index={this.props.index} componentData={this.props.componentData} entityId={this.props.entityId} sumOfEntities={this.props.sumOfEntities}/>
      </SobjContainer>
    )
  }
})
