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
          selected:""
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
        let selected:string = this.state.selected;
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
                                  this.setState({selected:"selected"});
                                }
                                return(
                                    <option value={element.code} {selected}>{element.categoryName}--{element.name}</option>
                                )
                                }

                            )}
                              </select>
                          </td>
                       </tr>

                       <tr>
                       <td>price: </td>
                          <td><input type="number" id="price" name='price' /></td>
                       </tr>

                       <tr>
                       <td>Selling Method:  </td>
                          <td>
                              <input type="checkbox" name="method1" value = "1" /> shipping
                              <input type="checkbox" name="method2" value = "2" /> self-pick
                              <input type="checkbox" name="method3" value = "4" /> home-dilivery
                          </td>
                       </tr>

                       <tr>
                          <td>Images: </td>
                          <td>
                          <input type="file"  name="file" multiple id="upMultilImages" onChange={() => this.multiImagePreview()} accept="image/*" />
                            <div>
                            {
                                this.state.imgs.map((element:any,index:number) =>{
                                    return <div className="upimgs"> 
                                    <a><span><h1>Click to delete</h1></span>
                                    <img width="100px" height="100px" onClick={()=> this.imgClicked(index)}
                                    id={"img_"+index} 
                                    src={window.URL.createObjectURL(element)} /> 
                                    </a>
                                    </div>
                                })
                            }
                            </div>
                          </td>
                       </tr>
                   </table>
                   <button name="confirm" id='button' type="button" onClick={() => _this.handleAdd()}>Confirm Add</button>
                   <div>{this.state.msg}</div>
                </form>
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
            
            </div>
        )
    }
}
