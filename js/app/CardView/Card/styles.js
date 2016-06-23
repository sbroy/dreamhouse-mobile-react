'use strict';

import ReactNative from 'react-native';

const {
    Dimensions,
    StyleSheet
} = ReactNative;

module.exports = StyleSheet.create({
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
        width: __APPLETV__ ? 298 : 42,
        height: __APPLETV__ ? 300 : 42,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        resizeMode: 'cover'
    }
});
