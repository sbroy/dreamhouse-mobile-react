'use strict';

import React from 'react';
import ReactNative from 'react-native';


const {
  View,
  Text,
  ListView,
  TouchableOpacity
} = ReactNative;

import {forceClient} from 'react.force';

import ListItem from './ListItem';

var numDeals, dataSourceInd;
module.exports = React.createClass({

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
    console.log('in report data');
    forceClient.reportData(this.props.reportId,
      (response)=>{
        if(response){
          let groupings = response.groupingsDown.groupings,
              factMap = response.factMap,
              dataSource,
              sumOfEntities;

          console.log("****REPORTRESPONSE: " + JSON.stringify(response));
          dataSource = groupings.map(function(grouping, index){
            let mappedObject = Object.assign(grouping, factMap[grouping.key + '!T']);
            mappedObject.position = grouping.key;
            return mappedObject;
          }).find(function(dataBlob){
            return dataBlob.value === this.props.entityId;
          }.bind(this));

          for (var i = 0; i < dataSource.length; i++) {
            if (dataSource[i].value === this.props.sobjId) {
              dataSourceInd = i;
            }
          }

          this.setState({
            reportApiResponse: response,
            detailColumnMap : response.reportMetadata.detailColumns,
            dataSource: this.getDataSource(dataSource.rows)
          });

          numDeals = dataSource[dataSourceInd].rows.length;
          console.log(numDeals);
          this.props.callback(numDeals);
          // let detailDataSource = dataSource[this.props.index-1].rows;
          // detailDataSource.forEach(function(detail){
          //   debugger;
          // });

          // this.props.handleReportFacts(detailDataSource.length, detailDataSource.

        }
      },
      (error)=> {
        console.warn(error);
      }
    );
  },

  componentDidMount(){
    this.getReportData();
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
