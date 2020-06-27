import React from 'react';
import LoginModal from './LoginModal';
import * as ReactDOM from 'react-dom';
import jquery from "jquery";
import ImageUpload from './ImageUpload';
const $ = jquery;

export default class EditSellGoods extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = {
          imgName:[],
          goodsname:"",
          location:"",
          types:[],
          typeCode:"",
          price:0,
          sellingmethod:0,
          agreeMethod1:false,
          agreeMethod2:false,
          agreeMethod3:false,
          method1:0,
          method2:0,
          method3:0,
          msg:""
        }
      }

    componentDidMount(){
      let gid:number = this.props.match.params.gid;
      this.getExistImg(gid);

      let getDatas:any =  sessionStorage.getItem('goods_types');
        if(getDatas != null){
            let data = JSON.parse(getDatas);
            this.setState({types:data});
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
                let imgStr:string = data.imgNames;
                let arr:string[];
                if(imgStr == null){
                  arr = [];
                }
                arr= imgStr.split(";");
                _this.setState({imgName:arr});
                _this.setState({goodsname:data.name});
                _this.setState({location:data.location});
                _this.setState({typeCode:data.typeCode});
                _this.setState({price:data.price});
                _this.setState({sellingmethod:data.sellingMethod});
                if((data.sellingMethod & 1) == 1){
                  _this.setState({agreeMethod1:true});
                }
                if((data.sellingMethod & 2) == 2){
                  _this.setState({agreeMethod2:true});
                }
                if((data.sellingMethod & 4) == 4){
                  _this.setState({agreeMethod3:true});
                }

            }
          })
    }

    imgClicked(index:number){
      this.state.imgName.splice(index,1);
      this.setState({});
    }

    //拼接分号字符串
    combineImgNames(arr:number[]){
      if(arr == null || arr.length == 0){
        return "";
      }
      let re:string = "";
      for(let ele of arr){
        re += (ele)+";";
      }
      return re.substring(0,re.length-1);
    }


    handleEditGoods(){
        let _this: EditSellGoods = this;
        let formData = new FormData();

        //old:this.state.imgName
        let oldimgnames = _this.combineImgNames(_this.state.imgName);
        formData.append("oldimgnames",oldimgnames);

        //new
        let imgup:any = _this.refs.imgup;
        let i = 0; //新图怎么编号？
        for (let entry of imgup.state.imgs) {
          //console.log(entry); // 1, "string", false
          formData.append("img"+i,entry);
          i++;
        }

        //Other info
        let data= $("#editForm").serializeArray();  //不用拼data
        for(var p in data){
            formData.append(data[p].name,data[p].value);
        }
        
        let url1:string = window.localStorage.getItem("host_pre")+"goods/sell/edit";
        $.ajax({
          type:"POST",
          crossDomain: true, 
          xhrFields: {
              withCredentials: true 
          },
          url:url1,
          cache: false,
          data:formData,
          dataType:"json",
          processData: false,
          contentType: false,
          success:function(d){
              if(d.success == 1){
                _this.setState({msg:"edit success!"});
                 
              }else{
                _this.setState({msg:"edit failed! " + d.msg});
                  
                  
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

    handleChange = (event:any) =>  {
        
      switch(event.target.name){
        case "name":
          this.setState({goodsname: event.target.value});
          break;
        case "location":
          this.setState({location: event.target.value});
          break;
        case "typeCode":
          this.setState({typeCode: event.target.value});
          break;
        case "price":
          this.setState({price: event.target.value});
          break;
        case "method1":
          this.setState({agreeMethod1: !this.state.agreeMethod1});
          break;
        case "method2":
          this.setState({agreeMethod2: !this.state.agreeMethod2});
          break;
        case "method3":
          this.setState({agreeMethod3: !this.state.agreeMethod3});
          break;
       
      }
    }
    
    render(){
        let _this:EditSellGoods = this;
        let gid:number = this.props.match.params.gid;
       // this.getExistImg(gid);
        let imgname:string[] = this.state.imgName;
        let arry:any[] = this.state.types;
        let m:number = this.state.sellingmethod;
        
        let checked1 = <input type="checkbox" name="method1" value = "1" checked onChange={_this.handleChange}/>;
        if(this.state.agreeMethod1 == false){
          checked1 = <input type="checkbox" name="method1" value = "1" onChange={_this.handleChange}/> ;
        }
        let checked2 =<input type="checkbox" name="method2" value = "2" checked onChange={_this.handleChange}/>;
        if(this.state.agreeMethod2 == false){
          checked2 = <input type="checkbox" name="method2" value = "2" onChange={_this.handleChange}/>;
        }
        let checked3 = <input type="checkbox" name="method3" value = "4" checked onChange={_this.handleChange}/> ;
        if(this.state.agreeMethod3 == false){
          checked3 = <input type="checkbox" name="method3" value = "4" onChange={_this.handleChange}/>;
        }

        
        return(
            <div >
              <form method="post" action="#" id="editForm">
                   <table className="content-table">
                       <tr>
                          <td>goods name: </td>
                          <td><input type="text" id="name" name="name" value={this.state.goodsname} onChange={_this.handleChange}/>
                          </td>
                         </tr>

                       <tr>
                          <td>location: </td>
                          <td> <input type="text" id="location" name="location" value={this.state.location} onChange={_this.handleChange}/></td>
                       </tr>

                       <tr>
                       <td>classification:  </td>
                          <td>
                              <select name="typeCode" value={this.state.typeCode} onChange={_this.handleChange}>
                              {arry.map((element:any) =>{
                                
                                  return(
                                    <option value={element.code} >{element.categoryName}--{element.name}</option>
                                )
                                
                                
                                }

                            )}
                              </select>
                          </td>
                       </tr>

                       <tr>
                       <td>price: </td>
                          <td><input type="number" id="price" name='price' value={this.state.price} onChange={_this.handleChange}/></td>
                       </tr>

                       <tr>
                       <td>Selling Method:  </td>
                          <td>
                                {checked1} shipping
                                {checked2} self-pick
                                {checked3} home-dilivery
                              
                          </td>
                       </tr>

                       <tr>
                          <td>Images: </td>
                          <td>
                          {imgname.map((element:any,index:number) =>{
                      
                              let imgSrc:string = window.localStorage.getItem("host_pre")+"goods/sell/getgoodsimg?Id="+gid+"&fname="+element;
      
                              return(
                                <div className="upimgs"> 
                                <a><span><h1>Click to delete</h1></span>
                                <img src={imgSrc} onClick={()=> this.imgClicked(index)} width="100px" height="100px"/>
                                </a>
                                </div>
                              )
                            
                              }
                              )}

                             <ImageUpload ref="imgup"/>
                          </td>
                       </tr>
                   </table>
                   <input name="gid" value = {gid} type="hidden"/>
                   <button name="confirm" id='button' type="button" onClick={() => this.handleEditGoods()}>Confirm Edit</button>
                   <div>{this.state.msg}</div>
                </form>
                <LoginModal ref="logwin"/>
            
            </div>
        )
    }
}
