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
    Dimensions
} = ReactNative;

// import SLDS from 'design-system-react-native';

import Card from '../Card';

import {ChatterUserContainer} from 'react.force.datacontainer';


var styles = StyleSheet.create({
   list: {
    // margin:30,
    // marginLeft:80,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
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

    // dbDataList = dbDataList.slice(0,10);

    return ds.cloneWithRows(this.props.viewList);
  },

  renderRow (cardData) {
    var cardComponent;

    //add other cases here for our supported types
    switch(cardData.value.substring(0,3)){
      case '005':
        cardComponent = (<ChatterUserContainer key={cardData.value} type='user' id={cardData.value}>
          <Card cardData={cardData} type='user' navigator={this.props.navigator} route={this.props.route}/>
          </ChatterUserContainer>);
        break;


      // case '005': /**cardData={cardData}**/
      // cardComponent = (<SobjContainer key={cardData.value} type='user' id={cardData.value}>
      //   <Card cardData={cardData} navigator={this.props.navigator} route={this.props.route}/>
      // </SobjContainer>);
      // break;
    }

    return cardComponent;
  },

  render() {
    return (
      <ListView contentContainerStyle={styles.list}
          dataSource={this.getDataSource()}
          renderRow={this.renderRow} />
    )
  }
});
