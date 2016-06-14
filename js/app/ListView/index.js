'use strict'

import React from 'react';
import ReactNative from 'react-native';

const {
  ListView,
  View,
  Text,
  Image
} = ReactNative;

import {
  forceClient
} from 'react.force';

module.exports = React.createClass({
  getDashboardData(){
    forceClient.dashboardData(this.props.route.dbId,
      (response) => {
        if(response){
          this.setState({
            dbResponse: response,
            componentData: response.componentData[0] //for now just grab the first component
          });
          this.forceUpdate();
        }
      },
      (error) => {
        console.warn(error);
      })
  },

  componentDidMount(){
    this.getDashboardData();
  },

  render(){
    <View style={{flexDirection:'row', flex:'1'}}>
      <View style={{flexDirection:'column', alignItems: 'flex-start'}}>
        <Text> Leaderboard </Text>
        <Text> Subtitile </Text>
        <Text> List View </Text>
      </View>
      <View style={{flexDirection:'column'}}>
        <View>
          <Text> Picture/Rank/Account Info </Text>
        </View>
        <View>
          <Text> Compact layout stuff </Text>
        </View>
        <View>
          <Text> recently closed opptys </Text>
        </View>
      </View>

    </View>

  }
})
