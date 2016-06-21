'use strict';

import React from 'react';
import ReactNative from 'react-native';

const {
    TouchableHighlight,
    Text
} = ReactNative;

import Theme from 'react.force.base.theme';

let clickedAt = null;

module.exports = React.createClass({
    getDefaultProps(){
      return {
      }
    },

    handlePress() {
      // debouncing multiple clicks
      let clickedAtNow = new Date().getTime();
      if(!clickedAt || clickedAtNow - clickedAt > 1000)
        if(this.props.navigator){
          this.props.navigator.push({
            component: this.props.routes['CardView'].comp,
            passProps: {
              dbName: this.props.rowData.name,
              dbId: this.props.rowData.id,
              label: this.props.rowData.name,
              routes: this.props.routes
            }
          });
        }
        clickedAt = new Date().getTime();
    },

    render () {
      return (
          <TouchableHighlight underlayColor={'rgba(255,255,255,0)'} onPress={this.handlePress}>
            <Theme.Menus.ActionListItem
            label={<Text style={{fontSize: 25, color: 'white'}}>{this.props.rowData.name}</Text>}
              iconType='standard'
              icon='dashboard'
            />
        </TouchableHighlight>
      );
    }
});
