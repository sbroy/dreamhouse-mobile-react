'use strict';

import ReactNative from 'react-native';

module.exports = ReactNative.StyleSheet.create({
  container: {
    flex: 1,
    margin:1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  }
});
