import React from 'react';
import * as ReactDOM from 'react-dom';
import LoginModal from './LoginModal';
import ImageModal from './ImageModal';
import './SearchGoods.css';
import './Register.css';
import jquery from "jquery";
const $ = jquery;

export default class ShowGoodsInfo extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        let sta:any = this.props.location.state;
        this.state = {
            data:sta,
            uid:""
        }
    }

    componentWillMount(){
        var win:any = window;
        let uid:string = win.getCookie("userId");
        /*
        if(uid == ""){
            this.props.history.push(  "/login"  );
        }
        */
        this.setState({uid:uid});
        let getDatas:any =  sessionStorage.getItem('goods_types');
        let obj:any = new Object();
        if(getDatas != null){
            let data = JSON.parse(getDatas);
          for (let ele of data) {
            obj[ele.code] = ele;
          }
        }
        this.setState({types:obj});

        let imgStr:string = this.state.data.imgNames;
        let arr:string[];
        if(imgStr == null){
            arr = [];
        }
        else{
            arr= imgStr.split(";");
        }
        this.setState({imgName:arr});
        
    }

    getTypes(typeCode:string):string{
        let types:any = this.state.types;
        if(types==undefined){
            return "";
        }
        let fullTypeName:string = types[typeCode].categoryName + "--" + types[typeCode].name;
        return fullTypeName;
      }

    getImgSrc(gid:string):string{
    let imgSrc:string = window.localStorage.getItem("host_pre")+"goods/getgoodsmainimg?Id="+gid;
    return imgSrc;
    }

    openImgModal(index:number){
        let comp:any = this.refs.bigimg;
        comp.setState({gid:this.state.data.id,index:index,imgNames:this.state.imgName,modalIsOpen:true})
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
                    let popwin: any = _this.refs.logwin;
                    popwin.setState({modalIsOpen:true})
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
                    let popwin: any = _this.refs.logwin;
                    popwin.setState({modalIsOpen:true})
                }
                
            }
          })
    }
    getCollectIconSrc(gid:number):string{
        var myDate = new Date();
        let iconSrc:string = window.localStorage.getItem("host_pre")+"collect/getcollecticon?goodsId="+gid+"&memberId="+this.state.uid+"&size=1"+"&refresh="+myDate.getMilliseconds();
        return iconSrc;
    }

    clickCollect(){
        /*
        //未登录
        if(this.state.uid == ""){
            let popwin: any = this.refs.logwin;
            popwin.setState({modalIsOpen:true});
        }
        */
       
        //已登录
        var win:any = window;
        let gid = this.state.data.id;
        let _this:ShowGoodsInfo = this;
        let uid:string = win.getCookie("userId");
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
                    _this.setState({});
                }
            },
            error: function(xhr:any, textStatus, errorThrown){
                console.log("request status:"+xhr.status+" msg:"+textStatus)
                if(xhr.status=='604'){//未登录错误
                    let popwin: any = _this.refs.logwin;
                    popwin.setState({modalIsOpen:true})
                }
                
            }
          })
    }

    clickBuy(){
        //未登录
        if(this.state.uid == ""){
            let popwin: any = this.refs.logwin;
            popwin.setState({modalIsOpen:true});
        }
        this.props.history.push('/placeOrder',this.state.data);

    }
    render(){
        let gid = this.state.data.id;
        let fullTypeName:string = this.getTypes(this.state.data.typeCode);
        let imgSrc:string = this.getImgSrc(this.state.data.id);
        let imgname:string[] = this.state.imgName;
        let collectIconSrc:string = this.getCollectIconSrc(gid);
        let tables = <table className="content-table">
      
        
        <tr> 
            <td></td>
            <td>
            {imgname.map((element:any,index:number) =>{
                      
                      let imgSrc:string = window.localStorage.getItem("host_pre")+"goods/getgoodsimg?Id="+gid+"&fname="+element;

                      return(
                        <div className="upimgs"> 
                        <a><span><h1>Click to bigger</h1></span>
                          <img src={imgSrc} width="100px" height="100px" onClick={() => this.openImgModal(index)}/>
                        </a>
                        </div>
                      )
                    
                      }
                      )}
            </td>
        </tr>
        <tr>
            <td>
                name: 
            </td>
            <td>
                {this.state.data.name}
            </td>
        </tr>
        <tr>
            <td>
                price:           
            </td>
            <td>
                {this.state.data.price}    
            </td>
            
        </tr>
        <tr>
            <td>
                location: 
            </td>
            <td>
                {this.state.data.location}
            </td>
            
        </tr>
        <tr>
            <td>
                type: 
            </td>
            <td>
                {fullTypeName}
            </td>
            
        </tr>
        <tr>
            <td>
                desciption:
            </td>
            <td>
                {this.state.description}
            </td>
             
        </tr>
        <ImageModal ref="bigimg"/>
        <LoginModal ref="logwin"/>
    </table>

        if(this.state.uid == this.state.data.sellerId){ //self-goods
            if(this.state.data.status == 1){  //selling now
                return(
                    <div>
                        {tables}
                        <input type="button" value="Edit" onClick={() => this.clickEdit()}/>
                        <input type="button" value="Remove from the shelf" onClick={() => this.clickRemoveFromShelf()}/>
                    </div>
                )
            }else if(this.state.data.status == 0){ //下架
                return(
                    <div>
                        {tables}
                        <input type="button" value="Put on the shelf again" onClick={() => this.clickPutOnShelf()}/>
                    </div>
                )
            }else{//sold out
                return(
                    <div>
                        {tables}
                        Sold out !!!
                    </div>
                )
            }
        }else{ //未登录或者不是自己商品
            if(this.state.data.status == 1){  //selling now
                return(
                    <div>
                        {tables}
                        <input type="button" value="Buy Now" onClick={() => this.clickBuy()}/>
                        
                        <img src={collectIconSrc} onClick={() => this.clickCollect()}/>
                        <input type="button" value="Leave a note" />
                        
                    </div>
                )
            }else{
                return(
                    <div>
                        {tables}
                        Not on the shelf!
                    </div>
                )
            }
        }
    }
}