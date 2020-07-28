import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
// import ChatMemberList from './ChatMemberList';
// import { createHashHistory } from 'history'
// import { Button, Row, Col } from 'antd'
import {withRouter} from 'react-router-dom'
import conf from './Conf'
import { Badge, Modal ,Spin} from 'antd';
//import { ClockCircleOutlined } from '@ant-design/icons';


import jquery from "jquery";
const $ = jquery;


var ws;
var timerNum = 0;

class Messgae extends React.Component {
    constructor(props) {
        super(props);
        let uid = conf.getCookie("userId")
        this.state = { msgNewEnd: false,connected:false,chatMembersArr:[],chatMembers:{},icon_index:0};
        this.taskRemindInterval = null;
    }

 
    // componentWillReceiveProps(nextProps){
    //     var str = nextProps.location.pathname;
 
    //     if(str != undefined && str.substr(0,2) == "/_"){
    //         let obj = new Object();
    //         obj.id = conf.getCookie("userId");
    //         obj.username = conf.getCookie("username");
    //         //console.log("Hi! "+uid);
    //         if(obj.id == ""){
    //             this.props.history.push( "/login" );
    //         }    
               
    //     }
    // }
    
    // checkLogin(){
    //     let obj = new Object();
    //     obj.id = conf.getCookie("userId");
    //     obj.username = conf.getCookie("username");
    //     //console.log("Hi! "+uid);
    //     if(obj.id == ""){
    //         //location.hash = "/login";
    //         this.props.history.push( "/login" );
    //     }    
    //     return obj;
    // }
    componentDidMount() {
      let wsUrl = window.localStorage.getItem("wshost_pre")+'testHandler';
      this.connectWithWS(wsUrl);

    }
    connectWithWS(wsUrl) {
        
        ws = new WebSocket(wsUrl);
        window.ws = ws;
        let result = "";

        ws.onopen = (e) => {
            this.setState({connected:true});

            console.log('连接上 ws 服务端了');
            //var win = window;
            let uid = conf.getCookie("userId");
            let username = conf.getCookie("username");
            //handshake hello msg
            ws.send(JSON.stringify({ flag: "msg",data:"hello"}));
        }
        ws.addEventListener('message', (msg) => {
        //ws.onmessage = (msg) => {
            console.log('接收服务端发过来的消息: %o', msg);
            var msgJson = JSON.parse(msg.data);
            
        });
        ws.onclose = (e) =>{
            this.setState({connected:false});
            console.log('ws 连接关闭了');
            console.log(e);
        }
    }

 
   
    
    
    // getCookie(key){
    //     const name =key+"=";
    //     const ca = document.cookie.split(';'); 
    //     for(let i=0;i<ca.length;i++){
    //       const c = ca[i].trim();
    //       if(c.indexOf(name) === 0){
    //         return c.substring(name.length, c.length);
    //       }
    //     }
    //     return "";
    // }
    render() {
      return <h1>test...</h1>
    }



}

export default withRouter(Messgae);