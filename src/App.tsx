import React, { Component } from 'react';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import './App.css';
import EditInfo from './EditInfo';
import Demo from './Demo';
import Login from './Login';
import AddGoods from './AddGoods';
import LoginModal from './LoginModal';
import EditIcon from './EditIcon';
import Register from './Register';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Product = () => (
  <div>
    <h2>Product</h2>
  </div>
)

class App extends Component {
  render() {
    var query = {
      pathname: '/query',
      query: '我是通过query传值 '
   };
   var sta = {
		pathname: '/state',
		state: {id:5,username:"Petter Lynch.",app:this}//'我是通过state传值'
	}
	
    return (
      
      <Router>
        <div className="App">
          <Link to="/">Home</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/userid/33">Demo id</Link>&nbsp;&nbsp;&nbsp;
          <Link to={query}>Demo query</Link>&nbsp;&nbsp;&nbsp;
          <Link to={sta}>Demo state</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/register" >Register</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/editicon/2">Edit Member Icon</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/addgoods">AddGoods</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/login">Login</Link>&nbsp;&nbsp;&nbsp;
          <hr/>
          <Route path="/" exact component={Home}></Route>
          <Route path="/state" component={Demo}></Route>
          <Route path="/query" component={Demo}></Route>
          <Route path = "/register" component={Register}></Route>
          <Route path="/userid/:id" component={Demo}></Route>
          <Route path="/editIcon/:id" component={EditIcon}></Route>
          <Route path="/addgoods" component={AddGoods}></Route>
          <Route path="/login" component={Login}></Route>
        </div>
        
      </Router>
    );
  }
}

export default App;
