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
    TouchableHighlight,
    ScrollView
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

let x = 1;

module.exports = React.createClass({

  contextTypes: {
    dataSource: React.PropTypes.object
  },
  renderRow (cardData) {
    var cardComponent;

    console.log((x++) + "/" + JSON.stringify(cardData));

    //add other cases here for our supported types
    debugger;
    switch(cardData.value.substring(0,3)){
      case '005':
        cardComponent = (
          <ChatterUserContainer  key={cardData.key} style={{height:425, width:300, margin:10}} type='user' id={cardData.value}>
            <Card cardData={cardData} cardType={'user'} navigator={this.props.navigator} route={this.props.route}/>
          </ChatterUserContainer>
          );
        break;
    }

    return cardComponent;
  },

  render() {
    return (
      <ListView contentContainerStyle={{flexDirection:'row', flexWrap: 'wrap', flex: 1, height:870, width:1660}}
          horizontal={true}
          dataSource={this.context.dataSource}
          renderRow={this.renderRow} />
    )
  }
});
