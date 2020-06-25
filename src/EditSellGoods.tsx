import React from 'react';
import * as ReactDOM from 'react-dom';
import jquery from "jquery";
const $ = jquery;

export default class EditSellGoods extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = {
          imgName:[]
        }
      }

    
    getExistImg(gid:number){
        let newUrl:string = window.localStorage.getItem("host_pre")+"goods/sell/getgoodsinfo?Id="+gid;
        let _this:EditSellGoods = this;
        $.ajax({
            type:"GET",
            crossDomain: true, 
            xhrFields: {
                withCredentials: true 
            },
            url:newUrl,
            dataType:"json",
            success:function(data){
                let imgStr:string = data.filename;
                let arr:string[] = imgStr.split(";");
                _this.setState({imgName:arr});
            }
          })
    }
    render(){
        let gid:number = this.props.match.params.gid;
        this.getExistImg(gid);
        let imgname:string[] = this.state.imgName;
        
        return(
            <div>
                {imgname.map((element:any) =>{
                      var myDate = new Date();
                      let imgSrc:string = window.localStorage.getItem("host_pre")+"goods/sell/getgoodsimg?Id="+gid+"&fname="+element+"&refresh="+myDate.getMilliseconds();
      
                      return(
                        <img src={imgSrc}/>
                      )
                    
                    }
                )}
            
            </div>
        )
    }
}
