'use strict'

import React from 'react';
import ReactNative from 'react-native';
import Accounting from 'accounting';

const {
  View,
  Text,
  TouchableOpacity,
  Dimensions
} = ReactNative;

import Theme from 'react.force.base.theme';

let windowHeight = (Dimensions.get('window').height),
    windowWidth = (Dimensions.get('window').width);

module.exports = React.createClass({
  getDetails(){
    let details = {}
    this.props.detailColumnMap.forEach(function(detail, index){
      details[detail] = this.props.rowData.dataCells[index];
    }.bind(this));
    return details;
  },

  render(){

    let details = this.getDetails();
     /*<Theme.Menus.ActionListItem
            label={<Text style={{fontSize: 25, color: 'white'}}>{details["OPPORTUNITY_NAME"].label}</Text>}
              iconType='standard'
              icon='dashboard'
        />*/

    let textFont = windowHeight*(31/1080);
    let amountFont = windowHeight*(29/1080);

    let options = {
        symbol : "$",
        decimal : ".",
        thousand: ",",
        precision : 0,
        format: "%s%v",
        justifyContent: 'flex-end'
      };

    let dealValue = Accounting.formatMoney(details["AMOUNT"].label,options);

    console.log(details);
    console.log(details["OPPORTUNITY_NAME"].label);

    return(
      <View style={{flexDirection: 'row', alignItems: 'stretch', flex:1}}>
        <Text style={{fontSize: textFont, color:'#ffffff', fontFamily: 'SalesforceSans-Regular', paddingTop: 20, flex: 2}}>{details["OPPORTUNITY_NAME"].label}</Text>
        <Text style={{fontSize: amountFont, color:'#ffffff', fontFamily: 'SalesforceSans-Regular', paddingTop: 20, flex: 1, textAlign: 'right'}}>{dealValue}</Text>
      </View>
    )
  }
});
