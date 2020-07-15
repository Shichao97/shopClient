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
  Card,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import ImageUpload from './ImageUpload';
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

export default class EditSellGoods extends React.Component<any,any> {
  constructor(props:any){
      super(props);
      this.state={autoCompleteResult:[],imgErrMsg:"",imgName:[]}
  }
  
  formRef:RefObject<FormInstance> = React.createRef();
  imgupRef:RefObject<ImageUpload> = React.createRef();

  componentDidMount(){
      let id:number = this.props.match.params.id;
      this.getGoodsInfo(id);
  }


  getGoodsInfo(gid:number){
    let newUrl:string = window.localStorage.getItem("host_pre")+"goods/getgoodsinfo?Id="+gid;
    let _this = this;
    $.ajax({
        type:"GET",
        // crossDomain: true, 
        // xhrFields: {
        //     withCredentials: true 
        // },
        url:newUrl,
        dataType:"json",
        success:function(data){
            let imgStr:string = data.imgNames;
            let arr:string[];
            if(imgStr == null){
              arr = [];
            }
            arr= imgStr.split(";");
            _this.setState({imgName:arr,data:data});
            _this.onFill(data);


        },
        error: function(xhr:any, textStatus, errorThrown){
          console.log("getgoodsinfo error!");
        }
      })
}

  onFinish = (values:object) => {
    
    console.log("onFinish:",values);

    if(this.imgUploadChanged()) {
      //this.setState({success:true});
      this.doEdit(values);
    }
  };

  imgUploadChanged():boolean{
    let imgup:ImageUpload|null = this.imgupRef.current;
    if(this.state.imgName.length==0){
      if(imgup ==null || imgup.state.imgs.length < 1 ){
        this.setState({imgErrMsg : "You must upload at least one image for your second-hand goods!"});
        return false;
      }else if(imgup ==null || imgup.state.imgs.length > 16){
        this.setState({imgErrMsg : "You cannot upload more than 16 images！"});
        return false;
      }
    }
    this.setState({imgErrMsg : ""});
    return true;
  }

  doEdit(values:any){
    let _this = this;
    let formData = new FormData();
    let id:string = this.props.match.params.id;
    //let ele: any = $('#upfile')[0];
    //let appendTemp:any = ele.files[0];
    let i = 0;
    let imgup:any = this.imgupRef.current;
    
    for (let entry of imgup.state.imgs) {
        
        formData.append("img"+i,entry);
        i++;
    }
    let oldimgnames = _this.combineImgNames(_this.state.imgName);
    formData.append("oldimgnames",oldimgnames);

    formData.append("gid",id);
    
    let url1:string = window.localStorage.getItem("host_pre")+"goods/sell/edit";
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

  onFill = (data:any) => {
    //let data = this.state.data;
    let n = data.typeCode.indexOf("_");
    let cate = data.typeCode.substring(0,n);
    let methods:any = [];
    if((data.sellingMethod & 1) == 1){
      methods.push("1");
    }
    if((data.sellingMethod & 2) == 2){
      methods.push("2");
    }
    if((data.sellingMethod & 4) == 4){
      methods.push("4");
    }    
    this.setState({methods:methods});

    this.formRef.current?.setFieldsValue({
      name: data.name,
      location: data.location,
      price: data.price,
      typeCode:[cate,data.typeCode],
      method:methods,
    });
  };





  imgClicked(index:number){
    this.state.imgName.splice(index,1);
    this.setState({});
  }

  //拼接分号字符串
  combineImgNames(arr:number[]){
    if(arr == null || arr.length == 0){
      return "";
    }
    let re:string = "";
    for(let ele of arr){
      re += (ele)+";";
    }
    return re.substring(0,re.length-1);
  }



  onChange = (checkedValues:any) =>  {
    this.setState({methods:checkedValues})
    console.log('checked = ', checkedValues);
  }
  //const [form] = Form.useForm();
  render(){
    let _this = this;    
    let id:number = this.props.match.params.id;
    let imgname:string[] = this.state.imgName;


    if(this.state.success !== undefined){
      return <div className='demo2'>
        <h1>Change goods successed!</h1><p/> <Button type="default" size="large"  onClick={() => this.props.history.push("/searchGoods")}>Back</Button>
      </div>
    }
  
    else   
    return(
    <div  className='demo2'>
      <h2>Edit goods here!</h2>
      <table className="content-table">
        <tr>
          <td><h3> Uploaded images: </h3></td><td>
            {imgname.map((element:any,index:number) =>{
                      
            let imgSrc:string = window.localStorage.getItem("host_pre")+"goods/getgoodsimg?Id="+id+"&fname="+element;
            console.log(imgSrc);
            return(
              <div className="upimgs"> 
              <a><span><h1>Click to delete</h1></span>


              </a>

              <Card className="warp"
                hoverable
                style={{ width: 120,height:240}}
                cover={<img alt="img" src={imgSrc} onClick={()=> this.imgClicked(index)} />}
              >
              </Card>



              </div>
            )
          
            }
            )}
            <ImageUpload ref={this.imgupRef} parent={this}/></td>
        </tr>
        <tr><td></td>
    <td><span className="error_msg">{this.state.imgErrMsg}&nbsp;</span></td>
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
          { type: 'array', required: true, message: 'Please select goods Classification!' },
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
        <Checkbox.Group options={options} value={this.state.methods} onChange={this.onChange} />
      </Form.Item>

      

 

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Submit Change
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