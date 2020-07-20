import React, { RefObject } from 'react';
//import LoginModal from './LoginModal';
import './GoodsItem.css';
import { Link } from 'react-router-dom';
import jquery from "jquery";
const $ = jquery;

export default class GoodsItem extends React.Component<any,any> {
    constructor(props:any,state:any){
        super(props,state);
    }
    divRef:RefObject<any> = React.createRef();

    componentDidUpdate(){
        if(this.divRef.current != null){
            let w = this.divRef.current.clientWidth;
            let h = this.divRef.current.clientHeight;
        }        
    }

    divWidth = 100;
    componentDidMount(){
        let _this = this;
        window.onresize = function(){
          _this.divWidth = _this.divRef.current.clientWidth;
          _this.setState({});
        }
  
        this.divRef.current.onresize = function(){
            _this.divWidth = _this.divRef.current.clientWidth;
            //_this.setState({});
          }
    }
    render(){
        if(this.props.data == undefined||this.props.data.g == undefined) {
            return (<div></div>)
        }
        // var sta = {
        //     pathname: '/showgoodsinfo',
        //     state: this.props.data//'我是通过state传值'
        // }
        
        let imgSrc:string = window.localStorage.getItem("host_pre")+"goods/getgoodsmainimg?Id="+this.props.data.g.id;
        //let linkto:string = "/showgoodsinfo/"+this.props.data.id;
        let memberImgSrc:string = window.localStorage.getItem("host_pre")+"member/geticon?Id="+this.props.data.g.sellerId+"&size=0";
        let school = this.props.data.m.schoolCode == undefined?"":"("+this.props.data.m.schoolCode+")";
        let linkto = '/showgoodsinfo/'+this.props.data.g.id;
        if(this.divRef.current != null){
            let w = this.divRef.current.clientWidth;
            let h = this.divRef.current.clientHeight;
        }
        
        return(
            
                <div ref={this.divRef}>

            
                    <Link to= {linkto}>
                    
                    <img className="img_big" src={imgSrc}/>
                    
                    <br />
                    <div className='goods-title'>{this.props.data.g.name}</div> <br/>
                    </Link>
                    <span className='price'>${this.props.data.g.price} </span>
                    
                    <span ><img src={memberImgSrc}/> {this.props.data.m.userName} {school}</span>
            
           
                    
                </div>
            
        )
    }
}