'use strict'

import React from 'react';
import ReactNative from 'react-native';

const {
    Text,
    View,
    ListView,
    PixelRatio,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    TouchableHighlight
} = ReactNative;

// import SLDS from 'design-system-react-native';

import Card from '../Card';

import {ChatterUserContainer} from 'react.force.datacontainer';

import Theme from 'react.force.base.theme';

var styles = StyleSheet.create({
   list: {
    // margin:30,
    // marginLeft:80,
    // justifyContent: 'flex-start',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    flex: 1,
    height: 1080,
    width: 1920
  }
});

module.exports = React.createClass({
  getDataSource (){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // var groupings = [],
    //     factMap = {},
    //     dbDataList = [];
    // if(this.props && this.props.componentData && this.props.componentData.reportResult){

    //   groupings = this.props.componentData.reportResult.groupingsDown.groupings;
    //   factMap = this.props.componentData.reportResult.factMap;

    //   dbDataList = groupings.map(function(grouping){
    //     return Object.assign(grouping, factMap[grouping.key + '!T']);
    //   });
    // }
    // dbDataList = dbDataList.slice(0,11);
    // debugger;

    return ds.cloneWithRows(this.props.viewList);
  },

  renderRow (cardData) {
    var cardComponent;

    //add other cases here for our supported types
    switch(cardData.value.substring(0,3)){
      case '005':
       // cardComponent = (
       //    <Card cardData={cardData} type='user' navigator={this.props.navigator} route={this.props.route}/>
       //    );

        cardComponent = (<ChatterUserContainer  key={cardData.value} style={{height:425, width:300, margin:10}} type='user' id={cardData.value}>
          <Card cardData={cardData} type='user' navigator={this.props.navigator} route={this.props.route}/>
          </ChatterUserContainer>);
        // cardComponent =  (<TouchableHighlight underlayColor={'rgba(255,255,255,0)'} style={{height:300, width:500}} onPress={()=> {console.log('wtf')}} >
        //     <Theme.Menus.ActionListItem
        //     label={<Text style={{fontSize: 25, color: 'white'}}>{cardData.label}</Text>}
        //       iconType='standard'
        //       icon='dashboard'
        //     />
        // </TouchableHighlight>);
        break;


      // case '005': /**cardData={cardData}**/
      // cardComponent = (<SobjContainer key={cardData.value} type='user' id={cardData.value}>
      //   <Card cardData={cardData} navigator={this.props.navigator} route={this.props.route}/>
      // </SobjContainer>);
      // break;
    }

    return cardComponent;
  },

  // componentDidReceiveProps () {

  // },

  render() {
    return (
      <ListView contentContainerStyle={{flexDirection:'row', flexWrap: 'wrap', flex: 1}}
          horizontal={true}
          dataSource={this.getDataSource()}
          renderRow={this.renderRow} />
    )
  }
});
