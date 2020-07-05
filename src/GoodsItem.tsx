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
        
        let imgSrc:string = window.localStorage.getItem("host_pre")+"goods/getgoodsmainimg?Id="+this.props.data.g.id;
        //let linkto:string = "/showgoodsinfo/"+this.props.data.id;
        let memberImgSrc:string = window.localStorage.getItem("host_pre")+"member/geticon?Id="+this.props.data.g.sellerId+"&size=1"+"&refresh=";
        return (
            <Link to={sta} >
                <div>
                    <img width="240px" height="240px" src={imgSrc}/>
                    <br />
                    <div className='goods-title'>{this.props.data.g.name}</div> <br/>
                    <span className='price'>${this.props.data.g.price} </span>
                    <span ><img src={memberImgSrc}/> {this.props.data.m.userName} ({this.props.data.m.location})</span>
                </div>
            </Link>
        )
    }
}