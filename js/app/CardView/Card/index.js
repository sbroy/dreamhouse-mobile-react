'use strict'

import React from 'react';
import ReactNative from 'react-native';
import Accounting from 'accounting';

const {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions
} = ReactNative;

import Theme from 'react.force.base.theme';

import styles from './styles';

let windowHeight = Dimensions.get('window').height,
    windowWidth = Dimensions.get('window').width;

module.exports = React.createClass({
  getDefaultProps(){
    return {
    }
  },

  getInitialState (){
    return {
      height: windowHeight * 380/1080,
      width: windowWidth * 250/1920,
      sumOfEntities: 0
    }
  },

  contextTypes: {
    chatterData: React.PropTypes.object,
    componentData: React.PropTypes.object
  },

  handlePress() {
    if(this.props.navigator){
      this.props.navigator.push({
        component: this.props.routes['DetailView'].comp,
        passProps: {
          entityId: this.props.cardData.value,
          entityType: this.props.cardType,
          position: this.props.cardData.position,
          chatterData: this.context.chatterData,
          componentData: this.context.componentData,
          sumOfEntities: this.state.sumOfEntities
        }
      })
    }
  },

  componentWillMount(){
    let options = {
      symbol : "$",
      decimal : ".",
      thousand: ",",
      precision : 0,
      format: "%s%v"
    };

    this.setState({
      sumOfEntities : Accounting.formatMoney(this.props.cardData.aggregates[0].value,options)
    });
  },

  render() {
    return (
        <TouchableOpacity onPress={this.handlePress} style={{backgroundColor: 'rgba(0, 0, 0, 0.4)', width: this.state.width, height: this.state.height, shadowColor:'#000000', shadowOpacity:0.5, shadowRadius:8, shadowOffset:{height:7, width:0}}}>
           <View style={{flex:1, flexDirection:'column', alignItems:'stretch', justifyContent: 'flex-start'}}>
            <Image style={{width: __APPLETV__ ? 250 : 42, height: __APPLETV__ ? 250 : 42, shadowOpacity: 0}}
                source={{uri: this.context.chatterData.fullEmailPhotoUrl}} />
            <View style={{flexDirection:'row', alignItems:'stretch', paddingTop: 10}}>
              <View style={{flex:1, alignItems:'flex-start', justifyContent:'center', flexDirection:'column'}}>
                <Text style={{fontSize: 25, color: '#ffffff', fontFamily: 'SalesforceSans-Light'}}> <Text style={{ fontSize:35, color:'white', fontFamily: 'SalesforceSans-Bold'}}> {this.props.cardData.position}</Text> {" " + this.props.cardData.label} </Text>
                <Text style={{fontSize: 35, color: '#ffffff', fontFamily: 'SalesforceSans-Light'}}> {this.state.sumOfEntities} </Text>
              </View>
            </View>
           </View>
        </TouchableOpacity>
    );
  }
})
