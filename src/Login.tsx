import React,{useState} from 'react';
//import Modal from 'react-modal';
//import { render } from '@testing-library/react';
import { withRouter, Redirect } from 'react-router-dom';
import jquery from "jquery";
import { Modal, Form, Input, Button } from 'antd';
//import { stringify } from 'querystring';
const $ = jquery;


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 10 },
};

//{
  //Modal.setAppElement('#root')
  class  Login extends React.Component<any,any>{
      constructor(props:any){
          super(props);
          this.state = { redirectToReferrer: false };
      }

    onFinishFailed = (errorInfo:any) => {
        console.log('Failed:', errorInfo);
    }


    onFinish = (values:any) => {
      let url = window.localStorage.getItem("host_pre")+"member/login";
      let _this = this
      
      $.ajax({
          type:"POST",
          crossDomain: true, 
          xhrFields: {
              withCredentials: true 
          },
          url:url,
          data:values,
          dataType:"json",
          success: function(data) {
              console.log(data)
              if(data.success == 1){
                _this.setState({ redirectToReferrer: true });
                //_this.props.history.goBack();
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
              //_this.props.listComp.refs.logwin.set
            }
             
          }
      })    
    }


    render(){
      let { from } = this.props.location.state || { from: { pathname: "/" } };
      let { redirectToReferrer } = this.state;
      if (redirectToReferrer) return <Redirect to={from} />;


      return (

      <div>
              <div className='demo2'>
              
                
              
              <h2>Please login first!</h2><br/>


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
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                
              </Form.Item>
            </Form>



              </div>
              <div>
                  
              </div>
      </div>
    );
  }
//}
}

export default withRouter(Login)