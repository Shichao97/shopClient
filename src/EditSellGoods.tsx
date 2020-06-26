import React from 'react';
import * as ReactDOM from 'react-dom';
import jquery from "jquery";
import ImageUpload from './ImageUpload';
const $ = jquery;

export default class EditSellGoods extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = {
          imgName:[]
        }
      }

    componentDidMount(){
      let gid:number = this.props.match.params.gid;
      this.getExistImg(gid);
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
                let imgStr:string = data.imgNames;
                let arr:string[];
                if(imgStr == null){
                  arr = [];
                }
                arr= imgStr.split(";");
                _this.setState({imgName:arr});
            }
          })
    }

    imgClicked(index:number){
      this.state.imgName.splice(index,1);
      this.setState({});
    }
    render(){
        let gid:number = this.props.match.params.gid;
       // this.getExistImg(gid);
        let imgname:string[] = this.state.imgName;
        
        return(
            <div>
                {imgname.map((element:any,index:number) =>{
                      
                      let imgSrc:string = window.localStorage.getItem("host_pre")+"goods/sell/getgoodsimg?Id="+gid+"&fname="+element;
      
                      return(
                        <img src={imgSrc} onClick={()=> this.imgClicked(index)}/>
                      )
                    
                    }
                )}

            <ImageUpload ref="imgup"/>
            
            </div>
        )
    }
}
