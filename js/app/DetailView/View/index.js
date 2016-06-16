'use strict';

import React from 'react';
import ReactNative from 'react-native';

const {
  View
} = ReactNative;


module.exports = React.createClass({
  getDefaultProps(){

  },

  contextType: {
    sobj: React.PropTypes.object
  },

  render(){

    // {<View style={{flexDirection:'column'}}>
    //     <View style={{flexDirection:'column', alignItems: 'center'}}>
    //     </View>
    //     <View> style={{flexDirection:'row', alignItems:'flex-start'}}>
    //       <View>
    //       </View>
    //       <View>
    //       </View>
    //     </View>
    //   </View>}
    return(
      <Text>{JSON.stringify(this.context.sobj)}</Text>

    );
  }
})


