import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import Login from './Login';
import { Button, Row, Col } from 'antd'

var ws;


class ChatMemberList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mesComp:this.props.location.state.mesComp};
    }


    componentDidMount() {
    }

 


    render() {
        var win = window;
        let uid = win.getCookie("userId");
        let username = win.getCookie("username");
        return <div>
            {this.state.mesComp.state.chatMembersArr[0].fromName}
        </div>
    }




}

export default ChatMemberList;