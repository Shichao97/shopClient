import React, { RefObject } from 'react';
import{Form,Input,Button,Modal} from 'antd';
import jquery from "jquery";
import { FormInstance } from 'antd/lib/form';
import conf from './Conf';
const $ = jquery;
const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 20,
        offset: 0,
      },
      sm: {
        span: 8,
        offset: 8,
      },
    },
  };
const formItemLayout = {
labelCol: {
    xs: { span: 20 },
    sm: { span: 6 },
},
wrapperCol: {
    xs: { span: 20 },
    sm: { span: 14 },
},
};
//forget password function
export default class ForgetPassword extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state={
            msg:""
        }
    }
    formRef:RefObject<FormInstance> = React.createRef();
    onFinish = (values:any) =>{
        this.setState({loading:true});
        let _this = this;
        let t = this.formRef;
        console.log(values);
        console.log('Received values of form: ', values);
        
        $.ajax({
            type:"POST",
            crossDomain: true, 
            xhrFields: {
                withCredentials: true 
            },
            url:window.localStorage.getItem("host_pre")+"member/beginReset",
            data:values,
            dataType:"json",
            success:function(d){

                _this.setState({loading:false,data:d});
                console.log(d);
                
                if(d.success == 0){
                    Modal.info({title:"Sorry",content:d.msg});
                }else if(d.success == 1){
                    //message.success("Please check your email for more info of reset");
                    //_this.setState({msg:"Please check your email for reset"})
                }
            },
            error: function(xhr:any, textStatus, errorThrown){
                let data = {success:0,msg:"request status:"+xhr.status+" msg:"+textStatus}
                _this.setState({loading:false,data:data})
                //console.log("request status:"+xhr.status+" msg:"+textStatus)
                Modal.error({title:"Error",content:"request status:"+xhr.status+" msg:"+textStatus});  
            }
        })
    }



    render(){
        if (this.state.data != undefined && this.state.data.success == 1) {
            return <div><h1>Send Reset Email Success</h1><h2>Please check your email for more info of reset</h2></div>
        }
        return(
            <div className="demo2">
                <h1>Forget Password</h1>
                <Form
                {...formItemLayout}
                ref={this.formRef} 
                name="forget"
                onFinish={this.onFinish}
                
                
                initialValues={{
                
                }}
                scrollToFirstError
                >
                    <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail!',
                      },

                      
                    ]}
                    hasFeedback
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" loading={this.state.loading}>
                        Forget Password
                        </Button>
                    </Form.Item>
                </Form>
                {this.state.msg}
            </div>
        )
    }
}