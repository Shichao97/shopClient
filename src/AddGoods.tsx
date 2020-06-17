import React from 'react';
import jquery from "jquery";
const $ = jquery;

export default class AddGoods extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state={
            types:[]
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

    render(){
        let arry:any[] = this.state.types;
        return(
            <div>
                <h2>Add your second-hand goods here!</h2>
                <form>
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
                              <select>
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
                              <input type="checkbox" name="checkbox1" value = "1" /> shipping
                              <input type="checkbox" name="checkbox2" value = "2" /> self-pick
                              <input type="checkbox" name="checkbox3" value = "4" /> home-dilivery
                          </td>
                       </tr>
                   </table>
                   <button name="confirm" id='button' type="button">Confirm Add</button>
                </form>
            </div>
        )
        
    }
}