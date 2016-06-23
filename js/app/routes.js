/*
 Copyright (c) 2016, salesforce.com, inc. All rights reserved.

 Redistribution and use of this software in source and binary forms, with or without modification,
 are permitted provided that the following conditions are met:
 * Redistributions of source code must retain the above copyright notice, this list of conditions
 and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of
 conditions and the following disclaimer in the documentation and/or other materials provided
 with the distribution.
 * Neither the name of salesforce.com, inc. nor the names of its contributors may be used to
 endorse or promote products derived from this software without specific prior written
 permission of salesforce.com, inc.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
 IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY
 WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import PropertyList from './PropertyList';
import PropertyDetail from './PropertyDetail';
import FavoriteList from './FavoriteList';
import BrokerList from './BrokerList';
import BrokerDetail from './BrokerDetail';
import Settings from './Settings';
import DashboardList from './DashboardList';
import CardView from './CardView';
import DetailView from './DetailView';
import SetupView from './SetupView';
import ListSplitView from './ListSplitView';

module.exports = {
  propertyList:{
    name:'propertyList',
    comp: PropertyList,
    label: 'Properties',
    icon:'custom85',
    iconCategory:'custom'
  },
  propertyDetail:{
    name:'propertyDetail',
    comp: PropertyDetail,
    label: 'Property',
  },
  favoriteList:{
    name:'favoriteList',
    comp: FavoriteList,
    label: 'Favorites',
    icon:'custom11',
    iconCategory:'custom'
  },
  brokerList:{
    name:'brokerList',
    comp: BrokerList,
    label: 'Brokers',
    icon: 'groups',
    iconCategory:'standard'
  },
  brokerDetail:{
    name:'brokerDetail',
    comp: BrokerDetail,
    label: 'Broker'
  },
  settings:{
    name:'settings',
    comp: Settings,
    label: 'Settings',
    icon: 'custom',
    iconCategory:'standard',
    menuItemStyle:{marginTop:30}
  },
  DashboardList: {
    name: 'DashboardList',
    comp: DashboardList,
    label: 'Dashboard',
    icon: 'Dashboard',
    iconCategory: 'standard'
  },
  CardView: {
    name: 'CardView',
    comp: CardView
  },
  DetailView: {
    name: 'DetailView',
    comp: DetailView
  },
  SetupView: {
    name: 'SetupView',
    comp: SetupView
  },

  ListSplitView: {
    name: 'ListSplitView',
    comp:ListSplitView
  }

};

// module.exports.menu = ['propertyList','brokerList','favoriteList','settings'];
module.exports.menu = ['DashboardList'];
