'use strict'

import React from 'react';
import ReactNative from 'react-native';
import moment from 'moment';

const {
    Image,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Animated,
    ListView,
    InteractionManager,
    Dimensions
} = ReactNative;

import CardView from './View';

import styles from './styles';

import {
  forceClient
} from 'react.force';

module.exports = React.createClass({
  getInitialState(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dbResponse: {},
      componentData: {},
      fullList: [],
      dataSource: ds.cloneWithRows([]),
      title: "",
      subtitle: "",
      pageIndex: 0,
      numOfPages: 1,
      pageIndicatorAnim: new Animated.Value(0),
    }
  },

  childContextTypes: {
    dataSource: React.PropTypes.object,
    componentData: React.PropTypes.object
  },

  getChildContext() {
    return {
      dataSource: this.state.dataSource,
      componentData: this.state.componentData
    }
  },

  getDataSource (items) {
    return this.state.dataSource.cloneWithRows(items);
  },

  getDashboardData(){
    forceClient.dashboardData(this.props.dbId,
      (response) => {
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
              fullList: dbDataList,
              dataSource: this.getDataSource(dbDataList.slice(0,10)),
              title: componentData.reportResult.reportMetadata.name.toUpperCase(),
              subtitle: moment(componentData.reportResult.reportMetadata.standardDateFilter.startDate).format('MMM D') +
                        ' to ' + moment(componentData.reportResult.reportMetadata.standardDateFilter.endDate).format('MMM D, YYYY'),
              numOfPages: Math.ceil(dbDataList.length/10)
            });
          }
        }
      })
  },

  handleBack(){
    let prevPageIndex = this.state.pageIndex <= 0 ? 0 : this.state.pageIndex - 1;

    this.setState({
      dataSource: this.getDataSource(this.state.fullList.slice((10*prevPageIndex),(10*prevPageIndex)+10)),
      pageIndex: prevPageIndex
    })
  },

  handleForward(){
    let nextPageIndex = this.state.pageIndex >= this.state.numOfPages -1 ? this.state.pageIndex : this.state.pageIndex + 1;

    this.setState({
      dataSource: this.getDataSource(this.state.fullList.slice((10*nextPageIndex),(10*nextPageIndex)+10)),
      pageIndex: nextPageIndex
    });
  },

  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      this.getDashboardData();
    });
  },

  componentDidUpdate(){
    Animated.timing(
       this.state.pageIndicatorAnim,
       {toValue: (this.state.pageIndex * Math.round(1740/this.state.numOfPages))}
     ).start();
    console.log("page index: [" + this.state.pageIndex + "]");
  },
  render() {
    // Screen sized based styling for card view
    let windowHeight = Dimensions.get('window').height,
        windowWidth = Dimensions.get('window').width;

    let titleFont = 57,
        subtitleFont = 25,
        recMarginHoriz = windowWidth * (90/1920),
        recMarginVert = windowHeight * (60/1080),
        recMarginHorizPlus = windowWidth * (120/1920),
        cardMarginHoriz = windowWidth * (30/1920),
        cardMarginVert = windowHeight * (50/1080),
        pageIndicatorWidth = windowWidth - (recMarginHoriz * 2),
        pageIndicatorHeight = windowHeight * (10/1080);

    return (
      <Image source={{uri: 'polygonBg'}} style={{flexDirection: 'column', alignItems: 'center', flex: 1, resizeMode: 'cover'}}>
        <View style={{flexDirection: 'row', alignSelf: 'flex-start', marginTop: 60, width: windowWidth, backgroundColor: 'transparent'}}>
          <Text style={{fontSize: 60, color:'white', fontFamily: 'SalesforceSans-Light', paddingLeft:recMarginHorizPlus}} numberOfLines={1}>{this.state.title}</Text>
          <Text style={{fontSize: 25, color:'white', fontFamily: 'SalesforceSans-Regular', paddingLeft:20, paddingTop:35}} numberOfLines={1}>{this.state.subtitle}</Text>
          <Image source={{uri: 'salesforceLogo'}} style={{position:'absolute', right: 50, width:71, height:50}} />
        </View>
        <View style={{flexDirection: 'row', alignSelf:'center'}}>

          {(()=>{
            return (this.state.pageIndex !== 0) ?
              (
                <TouchableHighlight underlayColor={'rgba(0,0,0,0)'} style={{justifyContent:'center', width:recMarginHorizPlus}} onPress={()=>{return;}} onTVFocus={this.handleBack}>
                  <Text style={{color:'transparent', fontSize:80, fontFamily: 'SalesforceSans-Light'}}> {'<'} </Text>
                </TouchableHighlight>
              ) :
              (
                <View style={{width:recMarginHorizPlus}}/>
              )
            })()
          }

          <View style={{width:1740, height:900, alignItems: 'center'}}>
           <CardView navigator={this.props.navigator} routes={this.props.routes} />
          </View>

          {(()=>{
            return (this.state.pageIndex !== this.state.numOfPages - 1) ?
              ( <TouchableHighlight underlayColor={'transparent'} style={{justifyContent:'center', width:recMarginHorizPlus}} onPress={()=>{return;}} onTVFocus={this.handleForward}>
                  <Text style={{color:'transparent', fontSize:80, fontFamily: 'SalesforceSans-Light'}}> {'>'} </Text>
                </TouchableHighlight>
              ) :
              (
                <View style={{width:recMarginHorizPlus}}/>
              )
            })()
          }

        </View>

        <View style={{borderBottomWidth:2, borderColor: 'rgba(255,255,255,0.5)', height:pageIndicatorHeight, width: pageIndicatorWidth}}>
          <Animated.View style={{backgroundColor: 'rgba(255,255,255,0.5)', borderWidth:1, borderColor: 'transparent', height:7, marginTop:1, width:Math.round(pageIndicatorWidth/this.state.numOfPages), marginLeft: this.state.pageIndicatorAnim}}/>
        </View>
      </Image>
      );

  }


});
