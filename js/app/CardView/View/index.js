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

var styles = StyleSheet.create({
   list: {
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
    switch(cardData.value.substring(0,3)){
      case '005':
        cardComponent = (
          <ChatterUserContainer  key={cardData.key} style={{height:425, width:300, margin:10}} type='user' id={cardData.value}>
            <Card cardData={cardData} cardType={'user'} navigator={this.props.navigator} routes={this.props.routes}/>
          </ChatterUserContainer>
          );
        break;
    }

    return cardComponent;
  },

  render() {
    return (
      <ListView contentContainerStyle={{flexDirection:'row', flexWrap: 'wrap', flex: 1, marginLeft:80, marginTop:30}}
          horizontal={true}
          dataSource={this.context.dataSource}
          renderRow={this.renderRow} />
    )
  }
});
