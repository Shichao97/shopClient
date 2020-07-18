import React, { RefObject } from 'react';
import ReactDOM from 'react-dom';
import {
  Form,
  Input,
  Alert,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Modal
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import ImageUpload from './ImageUpload';
//import LoginModal from './LoginModal';
import jquery from "jquery";
import conf from './Conf';

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
    if(this.imgUploadChecked()) {
      //this.setState({success:true});
      this.doAdd(values);
    }
  };

  imgUploadChecked():boolean{
    let imgup:ImageUpload|null = this.imgupRef.current;
    if(0+(this.imgupRef.current as any).state.imgs.length>15){
      this.setState({imgErrMsg : "Too many images than 15!"});
      return false;
    }
    else if(imgup ==null || imgup.state.imgs.length < 1 ){
      this.setState({imgErrMsg : "You must upload at least one image for your goods!"});
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
            else if(element=="2"){
              formData.append("method2","2");
            }
            else if(element=="4"){
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
                //alert("Add failed dure to server error!");
                Modal.error({
                  title:'Error',
                  content:'Add failed dure to server error!'
                })
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


  imgUpChanged=()=>{
    this.imgUploadChecked();
    this.setState({});
  }
  imgUpClicked(index:number){
    this.imgupRef.current?.imgClicked(index);
  }
  

  onChange(checkedValues:any) {
    console.log('checked = ', checkedValues);
  }

  shouldUpdateLocation(prevValues:any, currentValues:any){
    let s1 = conf.getQueryStrFromObj(prevValues);
    let s2 = conf.getQueryStrFromObj(currentValues);
    return s1==s2;
  }

  isPickChecked(){
    let cks = this.formRef.current?.getFieldValue('method');
    for(var n in cks){
      if(cks[n]==="2") return true;
    }
    return false;
  }

  //const [form] = Form.useForm();
  render(){
    let _this = this;    
    let uploadImgs:any[] = [];
    if(this.imgupRef.current !=null) uploadImgs = (this.imgupRef as any).current.state.imgs;


    if(this.state.success !== undefined){
      return <div className='demo2'>
        <h1>Add successed!</h1><p/> <Button type="default" size="large" onClick={()=>this.onReset()}>Add another</Button>
      </div>
    }
  
    else   
    return(
    <div  className='add-edit-goods'>
      <Row><Col span={4} ></Col> <Col span={20}><h2>Add your second-hand goods here!</h2></Col></Row>


      <Row><Col span={8}  style={{textAlign:"right"}}>Upload Images:</Col><Col span={16}>
        
        

          {  uploadImgs.map((element,index) =>{
              return <div className="upimgs">
              <a><span><h1>X</h1></span>
              <table  className="wrap">
              <tr><td>
                
              <img className="img_up" onClick={()=> this.imgUpClicked(index)}
              id={"img_"+index} 
              src={window.URL.createObjectURL(element)} /> 
              </td></tr>
            </table>
              </a>
             </div>
          })  }
            
          <table  className="wrap"><tr><td>
            <ImageUpload ref={this.imgupRef} onChange={this.imgUpChanged}/>
            </td></tr></table>




      </Col></Row>


      <Row><Col span={8}></Col><Col span={16}>
        <span className="error_msg">{this.state.imgErrMsg}&nbsp;</span>
      </Col></Row>
      <Row><Col className='demo3' span={24}>

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
        name="description"
        label="Description"
        rules={ [
          {
            pattern: new RegExp("^.{15,255}$", "g"),
            message: ' Please type 15-255 characters!',
          },
          {required:true, message: 'Please enter description!' }
        ]}
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
        <Cascader options={conf.goods_types} />
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
        label="Deliver method"
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

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => _this.shouldUpdateLocation(prevValues, currentValues)}
      >
        {() => {
          return _this.isPickChecked() ? (
            <Form.Item name="location" label="Self-pick location" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          ) : null;
        }}
      </Form.Item>


 

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" onClick={()=>this.imgUploadChecked()}>
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