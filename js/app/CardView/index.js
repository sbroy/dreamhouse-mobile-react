'use strict'

import React from 'react';
import ReactNative from 'react-native';

const {
    Image,
    Text
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
          })
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
    // return (
    //   <Text>{JSON.stringify(this.state.componentData)}</Text>
    // )
    return (
      <Image source={require('../../../assets/polygonBg.png')} style={styles.backgroundImage}>
        <CardView componentData={this.state.componentData} navigator={this.props.navigator} route={this.props.route} />
      </Image>

    );
  }


});
