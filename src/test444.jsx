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
        this.state = {msgs:[]};
        
    }

 
   
    componentDidMount() {
      let wsUrl = window.localStorage.getItem("wshost_pre")+'testHandler';
      this.connectWithWS(wsUrl);

    }

    componentWillUnmount(){
      if(ws!= undefined){
        ws.close();
      }
    }

    connectWithWS(wsUrl){
        
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
            ws.send(JSON.stringify({ flag: "hello"}));
        }
        ws.addEventListener('message', (msg) => {
        //ws.onmessage = (msg) => {
            var msgJson = JSON.parse(msg.data);
            this.state.msgs.push(msgJson);
            this.setState({});
            console.log('接收服务端发过来的消息: %o', msg);
            
        });
        ws.onclose = (e) =>{
            this.setState({connected:false});
            console.log('ws 连接关闭了');
            console.log(e);
        }
    }

    handleSend(){
        if(ws != undefined){
            let toId = document.getElementById("toId").value;
            ws.send(JSON.stringify({flag:"msg",toId:toId,data:"test"}))
        }
    }

    render() {
      let arry = this.state.msgs;
      return (
        <div>

          <form>
            <input type="text" name="ttt" id="toId"/>
            <input type="button" onClick={()=>this.handleSend()} value="Send"/>

          </form>
          {arry.map((element) =>{
            return(
              <div><p/>{JSON.stringify(element)}</div>
            )
          }
          )}
        </div>
      )
    }



}

export default withRouter(Messgae);