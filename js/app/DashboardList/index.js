'use strict';

import React from 'react';
import ReactNative from 'react-native';

const {
    View,
    Image
} = ReactNative;

import styles from './styles';

import List from './List';

import {
  forceClient
} from 'react.force';

module.exports = React.createClass({
  getInitialState(){
    return {
      dbListResponse: []
    }
  },
  getDashboardListData(){

    forceClient.dashboardList(
      (response) =>{
        if(response && response.length){
          this.setState({
            dbListResponse: response
          })
        }
      },
      (error) => {
        console.warn(error);
      }
    )
  },

  componentDidMount(){
    this.getDashboardListData();
  },

  render(){
    console.log(this.props.routes);
    return (
      <Image source={require('../../../assets/polygonBg.png')} style={{flex: 1, resizeMode: 'cover'}}>
        <List dbListResponse = {this.state.dbListResponse} navigator={this.props.navigator} routes={this.props.routes} style={styles.container}/>
      </Image>
    );
  }
})
