import React, {Component} from 'react';
import Signin from './components/signin';
import Signup from './components/signup';
import Home from './components/home';
import Example from './components/manage';
import Manages from './components/manages';
import AddProduce from './components/add';
import Search from './components/search';
import {Router,Route,Link,browserHistory, Switch} from 'react-router';

export default class App extends Component{
  render () {
    return (
      <div>
        <Router history={browserHistory}>
          <Route path="/" component={Signin}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/manage" component={Example}></Route>
          <Route path="/manages" component={Manages}></Route>
          <Route path="/addproduce" component={AddProduce}></Route>
          <Route path="/search" component={Search}></Route>
        </Router>
      </div>
    );
  }
}