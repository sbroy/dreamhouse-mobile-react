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
        title: this.props.title
      }
    },

    contextTypes: {
      userData: React.PropTypes.object,
      focusKey: React.PropTypes.string,
      chatterData: React.PropTypes.object,
      sobj: React.PropTypes.object
    },

    handlePress() {
      this.handleTVFocus(); //show same data as when focusing on the item
    },

    handleTVFocus() {
      var sobj;
      console.log('in handleTVFocus');
      //console.log(this.props.rowData.key);
      var newVal = this.props.rowData.key;
      var cData = this.context.chatterData;
      var fontColor = '#000000';
      if (this.context.sobj !== undefined) {
        sobj = this.context.sobj;
        console.log(sobj);
      }
      
      var title = this.context.sobj.Title;
      console.log(title);

      this.props.callback(newVal, cData, fontColor, title);
    },

    shouldComponentUpdate (nextProps,nextState,nextContext) {
      //return nextContext.userData != this.context.userData;
      return true;
    },
    
    render () {
      /*console.log('Sobj');
      console.log(this.context.sobj);*/
      var options = {
        symbol : "$",
        decimal : ".",
        thousand: ",",
        precision : 0,
        format: "%s%v",
        justifyContent: 'flex-end'
      };

      var dealValue = Accounting.formatMoney(this.props.rowData.aggregates[0].value,options);

      var rank = parseInt(this.props.rowData.key) + 1;

      var textFont = (Dimensions.get('window').height)*(31/1080);
      var amountFont = (Dimensions.get('window').height)*(29/1080);
      return (
          <TouchableHighlight style={{height: 70, marginLeft: 65, marginRight: 65}} underlayColor={'#dddddd'} onPress={this.handlePress} onTVFocus={this.handleTVFocus}>
            
            <View style={{flexDirection: 'row', marginLeft: 25, alignItems: 'center'}}>
              <Text style={{fontSize: textFont, color:'#ffffff', fontFamily: 'SalesforceSans-Regular', paddingTop: 20, paddingRight: 20}}>{rank}</Text>
              <Text style={{fontSize: textFont, color:'#ffffff', fontFamily: 'SalesforceSans-Regular', paddingTop: 20, flex: 3}}>{this.props.rowData.label}</Text>
              <Text style={{fontSize: amountFont, color:'#ffffff', fontFamily: 'SalesforceSans-Regular', paddingTop: 20, paddingRight: 25, flex: 1, textAlign: 'right'}}>{dealValue}</Text>
            </View>

          </TouchableHighlight>
            
      );
    }
});
