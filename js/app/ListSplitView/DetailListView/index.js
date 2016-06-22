'use strict';

import React from 'react';
import ReactNative from 'react-native';
import Accounting from 'accounting';

const {
    Text,
    View,
    Image,
    ListView,
    PixelRatio,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions
} = ReactNative;

import {SobjContainer} from 'react.force.datacontainer';
import {ChatterUserContainer} from 'react.force.datacontainer';
import ReportLView from '../../ReportListView';

var dbDataList = [];

var styles = StyleSheet.create({
  list: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  name: {
    fontSize: 25,
    color: '#ffffff'
  },
  title: {
    fontSize: 25
  },
  image: {
        alignItems: 'center', 
        width: __APPLETV__ ? 250 : 42,
        height: __APPLETV__ ? 250 : 42,
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
  }

});

module.exports = React.createClass({

  getInitialState(){
    return {
      ind: this.props.focusedVal,
      title: this.props.title,
      dealsClosed: 0
    }
  },

    contextTypes: {
      userData: React.PropTypes.object,
      focusKey: React.PropTypes.string,
      chatterData: React.PropTypes.object
    },

    /*componentDidUpdate() {
      console.log("focuskey: [" + this.context.focusKey + "]");
      console.log("Statefocuskey: [" + this.state.focusKey + "]");
    },*/

    getDealsClosed: function (value) {
         this.setState({
          dealsClosed: value
        },function() {
          this.forceUpdate();
        });
    },

    render () {
      /*console.log(this.props.title);
      console.log(this.state.title);*/

      var options = {
        symbol : "$",
        decimal : ".",
        thousand: ",",
        precision : 0,
        format: "%s%v",
        justifyContent: 'flex-end'
      };

     //console.log(this.context.userData);
     //console.log(this.context.focusKey);
     //console.log(this.state.focusKey);
     //console.log(this.props.route.entityId);
     //console.log(this.state.focusKey);
     //console.log(this.props.detailData);

     console.log(this.props.title);
     var rankFont = (Dimensions.get('window').height)*(150/1080);
     var nameFont = (Dimensions.get('window').height)*(60/1080);
     var headingFont = (Dimensions.get('window').height)*(25/1080);
     var titleFont = (Dimensions.get('window').height)*(57/1080);
     var headingFont = (Dimensions.get('window').height)*(25/1080);

     if(__APPLETV__) {
      if (this.context.userData !== undefined && this.props.detailData !== null) {
        console.log(this.props.detailData.reportResult.groupingsDown.groupings[this.props.focusedVal].value);
        var name = this.context.userData[this.props.focusedVal].label;
        var rank = parseInt(this.context.userData[this.props.focusedVal].key) + 1;
        var dealAmount = Accounting.formatMoney(this.context.userData[this.props.focusedVal].aggregates[0].value,options);
        return (
          <View style={{flexDirection: 'column', height: 900, marginTop: 60}}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: rankFont, color:'#ffffff', fontFamily: 'SalesforceSans-Regular', flex: 1}}>{rank}</Text>
              </View>
              <View style={{flex: 1.75, alignItems: 'flex-start', marginTop: 60}}>
                <Image
                          style={styles.image}
                          source={{uri: this.props.chatterData.fullEmailPhotoUrl}} />
              </View>
            </View>
            
            <View style={{alignItems: 'center'}}>    
                <Text style={{fontSize: nameFont, alignItems: 'center', color:'white', fontFamily: 'SalesforceSans-Regular', paddingTop: 20}}>{name}</Text>
                <Text style={{fontSize: headingFont, alignItems: 'center', color:'white', fontFamily: 'SalesforceSans-Regular'}}>{this.props.title}</Text>
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 90, paddingRight: 90, paddingTop: 100}}>
              <View style={{alignItems: 'center', flex: 1}}>
                <Text style={{fontSize: headingFont, color:'white', fontFamily: 'SalesforceSans-Regular'}}>{'DEALS CLOSED'}</Text>
              </View>
              <View style={{alignItems: 'center', flex: 1}}>
                <Text style={{fontSize: headingFont, color:'white', fontFamily: 'SalesforceSans-Regular'}}>{'AMOUNT CLOSED'}</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', paddingLeft: 250, alignItems: 'center'}}>
              <Text style={{fontSize: titleFont, color:'white', fontFamily: 'SalesforceSans-Regular', paddingRight: 150}}>{this.state.dealsClosed}</Text>
              <Text style={{fontSize: titleFont, color:'white', fontFamily: 'SalesforceSans-Regular', paddingRight: 90}}>{dealAmount}</Text>
            </View>

            <View style={{flexDirection: 'column', paddingLeft: 50, paddingTop: 50}}>
              <Text style={{fontSize: headingFont, color:'white', fontFamily: 'SalesforceSans-Regular', alignItems: 'center', flex: 1}}>{'RECENTLY CLOSED OPPORTUNITIES'}</Text>
              
            </View>
          </View>
        );
      }
      else {
        return (
          <View>
            <Text>{'blank page'}</Text>
         </View>
        );
      }
     }
    }
});

