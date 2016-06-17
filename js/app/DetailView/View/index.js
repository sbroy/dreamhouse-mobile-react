'use strict';

import React from 'react';
import ReactNative from 'react-native';

const {
  View,
  Text,
  Image
} = ReactNative;

import {CompactLayout} from 'react.force.layout';

import ReportLView from '../../ReportListView';

module.exports = React.createClass({
  getDefaultProps(){

  },

  contextTypes: {
    sobj: React.PropTypes.object,
    compactLayout : React.PropTypes.object
  },

  shouldComponentUpdate(nextProps, nextState, nextContext){
    return nextContext.sobj !== this.context.sobj;
  },

  handleLayoutTap(layoutTapEvent){
    console.log("tapped compact layout");
  },

  render(){
//TODO : Kapil - abstract for different entities
    return(
      <Image source={require('../../../../assets/polygonBg.png')} style={{flex:1, flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start', resizeMode: 'cover', width:1920, height:1080}}>
        <View style={{flex:1, flexDirection:'row', alignItems: 'stretch', justifyContent: 'center', borderWidth:0, borderColor:'red'}}>
          <View style={{flex:1, borderWidth:0, alignItems:'center', borderColor:'blue'}}>
            {/* empty area for profile picture*/}
          </View>
          <View style={{flex:3, borderWidth:0, alignItems:'stretch', flexDirection:'row', justifyContent:'flex-end', borderColor:'green', marginLeft:-100, paddingBottom:50}}>
            <View style={{flex:1, alignItems:'flex-start', justifyContent:'flex-end'}}>
              <Text style={{fontSize:160, fontFamily:'SalesforceSans-Light', color:'#829CBA'}}>{this.props.route.index}</Text>
            </View>
            <View style={{flex:6, alignItems:'flex-start', justifyContent:'flex-end'}}>
              <Text style={{fontSize:55, fontFamily:'SalesforceSans-Regular', color:'white'}}>{this.context.sobj.Name}</Text>
              <Text style={{fontSize:30, fontFamily:'SalesforceSans-Regular', color:'white'}}>{this.context.sobj.Title}</Text>
            </View>
          </View>
        </View>

        <View style={{backgroundColor:'rgba(2,1,38,0.4)', flex:2.5,  flexDirection:'row', alignItems: 'stretch', justifyContent: 'center', borderWidth:0, borderColor:'white'}}>
          <View style={{flex:1, borderWidth:0, borderColor:'blue', alignItems:'stretch', justifyContent:'flex-start'}}>
            <Image source={{uri: this.props.route.chatterData.fullEmailPhotoUrl}} style={{alignSelf:'center', height:250, width:250, marginTop:-175}} />
            <View style={{marginTop:100, marginLeft:90}}>
              <CompactLayout onLayoutTap={this.handleLayoutTap}/>
            </View>
          </View>
          <View style={{flex:3, borderWidth:0, borderColor:'green', flexDirection:'column', alignItems:'stretch', paddingLeft:100, paddingTop:50}}>
            <Text style={{fontSize:25, fontFamily:'SalesforceSans-Regular', color:'#829CBA', paddingBottom:20}}>RECENTLY CLOSED OPPORTUNITIES</Text>
            <ReportLView reportId={this.props.route.componentData.reportResult.reportMetadata.id} index={this.props.route.index}/>
          </View>
          <View style={{flex:1, flexDirection:'column', alignItems: 'stretch', paddingTop:50}}>
            <Text style={{fontSize:25, fontFamily:'SalesforceSans-Regular', color:'#829CBA', paddingBottom:20, justifyContent:'flex-end'}}>SUMMARY</Text>
            <Text style={{fontSize:30, fontFamily:'SalesforceSans-Regular', color:'white'}}>8 opportunities closed</Text>
            <Text style={{fontSize:30, fontFamily:'SalesforceSans-Regular', color:'white'}}>$500k closed</Text>
          </View>
        </View>
      </Image>
    );
  }
})


