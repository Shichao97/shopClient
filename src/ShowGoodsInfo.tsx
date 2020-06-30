import React from 'react';
import * as ReactDOM from 'react-dom';
import LoginModal from './LoginModal';
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

    render(){
        let fullTypeName:string = this.getTypes(this.state.data.typeCode);
        let imgSrc:string = this.getImgSrc(this.state.data.id);

        let tables = <table>
        <tr><img src={imgSrc}/></tr>
        <tr>
            name: {this.state.data.name}
        </tr>
        <tr>
            price: {this.state.data.price}
        </tr>
        <tr>
            location: {this.state.data.location}
        </tr>
        <tr>
            type: {fullTypeName}
        </tr>
        <tr>
            desciption: {this.state.description}
        </tr>
    </table>

        if(this.state.uid == this.state.data.sellerId){ //self-goods
            if(this.state.data.sellingMethod == 1){  //selling now
                return(
                    <div>
                        {tables}
                        <input type="button" value="Edit" />
                        <input type="button" value="Remove from the shelf" />
                    </div>
                )
            }else if(this.state.data.sellingMethod == 0){ //下架
                return(
                    <div>
                        {tables}
                        <input type="button" value="Put on the shelf again" />
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
        }else{
            if(this.state.data.sellingMethod == 1){  //selling now
                return(
                    <div>
                        {tables}
                        <input type="button" value="Buy Now" />
                        <input type="button" value="collect" />
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