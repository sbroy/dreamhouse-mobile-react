'use strict';

import React from 'react';
import ReactNative from 'react-native';

const {
  View,
  Text,
  TouchableHighlight
} = ReactNative;

module.exports = React.createClass({

  handleLVClick(){
    console.log('list view clicked');
    if(this.props.navigator){
      this.props.navigator.push({
        component: this.props.routes['ListSplitView'].comp,
        passProps: {
          dbId: '01Z30000001akPsEAI',
          routes: this.props.routes
        }
      })
    }
  },

  handleCVClick(){
    console.log('card view flicked');

    if(this.props.navigator){
      this.props.navigator.push({
        component: this.props.routes['CardView'].comp,
        passProps: {
          dbId: '01Z30000001akPsEAI',
          routes: this.props.routes
        }
      })
    }
  },

  render(){
    return(
      <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center', width:1920, height:1080, backgroundColor:'#687481'}}>
        <TouchableHighlight style={{flex:1, alignItems:'center', justifyContent:'center', height:1920}}  underlayColor={'rgba(64,25,146,100)'} onTVFocus={(idk)=>{console.log('focused'); return;}} onPress={this.handleLVClick}>
          <Text style={{fontSize:100, fontFamily:'SalesforceSans-Light', color:'white'}}>List View</Text>
        </TouchableHighlight>
        <TouchableHighlight style={{flex:1, alignItems:'center', justifyContent:'center',  height:1920}} underlayColor={'rgba(79,181,221,100)'}  onTVFocus={(idk)=>{console.log('focused'); return;}} onPress={this.handleCVClick}>
          <Text style={{fontSize:100, fontFamily:'SalesforceSans-Light', color:'white'}}>Card View</Text>
        </TouchableHighlight>
      </View>
    )
  }
})
