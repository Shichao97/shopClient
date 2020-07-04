import React from 'react';
import { Link } from 'react-router-dom';
import jquery from "jquery";
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
       
    }

    getImgSrc(gid:string):string{
        let imgSrc:string = window.localStorage.getItem("host_pre")+"goods/getgoodsmainimg?Id="+gid;
        return imgSrc;
        }

    render(){
        let gid:string = this.state.goodsdata.id;
        let m:number= this.state.goodsdata.sellingMethod;
        let arrMethod:number[] = [];
        if((m & 1) == 1) arrMethod.push(1);
        if((m & 2) == 2) arrMethod.push(2);
        if((m & 4) == 4) arrMethod.push(4);
        let imgSrc:string = this.getImgSrc(gid);
        return(
            <div>
                <form id="buyform">
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
                               <select>
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