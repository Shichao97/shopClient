import React,{useState} from 'react';
import Modal from 'react-modal';
//import './App.css';
import { render } from '@testing-library/react';
import jquery from "jquery";
import { Button, Row, Col } from 'antd'
import { SmileOutlined } from '@ant-design/icons';
//import { stringify } from 'querystring';
const $ = jquery;



//{
  //Modal.setAppElement('#root')
  export default class  MessagePanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {msgs:[]}
    }

    componentDidMount(){
      var ws = window.ws;
    }


    render(){

    return (
      <div>
            <div className='chat_panel' id="msgdiv">
                {
                    this.state.msgs.map(function (m) {
                        return <span>{m.data}<p></p></span>
                    })
                    
                }
                test hello
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
        </div>
        <div className='chat_center'>
            <input type="text" id="msgtext" name="test"/>
            <input type="button" value="send" onClick={() => this.sendout()} />       
            </div>      
      </div>
    );
  }
//}
}

