import React from 'react';
import jquery from "jquery";
import './Register.css';
import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
  } from 'antd';
  import { QuestionCircleOutlined } from '@ant-design/icons';
const $ = jquery;


//const [form] = Form.useForm();
export default class test extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state={
            un:"",
            pw:"",
            em:"",
            con:"",
            un_msg:"",
            pw_msg:"",
            em_msg:"",
            confirm_msg:"",
            msg:"",
        }
    }
    checkPassword(passWord:string):boolean{
        let reg:any = new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,16})$");
        let f:boolean = reg.test(passWord);
        return f;
    }
    checkUsername(userName:string):boolean{
        let reg:any = new RegExp("^\\w{3,32}$");
        let f:boolean = reg.test(userName);
        return f;
    }
    checkEmail(email:string):boolean{
        //let reg:any = new RegExp("^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$");
        let reg:any = new RegExp("^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$");
        let f:boolean = reg.test(email);
        return f;
    }
    handleRegister(){
        //this.setState({});
        let un:string = this.state.un;
        if(!this.checkUsername(un)){
            this.setState({un_msg:"Your username is of wrong format!"});
            return;
        }
        
        let pw:string = this.state.pw;
        if(!this.checkPassword(pw)){
            this.setState({pw_msg:"Your password is of wrong format!"});
            return;
        }
        let con:string = this.state.con;
        if(pw != con){
            this.setState({confirm_msg:"Not the same password as before!"});
            return;
        }
        let em:string = this.state.em;
        if(!this.checkEmail(em)){
            this.setState({em_msg:"Your email is of wrong format!"});
            return;
        }

        let _this: test = this;
        let data= $("#registerForm").serializeArray();
        $.ajax({
            type:"POST",
            url:window.localStorage.getItem("host_pre")+"member/register",
            data:data,
            dataType:"json",
            success:function(d){
                _this.setState({msg:"register success!"});
            },error:function(xhr:any,textStatus,errorThrown){
                console.log("request status:"+xhr.status+" msg:"+textStatus);
                if(xhr.status=='601'){
                    _this.setState({msg:"register failed!"+"request status:"+xhr.status+" msg:"+textStatus});
                }
              }
        })
    }
    
    /*
    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                        { validator:(_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement') },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                        I have read the <a href="">agreement</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                        Register
                        </Button>
                    </Form.Item>

    
    */
    render(){
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
        const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            },
        };
        //const [form] = Form.useForm();

        const onFinish = (values:any) => {
            console.log('Received values of form: ', values);
        };
        return(
            <div>
                <Form {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        initialValues={{
                        }}
                        scrollToFirstError
                >
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                        ]}
                        hasFeedback
                    ></Form.Item>
                    
                    
                </Form>
            </div>
        )
    }

    handleChange = (event:any) =>  {
        
        switch(event.target.name){
          case "userName":
            this.setState({un: event.target.value});
            this.setState({un_msg:""});
            break;
          case "passWord":
            this.setState({pw: event.target.value});
            this.setState({pw_msg:""});
            
            break;
          case "confirm":
            this.setState({con: event.target.value});
            this.setState({confirm_msg:""});
            break;
          case "email":
            this.setState({em: event.target.value});
            this.setState({em_msg:""});
            break;
          default: break;
        }
        //console.log(this)
    }
}