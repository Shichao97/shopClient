import React, { RefObject } from 'react';
//import ReactDOM from 'react-dom';
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
  Modal,
  Spin,
  InputNumber,
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
  { label: 'Home-delivery', value: '4' },
  { label: 'Self-pick', value: '2' },
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
const limitDecimals = (value: string | number): string => {
  const reg = /^(\-)*(\d+)\.(\d\d).*$/;
  console.log(value);
  if(typeof value === 'string') {
      return !isNaN(Number(value)) ? value.replace(reg,'$1$2.$3') : ''
  } else if (typeof value === 'number') {
      return !isNaN(value) ? String(value).replace(reg,'$1$2.$3') : ''
  } else {
      return ''
  }
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
    _this.setState({goodsLoading:true});
    $.ajax({
        type:"GET",
        crossDomain: true, 
        xhrFields: {
            withCredentials: true 
        },
        url:newUrl,
        dataType:"json",
        success:function(data){
          _this.setState({goodsLoading:false});
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
          _this.setState({goodsLoading:false});
          Modal.error({title:"Error",content:"request status:"+xhr.status+" msg:"+textStatus})
          console.log("getgoodsinfo error!");
        }
      })
}

  onFinish = (values:object) => {
    
    console.log("onFinish:",values);

    if(this.imgUploadChecked()) {
      //this.setState({success:true});
      this.doEdit(values);
    }
  };

  imgUploadChecked():boolean{
    let imgup:ImageUpload|null = this.imgupRef.current;

    if(this.state.imgName.length+this.imgupRef.current?.state.imgs.length>15){
      this.setState({imgErrMsg : "Too many images than 15!"});
      return false;
    }
    else if(this.state.imgName.length==0){
      if(imgup ==null || imgup.state.imgs.length < 1 ){
        this.setState({imgErrMsg : "You must upload at least one image for your goods!"});
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
    _this.setState({loading:true});
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
          _this.setState({loading:false});
            if(d.success == 0){
                //alert(d.msg);
                Modal.error({
                  title:'Error',
                  content:d.msg
                })
            }else{
              _this.setState({success:true});
              Modal.success({title:'Edited Success'})
            }
        },
        error: function(xhr:any, textStatus, errorThrown){
            _this.setState({loading:false});
            console.log("request status:"+xhr.status+" msg:"+textStatus)
            if(xhr.status=='604'){//未登录错误
                let popwin: any = conf.loginWin;
                popwin.setState({modalIsOpen:true})
            }
            else{
              Modal.error({title:"Error",content:"request status:"+xhr.status+" msg:"+textStatus})
            }
            
        }
    })    
  }

  onReset = () => {
    this.formRef.current?.resetFields();
    this.imgupRef.current?.reset();
    this.imgupRef.current?.reset();
    let imgStr:string = this.state.data.imgNames;
    let arr:string[];
    if(imgStr == null){
      arr = [];
    }
    arr= imgStr.split(";");
    this.setState({imgErrMsg:"",success:undefined,imgName:arr});
    
    this.onFill(this.state.data);
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
      description:data.description,
      price: data.price,
      typeCode:[cate,data.typeCode],
      method:methods,
    });
  };





  imgClicked(index:number){
    this.state.imgName.splice(index,1);
    this.imgUploadChecked();
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

  Wa_SetImgAutoSize(obj:any) {
    //var img=document.all.img1;//获取图片
    var img = obj;
    var MaxWidth = 630; //设置图片宽度界限
    var MaxHeight = 360; //设置图片高度界限
    var HeightWidth = img.offsetHeight / img.offsetWidth; //设置高宽比
    var WidthHeight = img.offsetWidth / img.offsetHeight; //设置宽高比
    if (img.readyState != "complete") return false; //确保图片完全加载
    if (img.offsetWidth > MaxWidth) {
        img.width = MaxWidth;
        img.height = MaxWidth * HeightWidth;
    }
    if (img.offsetHeight > MaxHeight) {
        img.height = MaxHeight;
        img.width = MaxHeight * WidthHeight;
    }
}

  imgUpChanged=()=>{
    this.imgUploadChecked()
    this.setState({});
  }
  imgUpClicked(index:number){
    this.imgupRef.current?.imgClicked(index);
  }

  onChange = (checkedValues:any) =>  {
    this.setState({methods:checkedValues})
    console.log('checked = ', checkedValues);
  }
  shouldUpdateLocation(prevValues:any, currentValues:any){
    // let s1 = conf.getQueryStrFromObj(prevValues);
    // let s2 = conf.getQueryStrFromObj(currentValues);
    // return s1==s2;
    return true;
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
    let id:number = this.props.match.params.id;
    let imgname:string[] = this.state.imgName;

    let uploadImgs:any[] = [];
    if(this.imgupRef.current !=null) uploadImgs = (this.imgupRef as any).current.state.imgs;
    
    if(this.state.goodsLoading){
      return <div  className='add-edit-goods'>
      
      <Row><Col span={6} ></Col> <Col span={18}><h2>Edit goods here!</h2></Col></Row>
      <Row><Col span={6} ></Col> <Col span={18}><h2><Spin/></h2></Col></Row>
      
      </div>
    }
    return(
    <div  className='add-edit-goods'>
      
      <Row><Col span={6} ></Col> <Col span={18}><h2>Edit goods here!</h2></Col></Row>
      
      <Row><Col span={8} style={{textAlign:"right"}}>Uploaded images:</Col><Col span={16}>



      
            {imgname.map((element:any,index:number) =>{
                      
            let imgSrc:string = window.localStorage.getItem("host_pre")+"goods/getgoodsimg?Id="+id+"&fname="+element;
            console.log(imgSrc);
            return(
              
              <div className="upimgs">
              <a><span><h1>X</h1></span>

              <table  className="wrap"><tr><td>

                <img className="img_up"  alt="img" src={imgSrc} onClick={()=> this.imgClicked(index)} />
                </td></tr></table>
              </a>
              
              </div>
              
              
            )
          
            }
            )
          }
            
          {  uploadImgs.map((element,index) =>{
              return <div className="upimgs">
              <a><span><h1>Click to delete</h1></span>
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
        //onAbort={this.imgUploadChecked}
        
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
          { type: 'array', required: true, message: 'Please select goods Classification!' },
        ]}
      >
        <Cascader options={conf.goods_types} />
      </Form.Item>


      <Form.Item 
        name="price"
        label="Price"
        rules={[{ required: true, message: 'Please input goods price!' },
        //{pattern: new RegExp(/^[1-9]\d*$/, "g"),message: 'Please enter number!' }
      ]}
      >
        <InputNumber style={{width:'100%'}} min={0}
             max={100000000}
             step={0.01}
             formatter={limitDecimals as any}
             parser={limitDecimals as any} />
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
        <Checkbox.Group options={options} value={this.state.methods} onChange={this.onChange} />
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
        <Button type="primary" htmlType="submit" loading={this.state.loading}>
          Submit Change
        </Button>&nbsp;
        <Button htmlType="button" onClick={this.onReset}>
          Reset
        </Button>
      </Form.Item>


      
      </Form>
      </Col>
      <Col span={0}></Col>
      </Row>
     </div>);
    }

    // {...tailFormItemLayout}
    // <Checkbox name="method" value="2">Self-pick</Checkbox>
    // <Checkbox name="method" value="4">Home-dilivery</Checkbox>

}