'use strict'

import React from 'react';
import ReactNative from 'react-native';

const {
    Image,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity
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
      componentData: {},
      fullList: [],
      viewList: [],
      title: "Title",
      subtitle: "Subtitle"
    }
  },

  getDashboardData(){
    forceClient.dashboardData(this.props.route.dbId,
      (response) => {
        if(response){
          let groupings = [],
              factMap = {},
              dbDataList = [];
          debugger;
          if(response.componentData && response.componentData[0].reportResult){
            let componentData = response.componentData[0];

            groupings = componentData.reportResult.groupingsDown.groupings;
            factMap = componentData.reportResult.factMap;

            dbDataList = groupings.map(function(grouping){
              return Object.assign(grouping, factMap[grouping.key + '!T']);
            });

            this.setState({
              dbResponse: response,
              componentData: JSON.parse(JSON.stringify(componentData)), //for now just grab the first component
              fullList: dbDataList,
              viewList: dbDataList.slice(0,10),
              title: componentData.reportResult.reportMetadata.name.toUpperCase(),
              subtitle: componentData.reportResult.reportMetadata.standardDateFilter.startDate + ' to ' + componentData.reportResult.reportMetadata.standardDateFilter.endDate
            });
          }

          this.forceUpdate();
        }
      },
      (error) => {
        console.warn(error);
      })
  },

  handleBack(){
    console.log('back button presed');
  },

  handleForward(){
    console.log('forward button presed');
  },

  componentDidMount(){
    this.getDashboardData();
  },

  render() {
    return (
      <Image source={require('../../../assets/polygonBg.png')} style={[styles.backgroundImage, {flexDirection: 'column', alignItems: 'center'}]}>
        <View style={{flexDirection: 'row', alignSelf: 'flex-start', paddingTop: 20, height: 100}}>
          <Text style={{fontSize: 40, color:'white', fontFamily: 'SalesforceSans-Regular', paddingLeft:120}}>{this.state.title}</Text>
          <Text style={{fontSize: 30, color:'white', fontFamily: 'SalesforceSans-Regular', paddingLeft:20, paddingTop:10}}>{this.state.subtitle}</Text>
        </View>
        <View style={{flexDirection: 'row', alignSelf:'center'}}>
          {/* hidden touchable element here that handles moving to card view*/}
          <TouchableOpacity underlayColor={'rgba(255,255,255,0)'} style={{justifyContent:'center'}} onPress={this.handleBack}>
            {/*<View style={{opacity: 0, height:1, width:50}}/>*/}
            <Text style={{color:'white', fontSize:80, fontFamily: 'SalesforceSans-Regular'}}> {'<'} </Text>
          </TouchableOpacity>

          <CardView viewList={this.state.viewList} navigator={this.props.navigator} route={this.props.route} />

          <TouchableOpacity underlayColor={'rgba(255,255,255,0)'} style={{justifyContent:'center'}} onPress={this.handleForward}>
            {/*<View style={{opacity: 0, height:1, width:50}}/>*/}
            <Text style={{color:'white', fontSize:80, fontFamily: 'SalesforceSans-Regular'}}> {'>'} </Text>
          </TouchableOpacity>
        </View>
        <View style={{borderWidth:2, borderColor: 'white', borderRadius:5, height:10, width: 1800, marginBottom:20 }}>
          <View style={{backgroundColor: 'white', borderWidth:1, borderColor: 'white', borderBottomLeftRadius:3, borderTopLeftRadius:4, height:8, width:400, marginLeft: -1}}/>
        </View>
      </Image>

    );
  }


});
