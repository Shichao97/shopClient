import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import ChatMemberList from './ChatMemberList';
import { createHashHistory } from 'history'
import { Button, Row, Col } from 'antd'
import {Switch,NavLink,Redirect,withRouter} from 'react-router-dom'

var ws;


class Messgae extends React.Component {
    constructor(props) {
        super(props);
        this.state = { msgs: [],connected:false,chatMembersArr:[],chatMembers:{}};
        this.taskRemindInterval = null;
    }

    checkHash(){
        var str = window.location.hash;
        //console.log("Hash changed to: "+str.substr(0,3));
        //startsWith()函数 IE浏览器不支持，所以改为 substr
        if(str.substr(0,1) == "_"){
          window.checkLogin();
        }
    }

    componentWillReceiveProps(nextProps){
        var str = nextProps.location.pathname;
        //console.log("Hash changed to: "+str.substr(0,3));
        //startsWith()函数 IE浏览器不支持，所以改为 substr
        if(str != undefined && str.substr(0,2) == "/_"){
            let obj = new Object();
            obj.id = window.getCookie("userId");
            obj.username = window.getCookie("username");
            //console.log("Hi! "+uid);
            if(obj.id == ""){
                this.props.history.push( "/login" );
            }    
               
        }
    }
    
    componentDidMount() {
        // let _this = this;
        // this.props.history.listen(() => {
        //   _this.checkHash();
        // })   
        setTimeout(this.iTimer,0);
    }

 
    componentWillUnmount(){
        if(ws != undefined) ws.close();
        clearInterval(this.timer);
    }

    iTimer = () => {
        this.timer = setInterval(() => {
            //var win = window;
            let uid = window.getCookie("userId");
            let username = window.getCookie("username");
            if(uid != undefined && uid.length>0){
                if(ws == undefined){
                    let wsUrl = window.localStorage.getItem("wshost_pre")+'myHandler';
                    this.connectWithWS(wsUrl);
                    this.setState({});
                }
            }
            else if(ws != undefined){
                ws.close();
                ws = undefined;
                this.setState({});
            }
            
        }, 1000);
      }

    connectWithWS(wsUrl) {
        
        ws = new WebSocket(wsUrl);
        window.ws = ws;
        let result = "";

        ws.onopen = (e) => {
            this.setState({connected:true});

            console.log('连接上 ws 服务端了');
            //var win = window;
            let uid = window.getCookie("userId");
            let username = window.getCookie("username");
            //handshake hello msg
            ws.send(JSON.stringify({ flag: "msg_new"}));
        }
        ws.onmessage = (msg) => {
            console.log('接收服务端发过来的消息: %o', msg);
            var msgJson = JSON.parse(msg.data);
            var winWs = window.ws;

            result += msgJson.MsgBody + '\n';
            if (msgJson.flag == "login") {//多设备在线的异常发生时;
                this.setState({});
            } 
            else if (msgJson.flag == "logout") {//用户退出系统的时候;
                ws.close();
                this.setState({});
            }
            else if (msgJson.flag == "msg_new") {//用户退出系统的时候;
                this.state.chatMembersArr.push(msgJson);
                var fromId = msgJson.fromId;
                this.state.chatMembers[fromId] = msgJson;
                this.setState({});
            }
            else if (msgJson.flag == "msg") {//用户退出系统的时候;
                var fromId = msgJson.fromId;

                this.state.chatMembers[fromId].count++;
                this.setState({});
            }

        };
        ws.onclose = (e) =>{
            this.setState({connected:false});
            console.log('ws 连接关闭了');
            console.log(e);
        }
    }

    getTotalNewNum(){
        var n = 0;
        this.state.chatMembers.forEach(element => {
            n += element.count;
        });
        return n;
    }
 
    messageListClicked(){
        var sta = {
            pathname: '/chatMemberList',
            state: {mesComp:this}//'我是通过state传值'
        }
        this.props.history.push("/");
    }

    render() {
        var win = window;
        let uid = win.getCookie("userId");
        let username = win.getCookie("username");
        
        
        if(uid != undefined && uid.length>0){
            return (
            <div>
                
                Hello,{username} 
                
                    <Button key="back" type="text" size="large" onClick={()=>this.messageListClicked()}>Message</Button>
                
                
            </div>
            )
        }
        else {
            return (
                
            <div>
                    <Button key="back" type="text" size="large" onClick={()=>this.props.history.push("/login")}>Login</Button>
            </div>
            )
        }
    }



}

export default withRouter(Messgae);