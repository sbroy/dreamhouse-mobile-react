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
      height: 425,
      width: 300,
      borderOpacity: 0
    }
  },

  contextTypes: {
    chatterData: React.PropTypes.object
  },

  handlePress() {
    if(this.props.navigator){
      this.props.navigator.push({
        name:'UserDetailView',
        id: this.props.cardData.value
      })
    }
  },

 // shouldComponentUpdate(nextProps, nextState, nextContext){
 //    return nextContext.chatterData !== this.context.chatterData;
 //  },

  componentWillReceiveProps: function(nextProps) {
    this.forceUpdate();
  },

  handleTVFocus(){
    console.log("card focused");

    this.setState({
      borderOpacity: 1
    })

    // TODO: Kapil - trying to change card height/width on selection
    // this.setState({
    //   height: 450,
    //   width: 320
    // });

  },

  handleTVBlur(){
    console.log("card blurred");

    this.setState({
      borderOpacity: 0
    })
    // TODO: Kapil - trying to change card height/width on selection
    // this.setState({
    //   height: 425,
    //   width: 300
    // });
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
        <TouchableOpacity onPress={this.handlePress} onTVFocus = {this.handleTVFocus} onTVBlur = {this.handleTVBlur} style={[styles.card, {width: this.state.width, height: this.state.height, borderWidth:1, borderColor:'white', borderColor:'rgba(255,255,255,' + this.state.borderOpacity + ')'}]}>
           <Theme.Tiles.List
            title={<Text style={{fontSize: 25, color: '#ffffff'}}>{this.props.cardData.label}</Text>}
            detail={<Text style={{fontSize: 30, color: '#ffffff'}}>{dealValue}</Text>}
            image={
              <Image
                style={{borderRadius: 10,  width: __APPLETV__ ? 297 : 42, height: __APPLETV__ ? 300 : 42}}
                source={{uri: this.context.chatterData.fullEmailPhotoUrl}} />}
            />
        </TouchableOpacity>
    )
  }
})
