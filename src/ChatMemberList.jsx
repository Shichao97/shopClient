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

 

    render() {
        var win = window;
        let uid = win.getCookie("userId");
        let username = win.getCookie("username");
        return <div>
        
        <div className='chat_body'>
            username
        <div className='chat_left'>
        <Row>444</Row>
        <Row>444</Row>
        <Row>444</Row>
        <Row>444</Row>
        <Row>444</Row>
        <Row>444</Row>
        <Row>444</Row>
        <Row>444</Row>
        <Row>444</Row>
        <Row>444</Row>
        <Row>444</Row>
        <Row>444</Row>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
            {this.state.mesState.chatMembersArr.map((element,index) =>{
                return element.fromName
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