'use strict';

import ReactNative from 'react-native';

module.exports = ReactNative.StyleSheet.create({
  mainContainer: {
  	flexDirection: 'row',
    justifyContent: 'space-between',
  	flexWrap: 'wrap',
  	margin: 1,
  	backgroundColor: '#0070D2',
    height: 1080,
    width: 1920
  },
  title: {
    fontSize: 20,
    color: '#ffffff',
  },
  leftPanel: {
    //width: 700,
  	flex: 2,
    height: 1080
  },
  rightPanel: {
    //width: 300,
  	flex: 1,
    height: 1080
  },
  header: {
    fontSize: 40,
    color: '#ffffff'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  }
})
