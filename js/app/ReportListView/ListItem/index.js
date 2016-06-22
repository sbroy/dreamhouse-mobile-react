'use strict'

import React from 'react';
import ReactNative from 'react-native';
import Accounting from 'accounting';

const {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight
} = ReactNative;

import Theme from 'react.force.base.theme';

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

    var options = {
        symbol : "$",
        decimal : ".",
        thousand: ",",
        precision : 0,
        format: "%s%v",
        justifyContent: 'flex-end'
    };

    var dealValue = Accounting.formatMoney(details["AMOUNT"].label,options);
    
    return(
        {/*<Theme.Menus.ActionListItem
            label={<Text style={{fontSize: 25, color: 'white'}}>{details["OPPORTUNITY_NAME"].label}</Text>}
              iconType='standard'
              icon='dashboard'
        />*/}

        <View style={{flexDirection: 'row', paddingBottom: 20}}>
          <Text style={{fontSize: 30, color:'#ffffff', fontFamily: 'SalesforceSans-Regular', flex: 2.5}}>{details["OPPORTUNITY_NAME"].label}</Text>
          <Text style={{fontSize: 30, color:'#ffffff', fontFamily: 'SalesforceSans-Regular', flex: 1, textAlign: 'right'}}>{dealValue}</Text>
      </View>
        
    )
  }
});
