import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import Login from './Login';
import { Button, Row, Col } from 'antd'
import MessagePanel from './MessagePanel';

var ws;


class ChatMemberList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mesState:this.props.location.state.mesState};
    }


    componentWillMount() {
        let ws = window.ws;
        let uid = window.getCookie("userId");
        ws.send(JSON.stringify({ flag: "msg_init",toId: uid}));
        let result = "";
        ws.onmessage = (msg) => {
          console.log('MessagePanel: ', msg);
          var msgJson = JSON.parse(msg.data);
          var winWs = window.ws;
  
          result += msgJson.MsgBody + '\n';
          if(msgJson.flag == "msg_init") {//MainPanel init
              if(msgJson.fromId == this.state.fromId){
                  this.state.msgs.push(msgJson);
                  this.setState({});
              }
          }
          else if (msgJson.flag == "msg") {
              if(msgJson.fromId == this.state.fromId){
                  this.state.msgs.push(msgJson);
                  this.setState({});
              }
          }
  
        };
    }

    memberClicked(element,index){
        this.setState({toId:element.otherId,toName:element.otherName});
        this.refs.msgPanel.init(element.otherId,element.otherName);
    }

    render() {
        var win = window;
        let uid = win.getCookie("userId");
        let username = win.getCookie("username");
        let memberImgSrc = window.localStorage.getItem("host_pre")+"member/geticon?Id="+this.state.toId+"&size=0";
        let title = this.state.toId == undefined?<div></div>:<div><img src={memberImgSrc}/> {this.state.toName}</div>
        
        return <div>
        
        <div className='chat_body'>
        {title}
        <div className='chat_left'>
        {this.state.mesState.chatMembersArr.map((element,index) =>{
                let memberImgSrc = window.localStorage.getItem("host_pre")+"member/geticon?Id="+element.fromId+"&size=0";

                return <Row><img src={memberImgSrc}/>
                <Button key="back" type="text" size="large" onClick={()=>this.memberClicked(element,index)}>
                    {element.fromName}</Button></Row>
            })}


            
        </div>
        <div className='chat_right'>
        <MessagePanel ref="msgPanel"/>
        </div>


                  
            

        </div>
        </div>
    }




}

export default ChatMemberList;