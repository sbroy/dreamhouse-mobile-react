'use strict'

import React from 'react';
import ReactNative from 'react-native';
import moment from 'moment';

const {
    Image,
    Text,
    ListView,
    View,
    Dimensions,
    InteractionManager
} = ReactNative;

import ListSplitItem from './ListItem';
import DetailListView from './DetailListView';

import styles from './styles';

import {ListContainer,RelevantItems} from 'react.force.datacontainer';
import {ChatterUserContainer} from 'react.force.datacontainer';

import {
  forceClient
} from 'react.force';

import List from './List';

// var dbDataObj = {};
// var dates;


module.exports = React.createClass({
  getInitialState(){
    return {
      dbResponse: {},
      componentData: {},
      chatterData: {},
      ind: '0',
      fontColor: '#ffffff',
      title: "",
      subtitle: "",
      dataSource: [],
    }
  },

  childContextTypes: {
      dataSource: React.PropTypes.array,
      focusKey: React.PropTypes.string
  },

  getChildContext: function(){
    return {
      dataSource: this.state.dataSource,
      focusKey: '1'
    };
  },

  getDashboardData(){
    console.log('in dashboardData');
    forceClient.dashboardData(this.props.dbId,
      (response) => {
        console.log(response);
        if(response){
          let groupings = [],
              factMap = {},
              dbDataList = [];
          if(response.componentData && response.componentData[1].reportResult){
            let componentData = response.componentData[1];

            groupings = componentData.reportResult.groupingsDown.groupings;
            factMap = componentData.reportResult.factMap;

            dbDataList = groupings.map(function(grouping, index){
              let mappedObject = Object.assign(grouping, factMap[grouping.key + '!T']);
              mappedObject.position = index+1;
              return mappedObject;
            });

            this.setState({
              dbResponse: response,
              componentData: componentData, //for now just grab the first component
              dataSource: dbDataList,
              title: componentData.reportResult.reportMetadata.name.toUpperCase(),
              subtitle: moment(componentData.reportResult.reportMetadata.standardDateFilter.startDate).format('MMM D') +
                        ' to ' + moment(componentData.reportResult.reportMetadata.standardDateFilter.endDate).format('MMM D, YYYY'),
              numOfPages: Math.ceil(dbDataList.length/10)
            });
          }

          // this.setState({
          //   dbResponse: response,
          //   componentData: response.componentData[1] //for now just grab the first component
          // });
          // var groupings = [],
          //     factMap = {},
          //     dbDataList = [];
          // if(this.props && this.state.componentData && this.state.componentData.reportResult){

          //   groupings = this.state.componentData.reportResult.groupingsDown.groupings;
          //   factMap = this.state.componentData.reportResult.factMap;

          //   dbDataList = groupings.map(function(grouping){
          //     return Object.assign(grouping, factMap[grouping.key + '!T']);
          //   });
          //   for (var i = 0; i < dbDataList.length; i++) {
          //     if (dbDataList[i] !== undefined) {
          //       dbDataObj[i] = dbDataList[i];
          //     }
          //   }
          //   dates = moment(this.state.componentData.reportResult.reportMetadata.standardDateFilter.startDate).format('MMM YYYY') +
          //               ' - ' + moment(this.state.componentData.reportResult.reportMetadata.standardDateFilter.endDate).format('MMM YYYY');
          // }
          // this.setState({
          //   dbData: dbDataObj,
          //   dates: dates
          // });
        }
      },
      (error) => {
        console.warn(error);
      })
  },

  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      this.getDashboardData();
    });
  },

  textOnChange: function (value1, value2, value3, value4) {
         this.setState({
          ind: value1,
          chatterData: value2,
          fontColor: value3,
          title: value4
        },function() {
          //console.log('CallbackOrig ' + this.state.fontColor);
          this.forceUpdate();
        });
  },

  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      this.getDashboardData();
    });
  },

  render() {
    let windowHeight = Dimensions.get('window').height;
    let windowWidth = Dimensions.get('window').width;

    let height = windowHeight; //1000
    let widthLeft = windowWidth*(1.1/2.1);
    let widthRight = windowWidth*(1/2.1);

    let titleFont = windowHeight*(57/1080);
    let headingFont = windowHeight*(25/1080);

     return (

        <Image source={{uri: 'polygonBg'}} style={[styles.backgroundImage, {flexDirection: 'column', alignItems: 'center'}]}>
          <View style={{flexDirection: 'row', alignSelf: 'flex-start', width: widthLeft, backgroundColor: 'rgba(0,0,0,0)'}}>

            <View style={{flexDirection: 'column', alignSelf: 'flex-start', marginTop: 60, height: height, width: widthLeft}}>
              <View style={{flexDirection: 'row', alignSelf: 'flex-start', height: 80, width: widthLeft}}>
                <Text style={{fontSize: 57, color:'white', fontFamily: 'SalesforceSans-Regular', paddingLeft:90, paddingRight: 350}}>{'Leaderboard'}</Text>
                <Image source={require('../../../assets/salesforceLogo.png')}/>
              </View>

              <View style={{flexDirection: 'row', alignSelf: 'flex-start', height: 80}}>
                <Text style={{fontSize: headingFont, color:'white', fontFamily: 'SalesforceSans-Regular', paddingLeft:90, paddingTop:20}}>{this.state.subtitle}</Text>
              </View>

              <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                <Text style={{fontSize: headingFont, color:'white', fontFamily: 'SalesforceSans-Regular', flex: 3, paddingLeft: 130}}>{'NAME'}</Text>
                <Text style={{fontSize: headingFont, color:'white', fontFamily: 'SalesforceSans-Regular', flex: 1, paddingRight: 30}}>{'AMOUNT'}</Text>
              </View>

              <List callback = {this.textOnChange} focusedVal = {this.state.ind} listData = {this.state.componentData} title = {this.state.title} fontColor = {this.state.fontColor} navigator={this.props.navigator} routes={this.props.routes}/>
            </View>


            <Image source={require('../../../assets/polygonBg.png')} style={[styles.backgroundImage, {flexDirection: 'column'}]}>
              <View style={{flexDirection: 'column', alignItems: 'center', height: height, width: widthRight, marginRight: 90}}>
                <DetailListView focusedVal = {this.state.ind} detailData = {this.state.componentData} chatterData = {this.state.chatterData} fontColor = {this.state.fontColor} title={this.state.title} navigator={this.props.navigator} routes={this.props.routes}/>
              </View>
            </Image>

          </View>
        </Image>
     );
  }
});
