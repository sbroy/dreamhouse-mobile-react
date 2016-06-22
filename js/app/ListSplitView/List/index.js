'use strict';

import React from 'react';
import ReactNative from 'react-native';

const {
    Text,
    View,
    ListView,
    PixelRatio,
    StyleSheet,
    TouchableOpacity
} = ReactNative;

import {ChatterUserContainer} from 'react.force.datacontainer';
import {SobjContainer} from 'react.force.datacontainer';


import ListSplitItem from '../ListItem';


module.exports = React.createClass({

    getInitialState(){
    return {
      ind: this.props.focusedVal,
      fontColor: this.props.fontColor,
      chatterData: {},
      title: this.props.title
    }
  },

    contextTypes: {
      userData: React.PropTypes.object,
      focusKey: React.PropTypes.string
    },


    getDataSource (){

      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      var groupings = [],
        factMap = {},
        dbDataList = [];
      if(this.props && this.props.listData && this.props.listData.reportResult){

        groupings = this.props.listData.reportResult.groupingsDown.groupings;
        factMap = this.props.listData.reportResult.factMap;

        dbDataList = groupings.map(function(grouping){
          return Object.assign(grouping, factMap[grouping.key + '!T']);
        });
      }
      return ds.cloneWithRows(dbDataList);
    },

    textOnChange: function (value1, value2, value3, value4) {
         this.setState({
          ind: value1,
          chatterData: value2,
          fontColor: value3,
          title: value4
        }, function() {
          //console.log(this.state.ind);
          this.props.callback(this.state.ind, this.state.chatterData, this.state.fontColor, this.state.title);

        })
         
    },


    //<Detail focusedVal = {this.props.focusedVal} rowData={rowData} jsonData = {dbDataObj} type='user' navigator={this.props.navigator} route={this.props.route}/>
    renderRow (rowData) {
      console.log(rowData.value.substring(0,3));
      var detailComponent;
      switch(rowData.value.substring(0,3)){
        case '005':
          detailComponent = (
            <SobjContainer key={rowData.value} type={'user'} id={rowData.value}>
              <ChatterUserContainer key={rowData.value} type='user' id={rowData.value}>
                <ListSplitItem callback = {this.textOnChange} focusedVal = {this.state.ind} fontColor = {this.state.fontColor} rowData = {rowData} navigator={this.props.navigator} route={this.props.route}/>
              </ChatterUserContainer>
            </SobjContainer>);
          
          break;
      }
      return detailComponent;
      
        
    },

    render () {
      //console.log('ListIndex ' + this.state.ind);
     //console.log(this.context.userData);
     console.log(this.state.fontColor);
     if(__APPLETV__) {
      return (
        <ListView 
          dataSource={this.getDataSource()}
          renderRow={this.renderRow} />
      );
     }
    }
});
