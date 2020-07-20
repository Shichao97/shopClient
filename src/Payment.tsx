import React, { RefObject } from 'react';
import { Link } from 'react-router-dom';
import{Button,Modal,Radio,Spin} from 'antd';
import jquery from "jquery";
import conf from './Conf';
const $ = jquery;

export default class Payment extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state ={
            radioValue:1
        }
    }
    
    componentDidMount(){  //getOrderPrice
        let oid = this.props.match.params.oid;
       
        let _this = this;
        let newUrl:string = window.localStorage.getItem("host_pre")+"order/getOrder?orderId="+oid;
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
                    Modal.error({
                        title:'Error',
                        content:data.msg
                      })
                }
                else if(data.success == 1){
                    _this.setState({price:data.price});
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
    confirmPay(){
        Modal.confirm({
            title: 'Confirm pay?',
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'Wait and see',
            onOk: () => {
                this.handlePay();
            }
            ,
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    handlePay(){
        let oid = this.props.match.params.oid;
        console.log(oid);
        let _this = this;
        let newUrl:string = window.localStorage.getItem("host_pre")+"order/payOrder?orderId="+oid;
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
                else if(data.success == 1){
                    Modal.success({
                        title:'Success',
                        content:'Payment Success!'
                    })
                    _this.setState({orderNo:data.orderNo});
                    
                    
                    // let datas = _this.state.orderdata;
                    // datas.order.paymentStatus = 1;
                    // _this.setState({orderdata:datas});
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
    
    onChange=(e:any)=> {
        console.log('radio checked', e.target.value);
        this.setState({
            radioValue: e.target.value,
        });
      };
    render(){
        let oid = this.props.match.params.oid;
        let link:string = "/showOrderInfo/" + oid;
        if(this.state.price == undefined){
            return <div><h2>Payment Loading </h2><Spin></Spin></div>
        }else if(this.state.orderNo == undefined){
            return(
                <div>
                      <p>You need to pay $ {this.state.price}</p>
                      <p>
                      <Radio.Group onChange={this.onChange} value={this.state.radioValue}>
                            <Radio value={1}>Debit Card</Radio>
                            <Radio value={2}>Credit Card</Radio>
                            <Radio value={3}>Paypal</Radio>
                            <Radio value={4}>Apple Pay</Radio>
                      </Radio.Group>
                      </p>
                      <p><Button type="primary" onClick={() => this.confirmPay()}>pay for this order</Button></p>
                </div>
            )
        }else{
            return(
                <div className="demo2">
                    <h1>
                    Thanks for placing your order. Your order no. is
                    <Link to={link}> {this.state.orderNo}</Link> 
                   
                </h1>
                </div>
            )
            
        }
        
    }
}