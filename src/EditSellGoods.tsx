import React from 'react';
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
          sellingmethod:0
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
                _this.setState({typecode:data.typeCode});
                _this.setState({price:data.price});
                _this.setState({sellingmethod:data.sellingMethod});
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
        let arry:any[] = this.state.types;
        let m:number = this.state.sellingmethod;
        let checked1 = <input type="checkbox" name="method1" value = "1" checked />;
        if((m & 1) != 1){
          checked1 = <input type="checkbox" name="method1" value = "1" /> ;
        }
        let checked2 =<input type="checkbox" name="method2" value = "2" checked />;
        if((m & 2) != 2){
          checked2 = <input type="checkbox" name="method2" value = "2" />;
        }
        let checked3 = <input type="checkbox" name="method3" value = "4" checked /> ;
        if((m & 4) != 4){
          checked3 = <input type="checkbox" name="method3" value = "4" />;
        }


        return(
            <div >
              <form method="post" action="#" id="editForm">
                   <table className="content-table">
                       <tr>
                          <td>goods name: </td>
                          <td><input type="text" id="name" name="name" value={this.state.goodsname}/>
                          </td>
                         </tr>

                       <tr>
                          <td>location: </td>
                          <td> <input type="text" id="location" name="location" value={this.state.location}/></td>
                       </tr>

                       <tr>
                       <td>classification:  </td>
                          <td>
                              <select name="typeCode">
                              {arry.map((element:any) =>{
                                if(this.state.typecode == element.code){
                                  return(
                                    <option value={element.code} selected >{element.categoryName}--{element.name}</option>
                                  )
                                }else{
                                  return(
                                    <option value={element.code}>{element.categoryName}--{element.name}</option>
                                )
                                }
                                
                                }

                            )}
                              </select>
                          </td>
                       </tr>

                       <tr>
                       <td>price: </td>
                          <td><input type="number" id="price" name='price' value={this.state.price}/></td>
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
                                <img src={imgSrc} onClick={()=> this.imgClicked(index)}/>
                                </a>
                                </div>
                              )
                            
                              }
                              )}

                             <ImageUpload ref="imgup"/>
                          </td>
                       </tr>
                   </table>
                   <div>{this.state.msg}</div>
                </form>
                
            
            </div>
        )
    }
}
