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

import ListItem from '../ListItem';

import shallowEqual from 'shallowequal';


module.exports = React.createClass({

  getDefaultProps(){
    return {
      position: null ,
      summaryCallback: null,
      entityId: null,
      reportId: null,
      numberOfRows: null ,
    }
  },

  contextTypes: {
    reportData: React.PropTypes.object
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

    setTimeout(()=>{
      if(this.context.reportData && this.context.reportData.length !== 0){
        let groupings = this.context.reportData.groupingsDown.groupings,
          factMap = this.context.reportData.factMap,
          dataSource,
          sumOfEntities;
      //console.log("****REPORTRESPONSE: " + JSON.stringify(this.context.reportData));

        dataSource = groupings.map(function(grouping, index){
          let mappedObject = Object.assign(grouping, factMap[grouping.key + '!T']);
          mappedObject.position = grouping.key;
          return mappedObject;
        }).find(function(dataBlob){
          return dataBlob.value === this.props.entityId;
        }.bind(this));

        this.setState({
          reportApiResponse: this.context.reportData,
          detailColumnMap : this.context.reportData.reportMetadata.detailColumns,
          dataSource: this.getDataSource(dataSource.rows)
        });

        let numOfEntities = dataSource.rows.length;
        this.props.summaryCallback && this.props.summaryCallback(numOfEntities);
        
      }
    },300);

    /*console.log(this.context.reportData);
    console.log(this.context.reportData.length);
    while (this.context.reportData === undefined || this.context.reportData.length === 0 || this.context.reportData.length || undefined) {
      console.log('no reportData');
    }
    console.log(this.context.reportData);
    console.log(this.context.reportData.length);
    //if(this.context.reportData !== undefined && this.context.reportData.length !== 0 && this.context.reportData.length !== undefined) {
      console.log('in loop');*/
      
      

    // forceClient.reportData(this.props.reportId,
    //   (response)=>{
    //     if(response){
    //       let groupings = response.groupingsDown.groupings,
    //           factMap = response.factMap,
    //           dataSource,
    //           sumOfEntities;

    //       dataSource = groupings.map(function(grouping, index){
    //         let mappedObject = Object.assign(grouping, factMap[grouping.key + '!T']);
    //         mappedObject.position = grouping.key;
    //         return mappedObject;
    //       }).find(function(dataBlob){
    //         return dataBlob.value === this.props.entityId;
    //       }.bind(this));

    //       this.setState({
    //         reportApiResponse: response,
    //         detailColumnMap : response.reportMetadata.detailColumns,
    //         dataSource: this.getDataSource(this.props.numberOfRows ? dataSource.rows.slice(0, this.props.numberOfRows) : dataSource.rows)
    //       });

    //       let numOfEntities = dataSource.rows.length;
    //       this.props.summaryCallback && this.props.summaryCallback(numOfEntities);
    //     }
    //   },
    //   (error)=> {
    //     console.warn(error);
    //   }
    // );
  },


  shouldComponentUpdate(nextProps, nextState, nextContext){
     if (this.props.entityId !== nextProps.entityId){
       this.getReportData();
       return true;
     } else if (this.state.reportApiResponse !== nextState.reportApiResponse){
       return true;
     } else if (!shallowEqual(this.context.reportData, nextContext.reportData)) {
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
      <ListView contentContainerStyle={{flexDirection:'column', justifyContent: 'flex-start', alignItems: 'stretch', flexWrap: 'nowrap'}}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        />
    );
  }

})
