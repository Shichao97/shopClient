import React from 'react';
import { Link } from 'react-router-dom';
import jquery from "jquery";
const $ = jquery;


export default class PlaceOrder extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        let sta:any = this.props.location.state;
        this.state={
            goodsdata:sta
        }
    }

    handlePlace(){
       
    }

    render(){
        return(
            <div>
                <form id="buyform">
                    <table>
                        <tr>
                            <td>

                            </td>
                            <td>
                                <img></img>
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
                                   
                                   //map option
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