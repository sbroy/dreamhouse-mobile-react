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

import Card from '../Card';

import {ChatterUserContainer} from 'react.force.datacontainer';

import Theme from 'react.force.base.theme';

let windowHeight = Dimensions.get('window').height,
    windowWidth = Dimensions.get('window').width;

module.exports = React.createClass({

  contextTypes: {
    dataSource: React.PropTypes.object
  },
  renderRow (cardData) {
    var cardComponent;

    let cardContHeight = Math.ceil(windowHeight * 430/1080),
        cardContWidth  = Math.ceil(windowWidth * 340/1920);

    //add other cases here for our supported types
    switch(cardData.value.substring(0,3)){
      case '005':
        cardComponent = (
          <ChatterUserContainer  key={cardData.key} style={{height:cardContHeight, width:cardContWidth}} type='user' id={cardData.value}>
            <Card cardData={cardData} cardType={'user'} navigator={this.props.navigator} routes={this.props.routes}/>
          </ChatterUserContainer>
          );
        break;
    }

    return cardComponent;
  },

  render() {
    let lVMarginLeft = Math.ceil(windowWidth * 90/1920),
        lVMarginTop = Math.ceil(windowHeight * 30/1080);

    return (
      <ListView contentContainerStyle={{flexDirection:'row', flexWrap: 'wrap', flex: 1, marginLeft:20, marginTop:30}}
          horizontal={true}
          dataSource={this.context.dataSource}
          renderRow={this.renderRow} />
    )
  }
});
