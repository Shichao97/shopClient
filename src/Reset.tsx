import React, { RefObject } from 'react';
//import { Link } from 'react-router-dom';
import{Form,Input,Button,Modal} from 'antd';
import { FormInstance } from 'antd/lib/form';
import conf from './Conf';
import jquery from "jquery";
const $ = jquery;
const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 20,
        offset: 0,
      },
      sm: {
        span: 10,
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

export default class Reset extends React.Component<any,any> {
    constructor(props:any,state:any){
        super(props);
        this.state = {

        }
    }

    formRef:RefObject<FormInstance> = React.createRef();
    onFinish = (values:any) =>{
        this.setState({loading:true});
        let _this = this;
        let params:string = this.props.match.params.params;
        let obj2:any = conf.getQueryObjFromStr(params);
        obj2.passWord = values.passWord;
        let t = this.formRef;
        console.log(values);
        console.log('Received values of form: ', values);
        
        $.ajax({
            type:"POST",
            crossDomain: true, 
            xhrFields: {
                withCredentials: true 
            },
            url:window.localStorage.getItem("host_pre")+"member/resetPassword",
            data:obj2,
            dataType:"json",
            success:function(d){
                _this.setState({loading:false});
                if(d.success == 0){
                    Modal.error({
                        title:'Error',
                        content: d.msg
                      })
                }else if(d.success == 1){
                    _this.setState({resetMsg:"Successfully Reset!"});
                }
            }
        })
    }

    render(){
        if(this.state.resetMsg == undefined){
            return(
                <div>
                    <h1>Reset Password</h1>
                    <Form
                    {...formItemLayout}
                    ref={this.formRef} 
                    name="reset"
                    onFinish={this.onFinish}
                    
                    
                    initialValues={{
                    
                    }}
                    scrollToFirstError
                    >
                        <Form.Item
                            name="passWord"
                            label="Password"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your new password!',
                            },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
        
                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['passWord']}
                            hasFeedback
                            rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                if (!value || getFieldValue('passWord') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                                },
                            }),
                            ]}
                    
                        >
                            <Input.Password />
                        </Form.Item>
                    
              
    
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" loading={this.state.loading}>
                            Reset Password
                            </Button>
                        </Form.Item>
                    </Form>
                    
                </div>
            )
        }else{
            return(
                <div>
                    {this.state.resetMsg}
                </div>
            )
        }
        
    }
}