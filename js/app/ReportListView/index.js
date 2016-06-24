'use strict'

import React from 'react';
import ReactNative from 'react-native'

const {
  View
} from ReactNative;

import {ReportContainer} from 'react.force.datacontainer';

import ReportView from './View';

module.exports = React.createClass ({
  getDefaultProps(){
    position: null ,
    summaryCallback: null,
    entityId: null,
    reportId: null,
    numberOfRows: null
  },
  render(){
    return (
      <ReportContainer id={this.props.reportId} refreshDate={new Date()}>
        <ReportView {...props}/>
      </ReportContainer>
      )
  }
})
