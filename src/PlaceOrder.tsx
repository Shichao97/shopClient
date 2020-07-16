import React from 'react';
import { Link } from 'react-router-dom';
import jquery from "jquery";
//import LoginModal from './LoginModal';
import conf from './Conf'
import { Modal } from 'antd';

const $ = jquery;


export default class PlaceOrder extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state={
        }
    }

    componentWillMount(){
        let sta:any = this.props.location.state;
        this.setState({goodsdata:sta});
    }

    handlePlace(){
        let _this:PlaceOrder = this;
        //var win:any = window;
        let uid:string = (conf as any).getCookie("userId");
        let newUrl:string = window.localStorage.getItem("host_pre")+"order/placeOrder?goodsId="+this.state.goodsdata.id+"&buyerId="+uid;
        let plus:string = $("#buyForm").serialize(); //receiveMethod,addr
        newUrl =  newUrl + "&" + plus;
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
        if(this.state.orderId != undefined){
            return(
                <div>
                    Thanks for placing your order. Your order id is {this.state.orderId}
                </div>
            )
        }else{
            let gid:string = this.state.goodsdata.id;
            let m:number= this.state.goodsdata.sellingMethod;
            let arrMethod:number[] = [];
            if((m & 1) == 1) arrMethod.push(1);
            if((m & 2) == 2) arrMethod.push(2);
            if((m & 4) == 4) arrMethod.push(4);
            let imgSrc:string = this.getImgSrc(gid);
            return(
                <div>
                    <form id="buyForm">
                        <table>
                            <tr>
                                <td>

                                </td>
                                <td>
                                    <img src={imgSrc}></img>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    price:
                                </td>
                                <td>
                                    {this.state.goodsdata.price}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    Receiving Method:
                                </td>
                                <td>
                                <select name="receiveMethod">
                                {arrMethod.map((element:any) =>{
                                    if(element == 1){
                                        return(
                                            <option value={element}>shipping</option>
                                        )
                                    }
                                    if(element == 2){
                                        return(
                                            <option value={element}>self-pick</option>
                                        )
                                    }
                                    if(element == 4){
                                        return(
                                            <option value={element}>home-dilivery</option>
                                        )
                                    }
                                
                                    }

                                )}
                                </select>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    Receiving Address:
                                </td>
                                <td>
                                    <input name="receiveAddr"></input>
                                </td>
                            </tr>

                        </table>
                        <input type="button" value="place your order" onClick={() => this.handlePlace()}/>
                    </form>

                </div>
            )
        }
    }
}