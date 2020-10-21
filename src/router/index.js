
import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import home from '@/pages/home/home'
import record from '@/pages/record/record'
import balance from '@/pages/balance/balance'
import helpcenter from '@/pages/helpcenter/helpcenter'
import production from '@/pages/production/production'
// import App  from './'

export default class RouteConfig extends Component{
    render(){
      return(
        <HashRouter>
          <Switch>
            <Route path="/" exact component={home} />
            <Route path="/record" component={record} />
            <Route path="/balance" component={balance} />
            <Route path="/helpcenter" component={helpcenter} />
            <Route path="/production" component={production} />
            <Redirect to="/" />
          </Switch>
        </HashRouter>
      )
    }
}