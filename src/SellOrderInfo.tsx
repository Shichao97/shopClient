import React from 'react';
import { Link } from 'react-router-dom';
import jquery from "jquery";
//import LoginModal from './LoginModal';
import {
    Row,
    Col,
    Button,
    Modal,
    Tooltip,
  } from 'antd';
import conf from './Conf';
import './MyAccount.css';
const $ = jquery;

export default class SellOrderInfo extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state={
        }
    }

    componentDidMount(){
        let oid = this.props.match.params.oid;
        let _this = this;
        let newUrl:string = window.localStorage.getItem("host_pre")+"order/getSellerOGById?orderId="+oid;
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
                if(data==null)
                    Modal.error({
                    title:'Error',
                    content:"No order found. Because a wrong orderId or the order is deleted"
                  })
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
    confirmPay(){
        Modal.confirm({
            title: 'Confirm pay?',
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'Wait and see',
            onOk: () => {
                this.handlePay()
            }
            ,
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    handlePay(){
        let oid = this.props.match.params.oid;
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
                    let datas = _this.state.orderdata;
                    datas.order.paymentStatus = 1;
                    _this.setState({orderdata:datas});
                    
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
    confirmCancel(){
        Modal.confirm({
            title: 'Confirm cancel?',
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'Wait and see',
            onOk: () => {
                this.handleCancel();
            }
            ,
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    handleCancel(){
        let oid = this.props.match.params.oid;
        let _this = this;
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
                    //alert(data.msg);
                    Modal.error({
                        title:'Error',
                        content:data.msg
                    })
                }
                else if(data.success == 1){
                    Modal.success({
                        title:'Success',
                        content:'Cancel Success!'
                    })
                    // let datas = _this.state.orderdata;
                    // datas.order.status = -1;
                    // _this.setState({orderdata:datas});
                    _this.props.history.goBack();
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
    confirmConfirm(){
        Modal.confirm({
            title: 'Confirm received?',
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'Wait and see',
            onOk: () => {
                this.handleConfirm();
            }
            ,
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    handleConfirm(){
        let oid = this.props.match.params.oid;
        let _this = this;
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
                    //alert(data.msg);
                    Modal.error({
                        title:'Error',
                        content:data.msg
                      })
                }
                else if(data.success == 1){
                    Modal.success({
                        title:'Success',
                        content:'Confirm Success!'
                    })
                    let datas = _this.state.orderdata;
                    datas.order.status = 1;
                    _this.setState({orderdata:datas});
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

    onBuyerClicked(ele:any){
        let popwin: any = conf.msgWin;
        popwin.setState({modalIsOpen:true,toId:ele.buyerId,toName:ele.buyerName});
  
        
    }

    getpayment(status:number):string{
        if(status == 0) return "not yet paid";
        else return "already paid";
    }

    getStatus(status:number):string{
      
        if(status == 0){
          return "not finished";
        }else if(status == 1){
          return "already finished";
        }else{
          return "already canceled";
        }
    }
   
    render(){
        let orderdata:any = this.state.orderdata;
        if(orderdata == undefined){
            return(
                <div></div>
            )
        }
        let goodsImgSrc:string = window.localStorage.getItem("host_pre")+"goods/getgoodsimg?Id="+orderdata.goods.id+"&fname="+orderdata.goods.imgNames.split(";")[0];
        let receiveMethod:string = this.getReceiveMethod(orderdata.order.receiveMethod);
        let payment:string = this.getpayment(orderdata.order.paymentStatus);
        let status:string = this.getStatus(orderdata.order.status);
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
            <td>{(new Date(orderdata.order.orderTime) as any).format("yyyy-MM-dd hh:mm")}</td>
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
            <td>{status}</td>
        </tr>
        <tr>
            <td>Payment Status</td>
            <td>{payment}</td>
        </tr>
        <tr>
            <td>Buyer</td>
            <td><Tooltip placement="topLeft" title={"Chat with the buyer"}>
            <a  onClick={()=>this.onBuyerClicked(this.state.orderdata.order)}><img src={window.localStorage.getItem("host_pre")+"member/geticon?Id="+this.state.orderdata.order.buyerId+"&size=1"}/>
            {this.state.orderdata.order.buyerName} (Chat...)</a>
          </Tooltip></td>
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
        }
        else{
            return(
                <div>
                  {ordertable}
                  <p/>
                  <Button onClick={()=>this.props.history.goBack()}>Go back</Button>
                </div>
            )
        }
        
        
    }
}