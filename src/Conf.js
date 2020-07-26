//import LoginModal from "./LoginModal";
//import React from "react";
//import MessageModal from "./MessageModal";

//import { toFunction } from "ol/style/Style";

 
Date.prototype.format = function(ft)
{
var d = new Date();
var format = ft;
var n = ft.indexOf(":ss");
var n2 = ft.indexOf("hh:mm");
if(d.getDate() == this.getDate()){

  if(n2>0) {
    format = n>0?"hh:mm:ss":"hh:mm";
  }
}
 var o = {
 "M+" : this.getMonth()+1, //month
 "d+" : this.getDate(),    //day
 "h+" : this.getHours(),   //hour
 "m+" : this.getMinutes(), //minute
 "s+" : this.getSeconds(), //second
 "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
 "S" : this.getMilliseconds() //millisecond
 }
 if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
 (this.getFullYear()+"").substr(4 - RegExp.$1.length));
 for(var k in o)if(new RegExp("("+ k +")").test(format))
 format = format.replace(RegExp.$1,
 RegExp.$1.length==1 ? o[k] :
 ("00"+ o[k]).substr((""+ o[k]).length));


 return format;
}

const Conf = {
  loginWin:undefined,
  msgWin:undefined,
  app:undefined,
  goods_types : [
    {
      value: 'A',
      label: 'Furnitures',
      children: [
        {
          value: 'A_0001',
          label: 'Beds & Mattresses',
        },
        {
          value: 'A_0002',
          label: 'Chairs',
        },
        {
          value: 'A_0003',
          label: 'Tables',
        },
      ],
    },
    {
      value: 'E',
      label: 'Home and Appliances',
      children: [
        {
          value: 'E_0001',
          label: 'Kitchen & Dinning',
        },
        {
          value: 'E_0002',
          label: 'Storage & Organization',
        },
        {
          value: 'E_0003',
          label: 'Decor & Home Fragrance',
        },
      ],
    },
   
    
    {
      value: 'D',
      label: 'Clothing, Shoes & Jewlery',
      children: [
        {
          value: 'D_0001',
          label: 'Tops',
        },
        {
          value: 'D_0002',
          label: 'Bottoms',
        },
        {
          value: 'D_0003',
          label: 'Shoes',
        },
        {
          value: 'D_0004',
          label: 'Jewleries',
        },
      ],
    },
    {
      value: 'C',
      label: 'Electronics',
      children: [
        {
          value: 'C_0001',
          label: 'Cell Phones & Accessories',
        },
        {
          value: 'C_0002',
          label: 'Computers & Accessories',
        },
        {
          value: 'C_0003',
          label: 'TV, Video, Ipad & Tablets',
        },
      ],
    },

    {
      value: 'B',
      label: 'Books',
      children: [
        {
          value: 'B_0001',
          label: 'Mathmetics',
        },
        {
          value: 'B_0002',
          label: 'History & Literature',
        },
        {
          value: 'B_0003',
          label: 'Magazines',
        },
      ],
    },
    
  ],   
  
  
    getFullTypeName(typeCode){
      return this.getFullName(typeCode,this.goods_types);
    },  

    getFullName(code,catesArr){
       if(catesArr==undefined){
        catesArr = this.goods_types;
      }
      let n = code.indexOf("_");
      if(n<0) n = code.indexOf("/");
      if(n<0) return code;

      let cateCode = code.substring(0,n);

      let cateObj = this.getCateObj(catesArr,cateCode);
      return cateObj.label+"/"+this.getTypeObj(cateObj,code).label;
    },  


    getCateByCode(typeCode){
      let n = typeCode.indexOf("_");
      if(n<0) n = typeCode.indexOf("/");
      if(n<0) return typeCode;

      let cateCode = typeCode.substring(0,n);
      let cateObj = this.getCateObj(this.goods_types,cateCode);
      return this.getTypeObj(cateObj,typeCode);
    },

    getCateObj(types,cateCode){
        if(types==undefined||types==null) return cateCode;

        for (var i=0;i<types.length;i++)
        { 
            let element = types[i];
            if(element.value == cateCode) return element;
        }       
        return undefined;
    },
    getTypeObj(cateObj,typeCode){
        if(cateObj==undefined||cateObj==null||cateObj.children==undefined) return typeCode;
        for (var i=0;i<cateObj.children.length;i++)
        { 
            let element = cateObj.children[i];
            if(element.value == typeCode) return element;
        }
        
        return undefined
    },


    

    schools : [
      {
        value: 'CA',
        label: 'California',
        children: [
          {
            value: 'UCB',
            label: 'University of California, Berkeley',
          },
          {
            value: 'Stanford',
            label: 'Stanford University',
          },
          {
            value: 'UCLA',
            label: 'University of California, Los Angeles',
          },
        ],
      },
      {
        value: 'NY',
        label: 'New York',
        children: [
          {
            value: 'Columbia',
            label: 'Columbia University',
          },
          {
            value: 'NYU',
            label: 'New York University',
          },
          {
            value: 'Cornell',
            label: 'Cornell University',
          },
        ],
      },
      {
        value: 'MI',
        label: 'Michigan',
        children: [
          {
            value: 'UMich',
            label: 'University of Michigan, Ann Arbor',
          },
          {
            value: 'MSU',
            label: 'Michigan State University',
          },
          {
            value: 'Andrews',
            label: 'Andrews University',
          },
        ],
      },
    ],       




    getFullShoolName(schoolCode){
      return this.getFullName(schoolCode,this.schools);
    },  

    getShoolObj(schoolCode){
      let cateObj = this.getCateObj(schoolCode,this.schools);
      return this.getTypeObj(cateObj,schoolCode);
    },  



    getUrlQueryString(routerName){
      var str = window.location.pathname;
      var n = str.indexOf(routerName);
      if(n<0) return ""
      return str.substr(n+routerName.length+1);
    },

    getQueryObjFromStr(str){
      var kvs = str.split("&");
      var obj = {};
      kvs.forEach(element => {
        var arr = element.split("=");
        obj[arr[0]] = arr[1];
      });{

      }
      return obj;
    },

    getQueryStrFromObj(obj){
      var s = ""
      for(var a in obj){
        if(a == undefined||a.length==0) continue;
        if(s.length==0) s += a+"="+obj[a];
        else s += "&"+a+"="+obj[a];
      }
      return s;
    },

    getUrlParam(name,param) {
      var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
      if (reg.test(param))
       return unescape(RegExp.$2.replace(/\+/g, " "));
      return "";
    },



    //根据key值获取对应的cookie
      getCookie(key) {
    //获取cookie
        const data = document.cookie
    //获取key第一次出现的位置
        let startIndex = data.indexOf(key + '=')
    //如果开始索引值大于0表示有cookie
        if (startIndex > -1) {
    //key的起始位置等于出现的位置加key的长度+1
          startIndex = startIndex + key.length + 1
    //结束位置等于从key开始的位置之后第一次;号所出现的位置
          let endIndex = data.indexOf(';', startIndex)
    //如果未找到结尾位置则结尾位置等于cookie长度，之后的内容全部获取
          endIndex = endIndex < 0 ? data.length : endIndex
    
          return decodeURIComponent(data.substring(startIndex, endIndex))
        } else {
          return ''
        }
      },

      isAuthenticated(){
        return this.getCookie("userId").length>0;

      },
    
      setCookie(key, value, time) {
       //默认保存时间
        const times = time
        //获取当前时间
        const cur = new Date()
        //设置指定时间
        cur.setTime(cur.getTime() + times * 24 * 3600 * 1000)
        //创建cookie  并且设置生存周期为UTC时间
        document.cookie = key+'=' +encodeURIComponent(value) +';expires=' +(times === undefined ? '' : cur.toUTCString())
      },
    
      delCookie(key) {
    //获取cookie
        const data = this.getCookie(key)
    //如果获取到cookie则重新设置cookie的生存周期为过去时间
        if ((data) !== false) {
          this.setCookie(key, data, -1)
        }
      }
    }

    export default Conf