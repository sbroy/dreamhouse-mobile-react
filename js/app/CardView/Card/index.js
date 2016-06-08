'use strict'

import React from 'react';
import ReactNative from 'react-native';
import Accounting from 'accounting';

const {
  View,
  Text,
  TouchableOpacity,
  Image
} = ReactNative;

import Theme from 'react.force.base.theme';

import styles from './styles';

module.exports = React.createClass({
  getDefaultProps(){
    return {
    }
  },

  contextTypes: {
    chatterData: React.PropTypes.object
  },

  handlePress() {
    console.warn("clicked tile");
    if(this.props.navigator){
      this.props.navigator.push({
        name:'UserDetailView',
        id: this.props.cardData.value
      });
    }
  },

 shouldComponentUpdate(nextProps, nextState, nextContext){
    return nextContext.chatterData !== this.context.chatterData;
  },

  render() {
    var options = {
      symbol : "$",
      decimal : ".",
      thousand: ",",
      precision : 0,
      format: "%s%v"
    };

    var dealValue = Accounting.formatMoney(this.props.cardData.aggregates[0].value,options);

    return (
        <TouchableOpacity onPress={this.handlePress} style={styles.card}>
           <Theme.Tiles.List
            title={<Text style={{fontSize: 30, color: '#ffffff'}}>{this.props.cardData.label}</Text>}
            detail={<Text style={{fontSize: 25, color: '#ffffff'}}>{dealValue}</Text>}
            image={
              <Image
                  style={styles.image}
                  source={{uri: this.context.chatterData.fullEmailPhotoUrl}} />
              }
            />
        </TouchableOpacity>
    )
  }
})
