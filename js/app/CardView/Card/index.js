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

  getInitialState : function(){
    return {
      height: 360,
      width: 260,
      borderOpacity: 0
    }
  },

  contextTypes: {
    chatterData: React.PropTypes.object,
    componentData: React.PropTypes.object
  },

  handlePress() {
    if(this.props.navigator){
      this.props.navigator.push({
        name:'DetailView',
        entityId: this.props.cardData.value,
        entityType: this.props.cardType,
        index: this.props.cardData.position,
        chatterData: this.context.chatterData,
        componentData: this.context.componentData
      })
    }
  },

 shouldComponentUpdate(nextProps, nextState, nextContext){
    return true;
    // return nextContext.chatterData !== this.context.chatterData ||
    // this.state.borderOpacity !== nextState.borderOpacity;
  },

  handleTVFocus(){
    console.log("card#" + this.props.cardData.position + " focused");

    this.setState({
      borderOpacity: 1
    });
  },

  handleTVBlur(){
    console.log("card#" + this.props.cardData.position + " blurred");

    this.setState({
      borderOpacity: 0
    })
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

        <TouchableOpacity onPress={this.handlePress} onTVFocus = {this.handleTVFocus} onTVBlur = {this.handleTVBlur} style={{backgroundColor: 'rgba(0, 0, 0, 0.4)', width: this.state.width, height: this.state.height, borderWidth:1, borderColor:'rgba(255,255,255,' + this.state.borderOpacity + ')', shadowColor:'#000000', shadowOpacity:0.5, shadowRadius:8, shadowOffset:{height:7, width:0}}}>
           <Theme.Tiles.List
            title={<Text style={{fontSize: 25, color: '#ffffff', fontFamily: 'SalesforceSans-Light'}}>{this.props.cardData.label}</Text>}
            detail={<Text style={{fontSize: 40, color: '#ffffff', fontFamily: 'SalesforceSans-Light'}}>{dealValue}</Text>}
            image={
              <Image
                style={{width: __APPLETV__ ? 258 : 42, height: __APPLETV__ ? 225 : 42}}
                source={{uri: this.context.chatterData.fullEmailPhotoUrl}}
                >
                <View style={{position:'absolute', left: 10, width:50, height:70, backgroundColor:'rgba(59,173,193,0.8)', flex: 1, flexDirection:'column', alignItems:'center', justifyContent:'center'}}><Text style={{ fontSize:35, color:'white', fontFamily: 'SalesforceSans-Bold', textAlign:'justify', marginLeft:-5}}> {this.props.cardData.position}</Text></View>
                </Image>}
            />
        </TouchableOpacity>
    );
  }
})
