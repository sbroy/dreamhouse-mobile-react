'use strict';

import React from 'react';
import ReactNative from 'react-native';


const {
  View,
  Text,
  ListView,
  TouchableOpacity,
  InteractionManager
} = ReactNative;

import {forceClient} from 'react.force';

import ListItem from './ListItem';

module.exports = React.createClass({

  getDefaultProps(){
    entityId: 0
  },

  contextTypes: {
    sobj: React.PropTypes.object,
  },

  getInitialState(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      reportApiResponse: {},
      dataSource: ds.cloneWithRows([])
    }
  },

  getDataSource (items) {
    return this.state.dataSource.cloneWithRows(items);
  },

  getReportData(){
    forceClient.reportData(this.props.reportId,
      (response)=>{
        if(response){
          let groupings = response.groupingsDown.groupings,
              factMap = response.factMap,
              dataSource,
              sumOfEntities;

          dataSource = groupings.map(function(grouping, index){
            let mappedObject = Object.assign(grouping, factMap[grouping.key + '!T']);
            mappedObject.position = grouping.key;
            return mappedObject;
          }).find(function(dataBlob){
            return dataBlob.value === this.props.entityId;
          }.bind(this));

          this.setState({
            reportApiResponse: response,
            detailColumnMap : response.reportMetadata.detailColumns,
            dataSource: this.getDataSource(dataSource.rows)
          });
        }
      },
      (error)=> {
        console.warn(error);
      }
    );
  },

  shouldComponentUpdate(nextProps, nextState, nextContext){
    if (this.props.entityId !== nextProps.entityId){
      this.getReportData();
      return true;
    } else if (this.state.reportApiResponse !== nextState.reportApiResponse){
      return true;
    }
    return false;
  },

  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      this.getReportData();
    });
  },

  renderRow (rowData, sectionID, rowID){
    return (
      <ListItem key={sectionID + rowID} rowData={rowData} detailColumnMap={this.state.detailColumnMap}/>
    )
  },

  render(){
    return(
      <ListView contentContainerStyle={{flexDirection:'column', justifyContent: 'flex-start', alignItems: 'stretch', flexWrap: 'nowrap', marginRight:100}}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        />
    );
  }

})
