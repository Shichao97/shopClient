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


//Place Order
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
                      //this.props.history.push("/payment/"+oid);
                      
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
        _this.setState({loading:true});
        $.ajax({
            type:"GET",
            crossDomain: true, 
            xhrFields: {
                withCredentials: true 
            },
            url:newUrl,
            dataType:"json",
            success:function(data){
                _this.setState({loading:false});
                if(data.success == 0){
                    //alert(data.msg);
                    Modal.error({
                        title:'Error',
                        content:data.msg
                      })
                }
                else{
                    _this.props.history.push("/payment/"+data.success);
                    //_this.setState({orderId:data.success});
                    //_this.setState({orderNo:data.orderNo});
                }
            },
            error: function(xhr:any, textStatus, errorThrown){
                _this.setState({loading:false});
                console.log("request status:"+xhr.status+" msg:"+textStatus)
                if(xhr.status=='604'){//not logged in error
                    let popwin: any = conf.loginWin;
                    popwin.setState({modalIsOpen:true})
                }
                
            }
          })
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
            let link:string = "/showOrderInfo/" + this.state.orderId;
            return(
                <div className="demo2">
                    <h1>
                    Thanks for placing your order. Your order no. is
                    <Link to={link}> {this.state.orderNo}</Link> 
                   
                </h1>
                </div>
            )
        }
        else
        {
            let gid:string = this.state.data.id;
            let m:number= this.state.data.sellingMethod;
            let arrMethod:any[] = [];
            if((m & 1) == 1) arrMethod.push({value:1,disabled:false});
            else arrMethod.push({value:1,disabled:true});
            if((m & 4) == 4) arrMethod.push({value:4,disabled:false});
            else arrMethod.push({value:4,disabled:true});
            if((m & 2) == 2) arrMethod.push({value:2,disabled:false});
            else arrMethod.push({value:2,disabled:true});
            
            let imgSrc:string = window.localStorage.getItem("host_pre")+"goods/getgoodsimg?Id="+gid+"&fname="+this.state.data.imgNames.split(";")[0];

            return(
                <div className="demo2">
                    <h2>Buy Goods</h2><p>{this.state.data.name}</p>
                    <img src={imgSrc}></img>
                    <h3 style={{color:'#FF0000'}}>price: $   {this.state.data.price}</h3>





                    <Form {...layout} ref={this.form} name="control-hooks" onFinish={this.onFinish}>
                        
                        <Form.Item name="receiveMethod" label="Receiving Method" rules={[{ required: true }]}>
                            <Select
                            placeholder="Select method"
                            onChange={this.onMethodChange}
                            allowClear
                            >
                            {arrMethod.map((element:any) =>{
                                    if(element.value == 1){
                                        return(
                                            <Option value={element.value} disabled={element.disabled}>Shipping</Option>
                                        )
                                    }
                                    else if(element.value == 2){
                                        return(
                                            <Option value={element.value} disabled={element.disabled}>Self-pick</Option>
                                        )
                                    }
                                    else if(element.value == 4){
                                        return(
                                            <Option value={element.value} disabled={element.disabled}>Home-dilivery</Option>
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
                            <Button type="primary" htmlType="submit" loading={this.state.loading}>
                            Place Order
                            </Button>
                            
                        </Form.Item>
                        </Form>



                </div>
            )
        }
    }
}
