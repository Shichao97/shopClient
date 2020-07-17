import React,{useState} from 'react';
import ReactModal from 'react-modal';
//import './App.css';
import { render } from '@testing-library/react';
import jquery from "jquery";
import { compileFunction } from 'vm';
import { Modal, Form, Input, Row, Col, Card } from 'antd';
//import { stringify } from 'querystring';
const $ = jquery;

//
//{
  //Modal.setAppElement('#root')
  export default class  LoginModal extends React.Component<any,any>{
      constructor(props:any){
          super(props);
          this.state={modalIsOpen:false};
      }

    doLogin(){
      let _this = this
      let params = $("#log_form").serializeArray();
      $.ajax({
          type:"POST",
          crossDomain: true, 
          xhrFields: {
              withCredentials: true 
          },
          url:window.localStorage.getItem("host_pre")+"member/login",
          data:params,
          dataType:"json",
          success: function(data) {
              console.log(data)
              if(data.success == 1){
                _this.setState({modalIsOpen:false});
                //if(_this.state.comp != undefined){
                  _this.state.comp?.setState({});
                //}
              }
              else if(data.success==0){
                //alert(data.msg);
                Modal.error({
                  title:'Error',
                  content:data.msg
                })
                
              }

          },
          error: function(xhr:any, textStatus, errorThrown){
            console.log("request status:"+xhr.status+" msg:"+textStatus)
            if(xhr.status=='604'){//未登录错误
              console.log("Login Error")
            }
             
          }
      })    
    }


    render(){
    //const [modalIsOpen, setModalIsOpen] = useState(false)  
    return (
      <div>
          <ReactModal className='demo' isOpen={this.state.modalIsOpen} onRequestClose={() => this.setState({modalIsOpen:false})}>

          
              <div style={{textAnchor:"middle"}}>
                
              <form id="log_form">
              <h2>Please login first!</h2><br/>
                  *username:<input type='text' name='userName'></input><br/><br/>
                  *password: <input type='password' name='passWord'></input><br/><br/>
                  <input type="button" value="Login" className="button" onClick={() => this.doLogin()}/><br/><br/><br/>
                  <button className="button" onClick={() => this.setState({modalIsOpen:false})}>Close</button>
              </form>
              </div>
              <div>

                <Row><Col span={6}></Col><Col span={12}>
 
            <Input ref="ttt"/>
          
          </Col><Col span={6}></Col></Row>
              </div>
          </ReactModal>
      </div>
    );
  }
//}
}

