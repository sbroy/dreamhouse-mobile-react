/*
 * Copyright (c) 2016, salesforce.com, inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided
 * that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the
 * following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
 * the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or
 * promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

import React from 'react';
import ReactNative from 'react-native';

const {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    PixelRatio,
    Navigator,
    NavigatorIOS,
    TabBarIOS,
    TouchableOpacity,
    StatusBar,
    SideMenu
} = ReactNative;

import routes from './routes';

import PropertyList from './PropertyList';

import styles from './styles';

import MainMenu from './MainMenu';

import NavigationBarRouteMapper from './NavBar/mapper';

module.exports = React.createClass({

  getInitialState() {
    if(__APPLETV__) {
      return {
        route: routes['DashboardList'],
        navigator: null,
        isTabBarFocused : true
      };
    } else {
      return {
        isOpen:false,
        navigator:null
      };
    }
  },

  handleMenuPress(route) {
    if(__APPLETV__) {
      this.changeRoute(this.state.route,route);

    } else {
      this.setState({isOpen:false});
      this.state.navigator.replace(route);
    }
  },

  componentDidMount(){
    if(!__APPLETV__) {
      StatusBar.setBarStyle('light-content', true);
    }
  },

  router(route, navigator) {
    this.state.navigator = navigator;
    const r = routes[route.name];
    if(r && r.comp){
      return (
        <View style={styles.page}>
          <r.comp route={route}  navigator={navigator}/>
        </View>
      );
    }
    console.warn('no route exists');
  },

  handleMenuOpen(){
    this.setState({isOpen:true});
  },

//////////
// Apple TV methods
//////////
  push: function(route) {
    this.handleMenuPress(route);
  },

  changeRoute(oldRoute,newRoute) {
    if(oldRoute.name !== newRoute.name) {
      this.setState({"route":newRoute});
      this.state.navigator.replace(route);
    }
  },

  renderTabBarItem(name,title){
      return (
           <TabBarIOS.Item
             title={title}
             selected={this.state.route.name === name}
             onPress={() => this.changeRoute(this.state.route,routes[name])}
             >
             <Text></Text>
          </TabBarIOS.Item>
      );
  },
//////////

  render() {
    if(__APPLETV__) {
      return (
        <View style={styles.container}>
          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              title : 'SetupView',
              component : routes['SetupView'].comp,
              passProps: {
                routes: routes
              }
            }}
            navigationBarHidden={true}
            />
       </View>
      );
    } else {
      return (
      <SideMenu
        isOpen={this.state.isOpen}
        menu={<MainMenu onMenuPress={this.handleMenuPress} />}>
        <Navigator
            style={styles.container}
            configureScene={() => Navigator.SceneConfigs.PushFromRight}
            initialRoute={routes['propertyList']}
            renderScene={this.router}
            navigationBar={<Navigator.NavigationBar routeMapper={NavigationBarRouteMapper({onMenuOpen:this.handleMenuOpen})} style={styles.navbar}/>}
        />
      </SideMenu>
      );
    }
  }
});


