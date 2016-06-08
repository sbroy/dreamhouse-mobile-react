'use strict';

import React from 'react';
import ReactNative from 'react-native';

const {
    ListView,
    StyleSheet
} = ReactNative;

// import SLDS from 'design-system-react-native';

import DashboardListItem from '../ListItem';

var styles = StyleSheet.create({
  list: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'nowrap'
  }
});

module.exports = React.createClass({
  getDataSource (){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return ds.cloneWithRows(this.props.dbListResponse);
  },
  renderRow (rowData) {
    return (
      <DashboardListItem rowData = {rowData} navigator={this.props.navigator} route={this.props.route}/>
    );
  },

  render () {
    if(__APPLETV__) {
      return (
        <ListView contentContainerStyle={styles.list}
          dataSource={this.getDataSource()}
          renderRow={this.renderRow} />
      );
    }
  }


});

