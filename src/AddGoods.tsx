import React from 'react';
import jquery from "jquery";
const $ = jquery;

export default class AddGoods extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state={
            types:[],
            msg:""
        }
    }

    componentDidMount() {
        let _this: AddGoods = this;
        $.ajax({
          type:"GET",
          url:"http://localhost:8080/goodstype/showAll",
          dataType:"json",
          success:function(data){
            _this.setState({types:data});
          },
          })
      }

    handleAdd(){
        let _this: AddGoods = this;
        let formData = new FormData();
        let ele: any = $('#upfile')[0];
        let appendTemp:any = ele.files[0];
        formData.append("mainImg", appendTemp);  
        let url1:string = "http://localhost:8080/goods/add";
        let data= $("#addForm").serializeArray();  //不用拼data
        for(var p in data){
            console.log(data[p].name);
            console.log(data[p].value);
            formData.append(data[p].name,data[p].value);
        }
        
        //let obj:any = {"mainImg":appendTemp};
        
        //data.push(obj); 
        
        $.ajax({
            type:"POST",
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
            }
        })
    }

    render(){
        let _this:AddGoods = this;
        let arry:any[] = this.state.types;
        return(
            <div>
                <h2>Add your second-hand goods here!</h2>
                <form method="post" action="#" id="addForm">
                   <table>
                       <tr>
                          <td>goods name: <input type="text" id="name" name="name"/>
                          </td>
                         </tr>

                       <tr>
                          <td>location : <input type="text" id="location" name="location"/></td>
                       </tr>

                       <tr>
                          <td>classification : 
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
                          <td>price : <input type="number" id="price" name='price' /></td>
                       </tr>

                       <tr>
                          <td>Selling Method : 
                              <input type="checkbox" name="method1" value = "1" /> shipping
                              <input type="checkbox" name="method2" value = "2" /> self-pick
                              <input type="checkbox" name="method3" value = "4" /> home-dilivery
                          </td>
                       </tr>

                       <tr>
                          <td>Main Image : <input id="upfile" type="file" name="upfile"/></td>
                       </tr>
                   </table>
                   <button name="confirm" id='button' type="button" onClick={() => _this.handleAdd()}>Confirm Add</button>
                   <div>{this.state.msg}</div>
                </form>
            </div>
        )
        

    }
}