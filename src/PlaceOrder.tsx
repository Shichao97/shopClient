import React, { RefObject } from 'react';
import { Link } from 'react-router-dom';
import jquery from "jquery";
//import LoginModal from './LoginModal';
import conf from './Conf'
import { Modal , Form, Input, Button, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';

const $ = jquery;
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};



export default class PlaceOrder extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state={disableInput:false
        }
    }
    form:RefObject<FormInstance> = React.createRef();
    
    //const [form] = Form.useForm();
    
    onMethodChange = (value: any) => {
        switch (value) {
        case 2:
            this.form.current?.setFieldsValue({ receiveAddr: this.state.data.location });
            let input = (this.form.current as any).getFieldInstance("receiveAddr");
            input.disabled = true;
            this.setState({disableInput:true});
            return;
        default:this.setState({disableInput:false});
        }
    }
    

    
    onReset = () => {
        this.form.current?.resetFields();
    }
    
    onFill = () => {
        this.form.current?.setFieldsValue({
        note: 'Hello world!',
        gender: 'male',
        })
    }
    
    

    componentWillMount(){
        let sta:any = this.props.location.state;
        this.setState({data:sta});
    }

    onFinish = (values: any) => {
        console.log(values);
        Modal.confirm({
                  title: 'Comfirm buy this goods?',
                  //icon: <ExclamationCircleOutlined/>,
                  content: this.state.data.name+" Price: $"+this.state.data.price,
                  okText: 'Yes',
                  okType: 'danger',
                  cancelText: 'No',
                  onOk: () => {
                      this.handlePlace(values);
                  }
                  ,
                  onCancel() {
                      console.log('Cancel');
                  },
              });  
    };

    handlePlace = (values: any) => {
        let _this:PlaceOrder = this;
        //var win:any = window;
        let uid:string = (conf as any).getCookie("userId");
        let newUrl:string = window.localStorage.getItem("host_pre")+"order/placeOrder?goodsId="+this.state.data.id+"&buyerId="+uid;
        //let plus:string = $("#buyForm").serialize(); //receiveMethod,addr
        newUrl =  newUrl + "&" + conf.getQueryStrFromObj(values);
        console.log(newUrl);

        $.ajax({
            type:"GET",
            crossDomain: true, 
            xhrFields: {
                withCredentials: true 
            },
            url:newUrl,
            dataType:"json",
            success:function(data){
                if(data.success == 0){
                    //alert(data.msg);
                    Modal.error({
                        title:'Error',
                        content:data.msg
                      })
                }
                else{
                    _this.setState({orderId:data.success});
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

    getImgSrc(gid:string):string{
        let imgSrc:string = window.localStorage.getItem("host_pre")+"goods/getgoodsmainimg?Id="+gid;
        return imgSrc;
        }

    render(){
        let uid = conf.getCookie("userId");
        if(this.state.data.sellerId== uid){
            return(
                <div className="demo2"><h1>
                    Sorry. 
                </h1><h2>You can't buy yourself goods.</h2></div>
            )            
        }
        else if(this.state.orderId != undefined){
            return(
                <div className="demo2">
                    <h1>
                    Thanks for placing your order. Your order id is {this.state.orderId}
                </h1>
                </div>
            )
        }
        else
        {
            let gid:string = this.state.data.id;
            let m:number= this.state.data.sellingMethod;
            let arrMethod:number[] = [];
            if((m & 1) == 1) arrMethod.push(1);
            if((m & 2) == 2) arrMethod.push(2);
            if((m & 4) == 4) arrMethod.push(4);
            let imgSrc:string = this.getImgSrc(gid);

            return(
                <div className="demo2">
                    <h2>{this.state.data.name}</h2>
                    <img src={imgSrc}></img>
                    <h3>price: $   {this.state.data.price}</h3>





                    <Form {...layout} ref={this.form} name="control-hooks" onFinish={this.onFinish}>
                        
                        <Form.Item name="receiveMethod" label="Receiving Method" rules={[{ required: true }]}>
                            <Select
                            placeholder="Select method"
                            onChange={this.onMethodChange}
                            allowClear
                            >
                            {arrMethod.map((element:any) =>{
                                    if(element == 1){
                                        return(
                                            <Option value={element}>Shipping</Option>
                                        )
                                    }
                                    if(element == 2){
                                        return(
                                            <Option value={element}>Self-pick</Option>
                                        )
                                    }
                                    if(element == 4){
                                        return(
                                            <Option value={element}>Home-dilivery</Option>
                                        )
                                    }
                                
                                    }

                                )}      

                            </Select>
                        </Form.Item>

                        <Form.Item name="receiveAddr" 
                        label="Receiving Address" 
                        rules={[{ required: true }]}>
                            <Input disabled={this.state.disableInput}/>
                        </Form.Item>
                        


                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                            Place Order
                            </Button>
                            
                        </Form.Item>
                        </Form>



                </div>
            )
        }
    }
}
