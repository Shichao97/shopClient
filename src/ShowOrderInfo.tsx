import React from 'react';
import { Link } from 'react-router-dom';
import jquery from "jquery";
//import LoginModal from './LoginModal';
import {
    
    Button,
  } from 'antd';
import conf from './Conf';
import './MyAccount.css';
const $ = jquery;

export default class ShowOrderInfo extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state={
            payMsg:"",
            cancelMsg:"",
            confirmMsg:""
        }
    }

    componentDidMount(){
        let oid = this.props.match.params.oid;
        let _this:ShowOrderInfo = this;
        let newUrl:string = window.localStorage.getItem("host_pre")+"order/getOGById?orderId="+oid;
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
                _this.setState({orderdata:data});
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
    getReceiveMethod(m:number):string{
        if(m == 1){
            return "shipping";
        }else if(m == 2){
            return "self-pick";
        }else if(m == 4){
            return "home-dilivery";
        }else{
            return "";
        }
    }

    handlePay(){
        let oid = this.props.match.params.oid;
        let _this:ShowOrderInfo = this;
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
                    alert(data.msg);
                }
                else if(data.success == 1){
                    _this.setState({payMsg:"Payment Success"});
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
    handleCancel(){
        let oid = this.props.match.params.oid;
        let _this:ShowOrderInfo = this;
        let newUrl:string = window.localStorage.getItem("host_pre")+"order/cancelOrder?id="+oid;
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
                    alert(data.msg);
                }
                else if(data.success == 1){
                    _this.setState({cancelMsg:"Cancel Success"});
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
    handleConfirm(){
        let oid = this.props.match.params.oid;
        let _this:ShowOrderInfo = this;
        let newUrl:string = window.localStorage.getItem("host_pre")+"order/completeOrder?orderId="+oid;
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
                    alert(data.msg);
                }
                else if(data.success == 1){
                    _this.setState({confirmMsg:"Confirm Success"});
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
    render(){
        let orderdata:any = this.state.orderdata;
        if(orderdata == undefined){
            return(
                <div></div>
            )
        }
        let goodsImgSrc:string = window.localStorage.getItem("host_pre")+"goods/getgoodsmainimg?Id="+orderdata.goods.id;
        let receiveMethod:string = this.getReceiveMethod(orderdata.order.receiveMethod);
        let ordertable = <table className="my-table2">
        <tr>
            <td>Order No.</td>
            <td>{orderdata.order.orderNo}</td>
        </tr>
        <tr>
            <td>Goods Image</td>
            <td><img src={goodsImgSrc}/></td>
        </tr>
        <tr>
            <td>Goods Name</td>
            <td>{orderdata.goods.name}</td>
        </tr>
        <tr>
            <td>Order Price</td>
            <td>${orderdata.goods.price}</td>
        </tr>
        <tr>
            <td>Order Time</td>
            <td>{orderdata.order.orderTime}</td>
        </tr>
        <tr>
            <td>Receive Method</td>
            <td>{receiveMethod}</td>
        </tr>
        <tr>
            <td>Receive Address</td>
            <td>{orderdata.order.receiveAddr}</td>
        </tr>
        <tr>
            <td>Order Status</td>
            <td>{orderdata.order.status}</td>
        </tr>
        <tr>
            <td>Payment Status</td>
            <td>{orderdata.order.paymentStatus}</td>
        </tr>
    </table>

        if(orderdata == undefined){
            return(
                <div></div>
            )
        }else if(orderdata == null){
            return(
                <div>
                    This order does not exist!
                </div>
            )
        }else if(orderdata.order.paymentStatus == 0){
                      
            return(
                <div>
                  {ordertable}
                  <Button type="primary" onClick={() => this.handlePay()}>pay for this order</Button> &nbsp;&nbsp;&nbsp;
                  <Button type="primary" onClick={() => this.handleCancel()}>cancel the order</Button>
                  
                  
                  <span>{this.state.payMsg}</span>
                  <span>{this.state.cancelMsg}</span>
                </div>
            )
        }else if(orderdata.order.status == 0 && orderdata.order.paymentStatus == 1){
            return(
                <div>
                  {ordertable}
                  <input type="button" value="Confirm Received" onClick={() => this.handleConfirm()}/>
                  
                  <span>{this.state.confirmMsg}</span>
                </div>
            )
        }else{
            return(
                <div>
                  {ordertable}
                 
                 
                </div>
            )
        }
        
        
    }
}