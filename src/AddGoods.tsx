import React from 'react';
import LoginModal from './LoginModal';
import './Register.css';
import jquery from "jquery";
const $ = jquery;

export default class AddGoods extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state={
            id:"",
            un:"",
            types:[],
            msg:"",
            imgs:[]
        }
    }
    
    componentWillMount() {
        var win:any = window;
        let id:string = win.getCookie("userId");
        //console.log(id);
        this.setState({id:id});
        let un:string = win.getCookie("username");
        this.setState({un:un});
    }

    componentDidMount(){
        let getDatas:any =  sessionStorage.getItem('goods_types');
        if(getDatas != null){
            let data = JSON.parse(getDatas);
            this.setState({types:data});
        }
        
    }

    handleAdd(){
        let _this: AddGoods = this;
        let formData = new FormData();
        //let ele: any = $('#upfile')[0];
        //let appendTemp:any = ele.files[0];
        let i = 0;
        for (let entry of this.state.imgs) {
            //console.log(entry); // 1, "string", false
            formData.append("img"+i,entry);
            i++;
        }
        //formData.append("mainImg", appendTemp);  
        let url1:string = window.localStorage.getItem("host_pre")+"goods/sell/add";
        let data= $("#addForm").serializeArray();  //不用拼data
        for(var p in data){
            console.log(data[p].name);
            console.log(data[p].value);
            formData.append(data[p].name,data[p].value);
        }
        

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
                if(d.error != null){
                    _this.setState({msg:"add failed! " + d.error});
                }else{
                    _this.setState({msg:"add success!"});
                    
                    
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

    multiImagePreview() {
 
        let upMultilImagesObj:any = document.getElementById("upMultilImages");
        var fileList = upMultilImagesObj.files;
        
        for (var i = 0; i < fileList.length; i++) { 
            this.state.imgs.push(upMultilImagesObj.files[i]);
        }  
        this.setState({});
    }   

    imgClicked(index:number){
        this.state.imgs.splice(index,1);
        this.setState({});
    }

    render(){
        let _this:AddGoods = this;
        let arry:any[] = this.state.types;
        return(
            <div>
                <h2>Add your second-hand goods here!</h2>
                <form method="post" action="#" id="addForm">
                   <table className="content-table">
                       <tr>
                          <td>goods name: </td>
                          <td><input type="text" id="name" name="name"/>
                          </td>
                         </tr>

                       <tr>
                          <td>location: </td>
                          <td> <input type="text" id="location" name="location"/></td>
                       </tr>

                       <tr>
                       <td>classification:  </td>
                          <td>
                              <select name="typeCode">
                              {arry.map((element:any) =>{
                                return(
                                    <option value={element.code}>{element.categoryName}--{element.name}</option>
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
                <LoginModal ref="logwin"/>
            </div>
        )
        

    }
}