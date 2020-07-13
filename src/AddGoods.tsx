import React, { RefObject } from 'react';
import ReactDOM from 'react-dom';
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
import { FormInstance } from 'antd/lib/form';
import ImageUpload from './ImageUpload';
//import LoginModal from './LoginModal';
import jquery from "jquery";
import conf from './Conf'

const $ = jquery;

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const options = [
  { label: 'Shipping', value: '1' },
  { label: 'Self-pick', value: '2' },
  { label: 'Home-delivery', value: '4' },
];

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

export default class AddGoods extends React.Component<any,any> {
  constructor(props:any){
      super(props);
      this.state={autoCompleteResult:[],imgErrMsg:""}
  }
  
  formRef:RefObject<FormInstance> = React.createRef();
  imgupRef:RefObject<ImageUpload> = React.createRef();

  onGenderChange = (value:any) => {
    let obj:any = this.formRef.current;
    obj.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  };

  onFinish = (values:any) => {
    
    console.log(values);
    if(this.imgUploadChanged()) {
      //this.setState({success:true});
      this.doAdd(values);
    }
  };

  imgUploadChanged():boolean{
    let imgup:ImageUpload|null = this.imgupRef.current;
    if(imgup ==null || imgup.state.imgs.length < 1 ){
      this.setState({imgErrMsg : "You must upload at least one image for your second-hand goods!"});
      return false;
    }else if(imgup ==null || imgup.state.imgs.length > 16){
      this.setState({imgErrMsg : "You cannot upload more than 16 images！"});
      return false;
    }
    this.setState({imgErrMsg : ""});
    return true;
  }

  doAdd(values:any){
    let _this = this;
    let formData = new FormData();
    //let ele: any = $('#upfile')[0];
    //let appendTemp:any = ele.files[0];
    let i = 0;
    let imgup:any = this.imgupRef.current;
    
    for (let entry of imgup.state.imgs) {
        
        formData.append("img"+i,entry);
        i++;
    }
    
    let url1:string = window.localStorage.getItem("host_pre")+"goods/sell/add";
    let data= values;  //不用拼data
    for(var p in data){
        console.log(data[p]);
        console.log(data[p]);
        if(p == "typeCode"){
            let ele = data[p];
            formData.append("typeCode",ele[1]);
        }
        else if(p=="method"){
          data[p].forEach((element:any) => {
            if(element=="1"){
              formData.append("method1","1");
            }
            if(element=="2"){
              formData.append("method2","2");
            }
            if(element=="4"){
              formData.append("method3","4");
            }
          });
        }
        else formData.append(p,data[p]);
    }
    

    $.ajax({
        type:"POST",
        crossDomain: true, 
        xhrFields: {
            withCredentials: true 
        },
        url:url1,
        cache: false,
        data:formData,
        dataType:"json",
        processData: false,
        contentType: false,
        success:function(d){
            if(d == null){
                alert("Add failed dure to server error!");
            }else{
              _this.setState({success:true});
                
            }
        },
        error: function(xhr:any, textStatus, errorThrown){
            console.log("request status:"+xhr.status+" msg:"+textStatus)
            if(xhr.status=='604'){//未登录错误
                let popwin: any = conf.loginWin;
                popwin.setState({modalIsOpen:true})
            }
            
        }
    })    
  }

  onReset = () => {
    this.formRef.current?.resetFields();
    this.imgupRef.current?.reset();
    this.setState({imgErrMsg:"",success:undefined});
    //this.setState({success:true});
  };

  onFill = () => {
    this.formRef.current?.setFieldsValue({
      userName: '12345',
      password: '123abc',
      confirm: '123abc',
    });
  };

  componentDidMount(){
    //this.onFill();
  }

  getGoodsTypes(){
    let cf:any = conf;
    return cf.goods_types;
  }

  

  onChange(checkedValues:any) {
    console.log('checked = ', checkedValues);
  }
  //const [form] = Form.useForm();
  render(){
    let _this = this;    

    if(this.state.success !== undefined){
      return <div className='demo2'>
        <h1>Add successed!</h1><p/> <Button type="default" size="large" onClick={()=>this.onReset()}>Add another</Button>
      </div>
    }
  
    else   
    return(
    <div  className='demo2'>
      <h2>Add your second-hand goods here!</h2>
      <table className="content-table">
        <tr>
          <td><h3> Upload Images: </h3></td><td><ImageUpload ref={this.imgupRef} parent={this}/></td>
        </tr>
        <tr><td></td>
    <td><span className="error_msg">{this.state.imgErrMsg}</span></td>
        </tr>
      </table>
      <Row><Col className='demo3'>

      <Form
        {...formItemLayout}
        ref={this.formRef} 
        name="register"
        onFinish={this.onFinish}
        // initialValues={{
        //   typeCode: ['Furniture', 'Bed'],
        // }}        
        scrollToFirstError
      >
      
      <Form.Item
        name="name"
        label="Goods Name"
        rules={ [{required:true, message: 'Please enter goods name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="location"
        label="Location"
        rules={ [{required:true, message: 'Please enter location!' }]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        name="typeCode"
        label="Classification"
        rules={[
          { type: 'array', required: true, message: 'Please select goods classification!' },
        ]}
      >
        <Cascader options={this.getGoodsTypes()} />
      </Form.Item>


      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: 'Please input goods price!' },
        {pattern: new RegExp(/^[1-9]\d*$/, "g"),message: 'Please enter number!' }]}
      >
        <Input style={{ width: '100%' }}/>
      </Form.Item>

      <Form.Item
        name="method"
        label="Support deliver method"
        valuePropName="checked"
        rules={[
          { 
            validator:(_, value) => {
              if(value.length > 0) {
                  return Promise.resolve()
              }else{
                  return Promise.reject('Should select at least one deliver-methed')
              }
            },
          }
        ]}
        
      >
        <Checkbox.Group options={options} defaultValue={['ee']} onChange={this.onChange} />
      </Form.Item>

      

 

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>


      
      </Form>
      </Col>
      </Row>

      </div>);
    }

    // {...tailFormItemLayout}
    // <Checkbox name="method" value="2">Self-pick</Checkbox>
    // <Checkbox name="method" value="4">Home-dilivery</Checkbox>

}