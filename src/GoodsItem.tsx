import React from 'react';
import LoginModal from './LoginModal';
import './GoodsItem.css';
import { Link } from 'react-router-dom';
import jquery from "jquery";
const $ = jquery;

export default class GoodsItem extends React.Component<any,any> {
    constructor(props:any,state:any){
        super(props,state);
    }

    render(){
        var sta = {
            pathname: '/showgoodsinfo',
            state: this.props.data//'我是通过state传值'
        }
        
        let imgSrc:string = window.localStorage.getItem("host_pre")+"goods/getgoodsmainimg?Id="+this.props.data.id;
        //let linkto:string = "/showgoodsinfo/"+this.props.data.id;
        return (
            <Link to={sta} >
                <div>
                    <img width="240px" height="240px" src={imgSrc}/>
                    <br />
                    <div className='goods-title'>{this.props.data.name}</div> <br/>
                    <span className='price'>${this.props.data.price} </span>
                </div>
            </Link>
        )
    }
}