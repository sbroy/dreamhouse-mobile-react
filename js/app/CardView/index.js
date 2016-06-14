'use strict'

import React from 'react';
import ReactNative from 'react-native';

const {
    Image,
    Text,
    View
} = ReactNative;

import CardView from './View';

import styles from './styles';

import {
  forceClient
} from 'react.force';

module.exports = React.createClass({
  getInitialState(){
    return {
      dbResponse: {},
      componentData: {}
    }
  },

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

  render() {
    return (
      <Image source={require('../../../assets/polygonBg.png')} style={[styles.backgroundImage, {flexDirection: 'column'}]}>
        <View style={{flexDirection: 'row', alignItems: 'flex-start', paddingTop: 20}}>
          <Text style={{fontSize: 40, color:'white', fontFamily: 'SalesforceSans-Regular', paddingLeft:100}}>LEADERBOARD</Text>
          <Text style={{fontSize: 30, color:'white', fontFamily: 'SalesforceSans-Regular', paddingLeft:20, paddingTop:10}}>Subtitle</Text>
        </View>
        <CardView componentData={this.state.componentData} navigator={this.props.navigator} route={this.props.route} />
      </Image>

    );
  }


});
