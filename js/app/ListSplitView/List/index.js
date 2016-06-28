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
      chatterData: {},
      title: this.props.title
    }
  },

    contextTypes: {
      dataSource: React.PropTypes.array,
      focusKey: React.PropTypes.string
    },

    getDataSource (){
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      // var groupings = [],
      //   factMap = {},
      //   dbDataList = [];
      // if(this.props && this.props.listData && this.props.listData.reportResult){

      //   groupings = this.props.listData.reportResult.groupingsDown.groupings;
      //   factMap = this.props.listData.reportResult.factMap;

      //   dbDataList = groupings.map(function(grouping){
      //     return Object.assign(grouping, factMap[grouping.key + '!T']);
      //   });
      // }
      return ds.cloneWithRows(this.context.dataSource);
    },

    textOnChange: function (ind, chatterData, title) {
         this.setState({
          ind: ind,
          chatterData: chatterData,
          title: title
        }, function() {
          this.props.callback(this.state.ind, this.state.chatterData, this.state.title);

        })

    },

    renderRow (rowData) {
      var detailComponent;
      switch(rowData.value.substring(0,3)){
        case '005':
          detailComponent = (
            <SobjContainer key={rowData.value} type={'user'} id={rowData.value}>
              <ChatterUserContainer key={rowData.value} type='user' id={rowData.value}>
                <ListSplitItem callback = {this.textOnChange} focusedVal = {this.state.ind} listData = {this.props.listData} rowData = {rowData} navigator={this.props.navigator} routes={this.props.routes}/>
              </ChatterUserContainer>
            </SobjContainer>);

          break;
      }
      return detailComponent;
    },

    render () {
     if(__APPLETV__) {
      return (
        <ListView
          dataSource={this.getDataSource()}
          renderRow={this.renderRow} />
      );
     }
    }
});
