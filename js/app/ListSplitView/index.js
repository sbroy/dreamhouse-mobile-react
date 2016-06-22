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
} = ReactNative;

import ListSplitItem from './ListItem';
import DetailListView from './DetailListView';

import styles from './styles';

import {ListContainer,RelevantItems} from 'react.force.datacontainer';
import {ChatterUserContainer} from 'react.force.datacontainer';

import {
  forceClient
} from 'react.force';

var List = require('./List');

var dbDataObj = {};
var dates;


module.exports = React.createClass({
  getInitialState(){
    return {
      dbResponse: {},
      componentData: {},
      chatterData: {},
      ind: '0',
      fontColor: '#ffffff',
      title: ''
    }
  },

  childContextTypes: {
      userData: React.PropTypes.object,
      focusKey: React.PropTypes.string
  },

  getChildContext: function(){
    return { 
      userData: this.state.dbData,
      focusKey: '1'
    };
  },

  getDashboardData(){
    console.log('in dashboardData');
    forceClient.dashboardData(this.props.dbId,
      (response) => {
        console.log(response);
        if(response){
          this.setState({
            dbResponse: response,
            componentData: response.componentData[0] //for now just grab the first component
          });
          var groupings = [],
              factMap = {},
              dbDataList = [];
          if(this.props && this.state.componentData && this.state.componentData.reportResult){

            groupings = this.state.componentData.reportResult.groupingsDown.groupings;
            factMap = this.state.componentData.reportResult.factMap;

            dbDataList = groupings.map(function(grouping){
              return Object.assign(grouping, factMap[grouping.key + '!T']);
            });
            for (var i = 0; i < dbDataList.length; i++) {
              if (dbDataList[i] !== undefined) {
                dbDataObj[i] = dbDataList[i];
              }
            }
            dates = moment(this.state.componentData.reportResult.reportMetadata.standardDateFilter.startDate).format('MMM YYYY') +
                        ' - ' + moment(this.state.componentData.reportResult.reportMetadata.standardDateFilter.endDate).format('MMM YYYY');
          }
          this.setState({
            dbData: dbDataObj,
            dates: dates
          });
        }
      },
      (error) => {
        console.warn(error);
      })
  },

  componentDidMount(){
    this.getDashboardData();
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

  render() {

    var height = Dimensions.get('window').height; //1000
    var widthLeft = (Dimensions.get('window').width)*(1.1/2.1);
    var widthRight = (Dimensions.get('window').width)*(1/2.1);

    var titleFont = (Dimensions.get('window').height)*(57/1080);
    var headingFont = (Dimensions.get('window').height)*(25/1080);

     return (

        <Image source={require('../../../assets/polygonBg.png')} style={[styles.backgroundImage, {flexDirection: 'column', alignItems: 'center'}]}>
          
          <View style={{flexDirection: 'row', alignSelf: 'flex-start', width: widthLeft, backgroundColor: 'rgba(0,0,0,0)'}}>
            
            <View style={{flexDirection: 'column', alignSelf: 'flex-start', marginTop: 60, height: height, width: widthLeft}}>
              
              <View style={{flexDirection: 'row', alignSelf: 'flex-start', height: 80, width: widthLeft}}>
                <Text style={{fontSize: 57, color:'white', fontFamily: 'SalesforceSans-Regular', paddingLeft:90, paddingRight: 350}}>{'Leaderboard'}</Text>
                <Image source={require('../../../assets/salesforceLogo.png')}/>
              </View>

              <View style={{flexDirection: 'row', alignSelf: 'flex-start', height: 80}}>
                <Text style={{fontSize: headingFont, color:'white', fontFamily: 'SalesforceSans-Regular', paddingLeft:90, paddingTop:20}}>{this.state.dates}</Text>
              </View>

              <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                <Text style={{fontSize: headingFont, color:'white', fontFamily: 'SalesforceSans-Regular', flex: 3, paddingLeft: 130}}>{'NAME'}</Text>
                <Text style={{fontSize: headingFont, color:'white', fontFamily: 'SalesforceSans-Regular', flex: 1, paddingRight: 30}}>{'AMOUNT'}</Text>
              </View>

              <List callback = {this.textOnChange} focusedVal = {this.state.ind} listData = {this.state.componentData} title = {this.state.title} fontColor = {this.state.fontColor} navigator={this.props.navigator} route={this.props.route}/>
            
            </View>
          
    
            <Image source={require('../../../assets/polygonBg.png')} style={[styles.backgroundImage, {flexDirection: 'column'}]}>
              <View style={{flexDirection: 'column', alignItems: 'center', height: height, width: widthRight, marginRight: 90}}>
                <DetailListView focusedVal = {this.state.ind} detailData = {this.state.componentData} chatterData = {this.state.chatterData} fontColor = {this.state.fontColor} title={this.state.title} navigator={this.props.navigator} route={this.props.route}/>
              </View>
            </Image>

          </View>
        </Image>
     ); 
  }
});
