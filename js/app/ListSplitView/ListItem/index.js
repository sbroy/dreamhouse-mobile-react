 'use strict';

import React from 'react';
import ReactNative from 'react-native';

const {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    PixelRatio,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions
} = ReactNative;


import Theme from 'react.force.base.theme';
import {ChatterUserContainer} from 'react.force.datacontainer';
import {utils} from 'react.force.data';
import ListSplitView from '../../ListSplitView/';
import Accounting from 'accounting';
import DetailListView from '../DetailListView';

var styles = StyleSheet.create({
   list: {
    margin:20,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});

module.exports = React.createClass({

    getInitialState(){
      return {
        ind: this.props.focusedVal,
        fontColor: this.props.focusedVal,
        title: this.props.title,
        isFocused: false
      }
    },

    contextTypes: {
      // userData: React.PropTypes.object,
      focusKey: React.PropTypes.string,
      chatterData: React.PropTypes.object,
      sobj: React.PropTypes.object
    },

    //nav to DetailView on press
    handlePress() {
      let rank = parseInt(this.props.rowData.key) + 1;
      console.log(this.props.listData);

      if(this.props.navigator){
        this.props.navigator.push({
          component: this.props.routes['DetailView'].comp,
          passProps: {
            entityId: this.props.rowData.value,
            entityType: 'user',
            index: rank, //this.props.cardData.position
            chatterData: this.context.chatterData,
            componentData: this.props.listData,
            sumOfEntities: this.state.dealValue
          }
        })
      }
    },

    handleTVFocus() {
      this.setState({
        isFocused : true
      })

      this.doFocusCallback();
    },

    handleTVBlur() {
      this.setState({
        isFocused :false
      })
    },

    doFocusCallback(){
      let newVal = this.props.rowData.key;
      let cData = this.context.chatterData;
      let fontColor = '#000000';
      if (this.context.sobj !== undefined) {
        let sobj = this.context.sobj;
        console.log(sobj);
        let title = this.context.sobj.Title;
        console.log(title);

        this.props.callback(newVal, cData, fontColor, title);
      }
    },

    componentWillMount(){
       let options = {
        symbol : "$",
        decimal : ".",
        thousand: ",",
        precision : 0,
        format: "%s%v",
        justifyContent: 'flex-end'
      };

      let dealValue = Accounting.formatMoney(this.props.rowData.aggregates[0].value,options);

      this.setState({
        dealValue: dealValue
      })
    },

    shouldComponentUpdate (nextProps,nextState,nextContext) {
      //return nextContext.userData != this.context.userData;
      return true;
    },

    componentDidUpdate(){
      let newVal = this.props.rowData.key;
      if(newVal == 0 && this.state.isFocused === true){
        this.doFocusCallback();
      }
    },

    render () {
      /*console.log('Sobj');
      console.log(this.context.sobj);*/


      let rank = parseInt(this.props.rowData.key) + 1;

      let textFont = (Dimensions.get('window').height)*(31/1080);
      let amountFont = (Dimensions.get('window').height)*(29/1080);
      return (
          <TouchableHighlight style={{height: 70, marginLeft: 65, marginRight: 65, backgroundColor:this.state.isFocused ? 'white' : 'transparent'}} onPress={this.handlePress} onTVFocus={this.handleTVFocus} onTVBlur={this.handleTVBlur} disableParallax={true}>

            <View style={{flexDirection: 'row', marginLeft: 25, alignItems: 'center'}}>
              <Text style={{fontSize: textFont, color:this.state.isFocused ? 'black' : 'white', fontFamily: 'SalesforceSans-Regular', paddingTop: 20, paddingRight: 20}}>{rank}</Text>
              <Text style={{fontSize: textFont, color:this.state.isFocused ? 'black' : 'white', fontFamily: 'SalesforceSans-Regular', paddingTop: 20, flex: 3}}>{this.props.rowData.label}</Text>
              <Text style={{fontSize: amountFont, color:this.state.isFocused ? 'black' : 'white', fontFamily: 'SalesforceSans-Regular', paddingTop: 20, paddingRight: 25, flex: 1, textAlign: 'right'}}>{this.state.dealValue}</Text>
            </View>

          </TouchableHighlight>

      );
    }
});
