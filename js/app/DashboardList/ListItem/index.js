'use strict';

import React from 'react';
import ReactNative from 'react-native';

const {
    TouchableHighlight,
    Text
} = ReactNative;

// import SLDS from 'design-system-react-native';

import Theme from 'react.force.base.theme';


module.exports = React.createClass({
    getDefaultProps(){
      return {
      }
    },

    handlePress() {
      // console.warn('listitem clicked' + JSON.stringify(this.props.navigator));
      if(this.props.navigator){
        this.props.navigator.push({
          name:'CardView',
          dbName: this.props.rowData.name,
          dbId: this.props.rowData.id,
          label: this.props.rowData.name
        });
      }
    },

    render () {
      return (
          <TouchableHighlight underlayColor={'#dddddd'} onPress={this.handlePress}>
            <Theme.Menus.ActionListItem
            label={<Text style={{fontSize: 25}}>{this.props.rowData.name}</Text>}
              iconType='standard'
              icon='dashboard'
            />
        </TouchableHighlight>
      );
    }
});
