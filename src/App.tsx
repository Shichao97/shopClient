import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import {Switch,NavLink,Redirect,withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import './App.css';
import WebChatTest from './WebChatTest';
import Demo from './Demo';
import Login from './Login';
import AddGoods from './AddGoods';
import Message from './Message';
import EditIcon from './EditIcon';
import Register from './Register';
import SearchSellGoods from './SearchSellGoods';
import SearchGoods from './SearchGoods';
import jquery from "jquery";
import EditSellGoods from './EditSellGoods';
import ShowGoodsInfo from './ShowGoodsInfo';
import PlaceOrder from './PlaceOrder';
import MyAccount from './MyAccount';
import ShowOrderInfo from './ShowOrderInfo';
import MessageModal from './MessageModal';
import ChatMemberList from './ChatMemberList';
const $ = jquery;


const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)







class App extends Component<any,any> {
  constructor(props:any){
    super(props);
  }



  checkHash(){
    var str: string = window.location.hash;
    //console.log("Hash changed to: "+str.substr(0,3));
    //startsWith()函数 IE浏览器不支持，所以改为 substr
    if(str.substr(0,3) == "#/_"){
      let win:any = window;
      win.checkLogin();
    }
  }

  staticcontextTypes={
    router:PropTypes.shape({
    history:PropTypes.shape({
    push:PropTypes.func.isRequired,
    replace:PropTypes.func.isRequired,
    createHref:PropTypes.func.isRequired
    }).isRequired
    }).isRequired
  }  


  componentDidMount() {
    //onhashchange=this.checkHash
    //let pathname: any;
    // this.context.router.history.listen(()=>{
    //   this.checkHash();
    // })

    $.ajax({
      type:"GET",
      url:window.localStorage.getItem("host_pre")+"goodstype/showAll",
      dataType:"json",
      success:function(data){
        var str = JSON.stringify(data); 
        sessionStorage.setItem('goods_types', str); 
      },
      })

      var win:any = window;
      win.msgwin = this.refs.msgwin;
  }


  

  render() {
    //this.checkHash();

    var query = {
      pathname: '/query',
      query: '我是通过query传值 '
   };
   var sta = {
		pathname: '/state',
		state: {id:5,username:"Petter Lynch."}//'我是通过state传值'
	}
	
    return (
      <div>
      <Router>
         <Message app={this}/>
         <MessageModal  ref="msgwin"/>
        <div className="App">
          <Link to="/">Home</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/searchGoods">Demo id</Link>&nbsp;&nbsp;&nbsp;
          <Link to={query}>Demo query</Link>&nbsp;&nbsp;&nbsp;
          <Link to={sta}>Demo state</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/register" >Register</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/_editicon">Edit Member Icon</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/_addgoods">AddGoods</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/login">Login</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/_searchsell">SearchSell</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/chat">Chat Test</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/_myAccount">My Account</Link>&nbsp;&nbsp;&nbsp;
         
          <hr/>
          <Route path="/" exact component={Home}></Route>
          <Route path="/state" component={Demo}></Route>
          <Route path="/query" component={Demo}></Route>
          <Route path = "/register" component={Register}></Route>
          <Route path="/userid/:id" component={Demo}></Route>
          <Route path="/_editIcon" component={EditIcon}></Route>
          <Route path="/_addgoods" component={AddGoods}></Route>
          <Route path="/login" component={Login}></Route>

          <Route path="/_searchsell" component={SearchSellGoods}></Route>
          <Route path="/chat" component={WebChatTest}></Route>
          <Route path="/searchGoods" component={SearchGoods}></Route>
          <Route path="/editsellgoods/:gid" component={EditSellGoods}></Route>
          <Route path="/showgoodsinfo" component={ShowGoodsInfo}></Route>
          <Route path="/placeOrder" component={PlaceOrder}></Route>
          <Route path="/_myAccount" component={MyAccount}></Route>
          <Route path="/showOrderInfo/:oid" component={ShowOrderInfo}></Route>
          <Route path="/chatMemberList" component={ChatMemberList}></Route>
        </div>
        
      </Router>

      </div>
    );
  }
}

export default App;
