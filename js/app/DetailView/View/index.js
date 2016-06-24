'use strict';

import React from 'react';
import ReactNative from 'react-native';

const {
  View,
  Text,
  Image,
  Dimensions
} = ReactNative;

import {CompactLayout} from 'react.force.layout';

import ReportLView from '../../ReportListView';

let windowHeight = Dimensions.get('window').height,
    windowWidth = Dimensions.get('window').width;

module.exports = React.createClass({

  getInitialState(){
    return{
      numOfEntities: 0
    }
  },

  contextTypes: {
    sobj: React.PropTypes.object,
    compactLayout : React.PropTypes.object
  },

  shouldComponentUpdate(nextProps, nextState, nextContext){
    return nextContext.sobj !== this.context.sobj || nextState.numOfEntities !== this.state.numOfEntities;
  },

  handleLayoutTap(layoutTapEvent){
    console.log("tapped compact layout");
  },

  summaryCallback(numOfEntities){
    this.setState({
      numOfEntities: numOfEntities
    })
  },

  render(){
    //TODO : Kapil - abstract for different entities
    return(
      <Image source={{uri: 'polygonBg'}} style={{flex:1, flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start', resizeMode: 'cover', width:windowWidth, height:windowHeight}}>
        <View style={{flex:1, flexDirection:'row', alignItems: 'stretch', justifyContent: 'center', borderWidth:0, borderColor:'red'}}>
          <View style={{flex:1, borderWidth:0, alignItems:'center', borderColor:'blue'}}>
            {/* empty area for profile picture*/}
          </View>
          <View style={{flex:3, borderWidth:0, alignItems:'stretch', flexDirection:'row', justifyContent:'flex-end', borderColor:'green', paddingLeft:100, paddingBottom:40, paddingRight: 100}}>
            <View style={{alignItems:'center', justifyContent:'flex-end', position: 'absolute', bottom:0, left: -100, width: 220}}>
              <Text style={{fontSize:140, justifyContent:'flex-end', fontFamily:'SalesforceSans-Light', color:'#829CBA', backgroundColor:'rgba(0,0,0,0)', textAlign: 'center'}}>{this.props.index}</Text>
            </View>
            <View style={{flex:1, alignItems:'flex-start', justifyContent:'flex-end'}}>
              <Text style={{fontSize:55, fontFamily:'SalesforceSans-Regular', color:'white', backgroundColor:'rgba(0,0,0,0)'}}>{this.context.sobj.Name}</Text>
              <Text style={{fontSize:30, fontFamily:'SalesforceSans-Regular', color:'white', backgroundColor:'rgba(0,0,0,0)'}}>{this.context.sobj.Title}</Text>
            </View>
          </View>
        </View>

        <View style={{backgroundColor:'rgba(2,1,38,0.4)', flex:2.5,  flexDirection:'row', alignItems: 'stretch', justifyContent: 'center', borderWidth:0, borderColor:'white'}}>
          <View style={{flex:1, borderWidth:0, borderColor:'blue', alignItems:'flex-start', justifyContent:'flex-start'}}>
            <Image source={{uri: this.props.chatterData.fullEmailPhotoUrl}} style={{alignSelf:'flex-start', height:250, width:250, marginLeft:90, marginTop:-175}} />
            <View style={{marginTop:100, marginLeft:90}}>
              <CompactLayout onLayoutTap={this.handleLayoutTap}/>
            </View>
          </View>
          <View style={{flex:2, borderWidth:0, borderColor:'green', flexDirection:'column', alignItems:'stretch', paddingLeft:100, paddingTop:50, paddingRight:100}}>
            <Text style={{fontSize:25, fontFamily:'SalesforceSans-Regular', color:'#829CBA', paddingBottom:20}}>RECENTLY CLOSED OPPORTUNITIES</Text>
            <ReportLView reportId={this.props.componentData.reportResult.reportMetadata.id} index={this.props.index} summaryCallback={this.summaryCallback} entityId={this.props.entityId}/>
          </View>
          <View style={{flex:1, flexDirection:'column', alignItems: 'stretch', paddingTop:50}}>
            <Text style={{fontSize:25, fontFamily:'SalesforceSans-Regular', color:'#829CBA', paddingBottom:20, justifyContent:'flex-end'}}>SUMMARY</Text>
          {/*TODO: Kapil - change this text to change depending on entity name*/}
            <Text style={{fontSize:30, fontFamily:'SalesforceSans-Regular', color:'white', paddingTop:20}}>{this.state.numOfEntities !== 0 ? (this.state.numOfEntities + " opportunities"): ""}</Text>
            <Text style={{fontSize:30, fontFamily:'SalesforceSans-Regular', color:'white', paddingTop:20}}>{this.props.sumOfEntities + " amount closed"}</Text>
          </View>
        </View>
      </Image>
    );
  }
})


