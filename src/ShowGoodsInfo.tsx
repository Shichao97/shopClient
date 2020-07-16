import React from 'react';
import * as ReactDOM from 'react-dom';
//import LoginModal from './LoginModal';
import ImageModal from './ImageModal';
import './SearchGoods.css';
import './Register.css';

import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    Table,
  } from 'antd';
  import { SmileTwoTone, HeartTwoTone, HeartFilled ,HeartOutlined} from '@ant-design/icons';
import jquery from "jquery";
import MessageModal from './MessageModal';
import conf from './Conf'
import GoodsItem from './GoodsItem';

const $ = jquery;

export default class ShowGoodsInfo extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        let sta:any = this.props.location.state;
        this.state = {
            // data:sta.g,
            // seller:sta.m,
            uid:"",
            imgNames:[],
            types: conf.goods_types
        }
    }

    imgRender(gid:any,ele:any){
      //let ele = record["c_5"]
      let imgSrc=window.localStorage.getItem("host_pre")+"goods/getgoodsimg?Id="+gid+"&fname="+ele
      if(ele == undefined) return <div></div>
      else
      return (
      <div style={{ alignItems: "center" }}>
          
          <a onClick={() => this.openImgByName(ele)}><img className="img_middle" src={imgSrc}/> </a>
          
          </div>           
    )}
    
    
    columns:any[] = [
      {
        title: 'Item0',
        key: 'c_0',
        
        render:(text:any, record:any) =>{
          let ele = record["c_0"]
          return this.imgRender(record.gid,ele);
        },
        align:'center',
      },
      {
        title: 'Item1',
        key: 'c_1',
        align:"center",
        render:(text:any, record:any) =>{
          let ele = record["c_1"]
          return this.imgRender(record.gid,ele);
        },
    
      },
      {
        title: 'Item2',
        key: 'c_2',
        align:"center",
        render:(text:any, record:any) =>{
          let ele = record["c_2"]
          return this.imgRender(record.gid,ele);
        },

      },
      {
        title: 'Item3',
        key: 'c_3',
        align:"center",
        render:(text:any, record:any) =>{
          let ele = record["c_3"]
          return this.imgRender(record.gid,ele);
        },

      },
      {
        title: 'Item4',
        key: 'c_4',
        align:"center",
        render:(text:any, record:any) =>{
          let ele = record["c_4"]
          return this.imgRender(record.gid,ele);
        },

      },
      {
        title: 'Item5',
        key: 'c_5',
        align:"center",
        render:(text:any, record:any) =>{
          let ele = record["c_5"]
          return this.imgRender(record.gid,ele);
        },

      }
    ]



    componentWillMount(){
      let id = this.props.match.params.id;
      let _this = this;
      let newUrl:string = window.localStorage.getItem("host_pre")+"goods/getGMById?id="+id;
      console.log(newUrl);
      $.ajax({
          type:"GET",
          // crossDomain: true, 
          // xhrFields: {
          //     withCredentials: true 
          // },
          url:newUrl,
          dataType:"json",
          success:function(data){
              if(data == null) _this.setState({data:null,seller:null});
              else {
                _this.setState({data:data.g,seller:data.m});
                let imgStr:string = data.g.imgNames;
                let arr:string[];
                if(imgStr == null){
                    arr = [];
                }
                else{
                    arr= imgStr.split(";");
                }
                _this.setState({imgNames:arr});

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

    componentDidMount(){
      let _this = this;
      window.onresize = function(){
  
        _this.setState({});
      }


    }



    getImgSrc(gid:string):string{
    let imgSrc:string = window.localStorage.getItem("host_pre")+"goods/getgoodsmainimg?Id="+gid;
    return imgSrc;
    }

    openImgModal(index:number){
        let comp:any = this.refs.bigimg;
        comp.setState({gid:this.state.data.id,index:index,imgNames:this.state.imgNames,modalIsOpen:true})
    }
    openImgByName(fname:string){
      this.state.imgNames.map((element:any,index:number) =>{
        if(element == fname)  this.openImgModal(index);
      })
  }
    clickEdit(){
        let gid = this.state.data.id;
        this.props.history.push("/editsellgoods/"+gid);
    }

    clickRemoveFromShelf(){
        let gid = this.state.data.id;
        let _this:ShowGoodsInfo = this;
        let newUrl:string = window.localStorage.getItem("host_pre")+"goods/sell/removefromshelf?gid="+gid;
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
                }else{
                    alert(data.msg);
                    _this.props.history.push(  "/searchGoods"  );            
                }
            },
            error: function(xhr:any, textStatus, errorThrown){
                console.log("request status:"+xhr.status+" msg:"+textStatus)
                if(xhr.status=='604'){//未登录错误
                    let popwin: any = conf.loginWin;
                    popwin.setState({modalIsOpen:true,comp:_this})
                }
                
            }
          })
    }

    clickPutOnShelf(){
        let gid = this.state.data.id;
        let _this:ShowGoodsInfo = this;
        let newUrl:string = window.localStorage.getItem("host_pre")+"goods/sell/putonshelf?gid="+gid;
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
                }else{
                    alert(data.msg);
                    _this.props.history.push(  "/searchGoods"  );            
                }
            },
            error: function(xhr:any, textStatus, errorThrown){
                console.log("request status:"+xhr.status+" msg:"+textStatus)
                if(xhr.status=='604'){//未登录错误
                    let popwin: any = conf.loginWin;
                    popwin.setState({modalIsOpen:true,comp:_this})
                }
                
            }
          })
    }
    getCollectIconSrc(gid:number):string{
        var myDate = new Date();
        let iconSrc:string = window.localStorage.getItem("host_pre")+"collect/getcollecticon?goodsId="+gid+"&memberId="+conf.getCookie("userId")+"&size=1"+"&refresh="+myDate.getMilliseconds();
        return iconSrc;
    }

    clickCollect(){
        
        //未登录

       
        //已登录
        //var win:any = window;
        let gid = this.state.data.id;
        let _this:ShowGoodsInfo = this;
        let uid:string = (conf as any).getCookie("userId");
        let newUrl:string = window.localStorage.getItem("host_pre")+"collect/edit/clickcollect?goodsId="+gid+"&memberId="+uid;
        
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
                    _this.setState({like:data.like});
                }
            },
            error: function(xhr:any, textStatus, errorThrown){
                console.log("request status:"+xhr.status+" msg:"+textStatus)
                if(xhr.status=='604'){//未登录错误
                    let popwin: any = conf.loginWin;
                    popwin.setState({modalIsOpen:true,comp:_this})
                }
                
            }
          })
    }

    clickBuy(){
        //未登录
        //var win:any = window;
        let uid:string = (conf as any).getCookie("userId");
        if(uid == ""){
            let popwin: any = conf.loginWin;
            popwin.setState({modalIsOpen:true,comp:this});
        }
        this.props.history.push({pathname:'/placeOrder',state:this.state.data});

    }

    openTalkWindow(){
        let cf:any = conf;
        let uid = cf.getCookie("userId");
        let username = cf.getCookie("username");
        if(uid==""){
            let popwin: any = conf.loginWin;
            popwin.setState({modalIsOpen:true,comp:this});
        }
        else{
            let popwin: any = conf.msgWin;
            popwin.setState({modalIsOpen:true,toId:this.state.seller.id,toName:this.state.seller.userName});
            //popwin.init();
        }
    }

    hasLoadIcon = false;
    getLikeIcon(){

        var cf:any = conf;
        let gid = this.props.match.params.id;//this.state.data.id;
        if(cf.getCookie == undefined) return undefined;
        let uid:string = cf.getCookie("userId");
        let outline = <HeartOutlined style={{ color: 'hotpink',fontSize: '30px' }} onClick={() => this.clickCollect()}/>;
        let filled = <HeartFilled  style={{ color: 'hotpink',fontSize: '30px' }} onClick={() => this.clickCollect()}/>;
        if(uid=="") return outline;
        else if(this.state.like == undefined && this.hasLoadIcon == false){
            this.hasLoadIcon = true;

            this.loadIconState(gid,uid);
            return undefined;
        }
        else{
            return  this.state.like == true?filled:outline;

        }

    }

    loadIconState(gid:any,uid:any){
        let newUrl:string = window.localStorage.getItem("host_pre")+"collect/edit/getIsLike?goodsId="+gid+"&memberId="+uid;
        let _this:ShowGoodsInfo = this;
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
                    _this.setState({like:data.like});
                }
            },
            error: function(xhr:any, textStatus, errorThrown){
                console.log("request status:"+xhr.status+" msg:"+textStatus)
                if(xhr.status=='604'){//未登录错误
                    let popwin: any = conf.loginWin;
                    popwin.setState({modalIsOpen:true,comp:_this})
                }
                
            }
          })        
        return false;
    }

    render(){
        if(this.state.data === undefined){
            return <div></div>
        }        
        if(this.state.data === null){
          return <h1 className="msg_error">This goods is missing.</h1>
        }

  
        let arry = this.state.imgNames;
        
        let n = Math.floor(document.body.clientWidth*0.4/185);
        if(n<=0) n = 1;
        else if(n>this.columns.length) n = this.columns.length;
        if(arry.length>0 && arry.length<n) {
          n = arry.length;
        }
        let columns:any[] = [];
        for(var k=0;k<n;k++){
          columns.push(this.columns[k]);
        }  

        let allDatas = [];
      
        let rowNum = Math.ceil(arry.length/n);
       for(var i=0;i<rowNum;i++){
          let rowDatas:any = {key:"r_"+i};//key:"r_"+i
          for(var j=0;j<n;j++){
            if(i*n+j>= arry.length) break
            let ele = arry[i*n+j];
            rowDatas["c_"+j] = (ele);
            
          }
          rowDatas.gid = this.state.data.id;
          allDatas.push(rowDatas);
  
        }


        let gid = this.props.match.params.id;//this.state.data.id;
        let uid = conf.getCookie("userId");
        let fullTypeName:string = conf.getFullTypeName(this.state.data.typeCode);
        let imgSrc:string = this.getImgSrc(this.state.data.id);
        
        let collectIconSrc:string = this.getCollectIconSrc(gid);
        //let tables = <table className="content-table">
        let btns;

        if(uid == this.state.data.sellerId){ //self-goods
            if(this.state.data.status == 1){  //selling now
                //return(
                    
                    btns = <Col span={24}>
 
                        <Button type="primary" onClick={() => this.clickEdit()}>Edit</Button>
                        &nbsp;&nbsp;
                        <Button type="primary"  onClick={() => this.clickRemoveFromShelf()}>Remove from the shelf</Button>
                    </Col>
                    
                //)
            }else if(this.state.data.status == 0){ //下架
                // return(
                    btns = <Col span={24}>
                        {/* {tables} */}
                        <Button  type="primary" onClick={() => this.clickPutOnShelf()}>Put on the shelf again</Button>
                    </Col>
                // )
            }else{//sold out
                // return(
                    btns =  <Col span={24}>
                        {/* {tables} */}
                        Sold out !!!
                    </Col>
                // )
            }
        }else{ //未登录或者不是自己商品
            if(this.state.data.status == 1){  //selling now

                btns =   <Col span={24}>
                         
                        
                        <Button  type="primary" onClick={() => this.clickBuy()}>Buy Now</Button>
                        &nbsp;&nbsp;
                        <Button  type="primary" >Leave a note</Button>
                        &nbsp;&nbsp;
                        <Button type="primary" onClick={()=>this.openTalkWindow()}>Talk to seller</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Tooltip title="Like & Dislike">{this.getLikeIcon()}</Tooltip>
                    </Col>
                // )
            }else{
                // return(
                    btns =   <Col span={24}>
                        {/* {tables} */}
                        Not on the shelf!
                    </Col>
                // )
            }
        }

      
        return <div className="show_goods_info">
            <h2>{this.state.data.name}</h2>
          <Table dataSource={allDatas}  columns={columns}  showHeader={false}  pagination={ false }/>
        
        <Row  gutter={[16, 6]}>
            <Col span={8} className="right_info">
                name: 
            </Col>
            <Col span={16}>
            {this.state.data.name}
            </Col>
        </Row>
        <Row gutter={[16, 6]}>
            <Col span={8} className="right_info">
                price:           
            </Col>
            <Col span={16}>
                {this.state.data.price}    
            </Col>
            
        </Row>
        <Row gutter={[16, 6]}>
            <Col span={8} className="right_info">
                location: 
            </Col> 
            <Col span={16}>
            {this.state.data.location}
            </Col>
            
        </Row>
        <Row gutter={[16, 6]}>
            <Col span={8} className="right_info">
                type: 
            </Col>
            <Col span={16}>
            {fullTypeName}
            </Col>
            
        </Row>
        <Row gutter={[16, 6]}>
            <Col span={8} className="right_info">
                desciption:
            </Col>
            <Col span={16}>
            {this.state.description}
            </Col>
             
        </Row>

        <ImageModal ref="bigimg"/>
        
        
 
        {btns}
        <Row><Col>&nbsp;</Col></Row>
        </div>

       
    }
}