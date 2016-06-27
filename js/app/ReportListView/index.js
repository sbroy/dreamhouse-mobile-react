'use strict'

import React from 'react';
import ReactNative from 'react-native'

const {
  View,
  Text,
  ListView,
  TouchableOpacity,
  InteractionManager
} = ReactNative;

import {ReportContainer} from 'react.force.datacontainer';

import ReportView from './View';

module.exports = React.createClass ({
  getDefaultProps(){
    return {
      positin: null,
      summaryCallback: null,
      entityId: null,
      reportId: null,
      numberOfRows: null
    }
  },

  shouldComponentUpdate(nextProps, nextState, nextContext){
     if (this.props.entityId !== nextProps.entityId){
       return true;
     } else if (this.props.position !== nextProps.position){
       return true;
     } 
     return false;
  },

  render(){
    return (
      <ReportContainer id={this.props.reportId} entityId = {this.props.entityId} refreshDate={new Date()}>
        <ReportView {...this.props}/>
      </ReportContainer>
      )
  }
})
