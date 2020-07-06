import React from 'react';
import { Link } from 'react-router-dom';
import jquery from "jquery";
import LoginModal from './LoginModal';
const $ = jquery;


export default class ShowOrderInfo extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state={
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
                    let popwin: any = this.refs.logwin;
                    popwin.setState({modalIsOpen:true})
                }
                
            }
          })
    }

    render(){
        let orderdata:any = this.state.orderdata;
        if(orderdata == null){
            return(
                <div>
                    This order does not exist!
                </div>
            )
        }else{
            return(
                <div>
                  <table>
                      <tr>
                          <td>Order No.</td>
                          <td>{orderdata.order.orderNo}</td>
                      </tr>
                      <tr>
                          <td>Goods Image</td>
                          <td><img /></td>
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
                          <td>{orderdata.order.receiveMethod}</td>
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
                  <LoginModal ref="logwin"/>
                </div>
            )
        }
        
        
    }
}