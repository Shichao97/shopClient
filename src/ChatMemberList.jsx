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


    componentDidMount() {
    }

    memberClicked(element,index){

    }

    render() {
        var win = window;
        let uid = win.getCookie("userId");
        let username = win.getCookie("username");
        return <div>
        
        <div className='chat_body'>
            username
        <div className='chat_left'>
        {this.state.mesState.chatMembersArr.map((element,index) =>{
                let memberImgSrc = window.localStorage.getItem("host_pre")+"member/geticon?Id="+element.fromId+"&size=0";

                return <Row><img src={memberImgSrc}/>
                <Button key="back" type="text" size="large" onClick={()=>this.memberClicked(element,index)}>
                    {element.fromName}</Button></Row>
            })}


            
        </div>
        <div className='chat_right'>
        <MessagePanel/>
        </div>


                  
            

        </div>
        </div>
    }




}

export default ChatMemberList;