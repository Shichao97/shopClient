import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import Login from './Login';
import { Button, Row, Col } from 'antd'
import MessagePanel from './MessagePanel';
import conf from './Conf'

var ws;


class ChatMemberList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mesState:this.props.location.state.mesState};
    }


    componentWillMount() {
        let ws = window.ws;
        if(ws === undefined){
            this.props.history.push("/");
            return;
        }
        let uid = conf.getCookie("userId");
        ws.send(JSON.stringify({ flag: "msg_init",toId: uid}));
        let result = "";
        ws.addEventListener('message', (msg) => {
          console.log('MessageList: ', msg);
          this.setState({});
  
        });
    }

    memberClicked(element,index){
        this.setState({toId:element.otherId,toName:element.otherName});
        this.refs.msgPanel.initMsg(element.otherId,element.otherName);
    }

    render() {
        //var win = window;
        let uid = conf.getCookie("userId");
        let username = conf.getCookie("username");
        let memberImgSrc = window.localStorage.getItem("host_pre")+"member/geticon?Id="+this.state.toId+"&size=0";
        let title = this.state.toId == undefined?<div>Select chat member</div>:<div>
            <img src={memberImgSrc}/> 
            {this.state.toName}
            </div>
        
        return <div>
        
        <div className='chat_body'>
        {title}
        <div className='chat_left'>
        {this.state.mesState.chatMembersArr.map((element,index) =>{
                let memberImgSrc = window.localStorage.getItem("host_pre")+"member/geticon?Id="+element.fromId+"&size=0";

                return <Row ><Col span={5}><img src={memberImgSrc}/></Col>
                <Col span={19}><Button type="text" size="middle" onClick={()=>this.memberClicked(element,index)}>
                    {element.otherName} <sup><font color="red" size="3">{element.count==0?"":""+element.count}</font></sup></Button></Col></Row>
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