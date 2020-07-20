import React from 'react';
import ReactModal from 'react-modal';
//import './App.css';
//import { render } from '@testing-library/react';
import jquery from "jquery";
//import { compileFunction } from 'vm';
import { Modal, Form, Input, Row, Col, Card,Button, Checkbox } from 'antd';
//import { stringify } from 'querystring';
const $ = jquery;


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 10 },
};


//
//{
  //Modal.setAppElement('#root')
  export default class  LoginModal extends React.Component<any,any>{
      constructor(props:any){
          super(props);
          this.state={modalIsOpen:false};
      }

      

      onFinishFailed = (errorInfo:any) => {
          console.log('Failed:', errorInfo);
      }


      onFinish = (values:any) => {
      let _this = this
      _this.setState({loading:true});
      $.ajax({
          type:"POST",
          crossDomain: true, 
          xhrFields: {
              withCredentials: true 
          },
          url:window.localStorage.getItem("host_pre")+"member/login",
          data:values,
          dataType:"json",
          success: function(data) {
              console.log(data)
              _this.setState({loading:false});
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
            _this.setState({loading:false});
            let msg = "request status:"+xhr.status+" msg:"+textStatus
            Modal.error({
              title:'Error',
              content:msg
            })
             
          }
      })    
    }


    render(){
    //const [modalIsOpen, setModalIsOpen] = useState(false)  
    return (
      <div>
          <ReactModal className='demo' isOpen={this.state.modalIsOpen} onRequestClose={() => this.setState({modalIsOpen:false})}>

          
              <div style={{textAnchor:"middle"}}>
                
              
              <h2>Session timeout! Please login again!</h2><br/>


              <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="userName"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="passWord"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>



              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={this.state.loading} >
                  Submit
                </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="default"onClick={() => this.setState({modalIsOpen:false})}>
                  Close
                </Button>
              </Form.Item>
            </Form>





              </div>
 
          </ReactModal>
      </div>
    );
  }
//}
}

