'use strict';

import ReactNative from 'react-native';

const {
    Dimensions,
    StyleSheet
} = ReactNative;

module.exports = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        // width: (Dimensions.get("window").width/6),
        // height: (Dimensions.get("window").height/3),
        // width: 300,
        // height: 425,
        margin: 20,
        borderRadius: 5
    },
  container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        height: __APPLETV__ ? 400 : 50,
        alignItems:'center'
    },
    row: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 12,
    },
    cellBorder: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        // Trick to get the thinest line the device can display
        height: 1 / ReactNative.PixelRatio.get(),
        marginLeft: 4,
    },
    image: {
        width: __APPLETV__ ? 300 : 42,
        height: __APPLETV__ ? 300 : 42,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        resizeMode: 'cover'
    }
});
