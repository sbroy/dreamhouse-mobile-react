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
    InteractionManager
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
      viewList: [],
      dataSource: ds.cloneWithRows([]),
      title: "Title",
      subtitle: "Subtitle",
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
              componentData: JSON.parse(JSON.stringify(componentData)), //for now just grab the first component
              fullList: dbDataList,
              viewList: dbDataList.slice(0,10),
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
    console.log('handle back');
    let prevPageIndex = this.state.pageIndex <= 0 ? 0 : this.state.pageIndex - 1;

    this.setState({
      dataSource: this.getDataSource(this.state.fullList.slice((10*prevPageIndex),(10*prevPageIndex)+10)),
      pageIndex: prevPageIndex
    })
  },

  handleForward(){
    console.log('handle forward');

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
    return (
      <Image source={require('../../../assets/polygonBg.png')} style={{flexDirection: 'column', alignItems: 'center', flex: 1, resizeMode: 'cover'}}>
        <View style={{flexDirection: 'row', alignSelf: 'flex-start', paddingTop: 20, height: 100, width: 1920, backgroundColor: 'rgba(0,0,0,0)'}}>
          <Text style={{fontSize: 60, color:'white', fontFamily: 'SalesforceSans-Light', paddingLeft:80}}>{this.state.title}</Text>
          <Text style={{fontSize: 25, color:'white', fontFamily: 'SalesforceSans-Regular', paddingLeft:20, paddingTop:35}}>{this.state.subtitle}</Text>
          <Image style={{position:'absolute', top:50, right: 50}} source={require('../../../assets/salesforceLogo.png')}/>
        </View>
        <View style={{flexDirection: 'row', alignSelf:'center', marginBottom:30}}>
          {/* hidden touchable element here that handles moving to card view*/}
          <TouchableHighlight underlayColor={'rgba(0,0,0,0)'} style={{justifyContent:'center', width:90}} onPress={()=>{return;}} onTVFocus={this.handleBack}>
            <Text style={{color:'rgba(0,0,0,0)', fontSize:80, fontFamily: 'SalesforceSans-Light'}}> {'<'} </Text>
          </TouchableHighlight>

          <View style={{width:1740, height:900, alignItems: 'center' }}>
           <CardView navigator={this.props.navigator} routes={this.props.routes} />
          </View>

          <TouchableHighlight underlayColor={'rgba(0,0,0,0)'} style={{justifyContent:'center', width:90}} onPress={()=>{return;}} onTVFocus={this.handleForward}>
            <Text style={{color:'rgba(0,0,0,0)', fontSize:80, fontFamily: 'SalesforceSans-Light'}}> {'>'} </Text>
          </TouchableHighlight>
        </View>

        <View style={{borderBottomWidth:2, borderColor: 'rgba(255,255,255,0.5)', height:10, width: 1740 }}>
          <Animated.View style={{backgroundColor: 'rgba(255,255,255,0.5)', borderWidth:1, borderColor: 'rgba(255,255,255,0)', height:7, marginTop:1, width:Math.round(1740/this.state.numOfPages), marginLeft: this.state.pageIndicatorAnim}}/>
        </View>
      </Image>
      );

  }


});
