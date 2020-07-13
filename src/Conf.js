import LoginModal from "./LoginModal";
import React from "react";
import MessageModal from "./MessageModal";

 


const Conf = {
  loginWin:undefined,
  msgWin:undefined,
  goods_types : [
    {
      value: 'A',
      label: 'Furniture',
      children: [
        {
          value: 'A_0001',
          label: 'Bed',
        },
        {
          value: 'A_0002',
          label: 'Chair',
        },
        {
          value: 'A_0003',
          label: 'Table',
        },
      ],
    },
    {
      value: 'B',
      label: 'Books',
      children: [
        {
          value: 'B_0001',
          label: 'Math',
        },
        {
          value: 'B_0002',
          label: 'English',
        },
        {
          value: 'B_0003',
          label: 'Magazine',
        },
      ],
    },
  ],   
  
  


    getFullTypeName(typeCode,types){
       if(types==undefined){
          types = this.goods_types;
      }
      let n = typeCode.indexOf("_");
      let cateCode = typeCode.substring(0,n);

      let cateObj = this.getCateObj(types,cateCode);
      return cateObj.label+"/"+this.getTypeObj(cateObj,typeCode).label;
    },  

    getCateByCode(typeCode){
      let n = typeCode.indexOf("_");
      let cateCode = typeCode.substring(0,n);
      let cateObj = this.getCateObj(this.goods_types,cateCode);
      return this.getTypeObj(cateObj,typeCode);
    },

    getCateObj(types,cateCode){
        let arr = [];
        for (var i=0;i<types.length;i++)
        { 
            let element = types[i];
            if(element.value == cateCode) return element;
        }       
        return arr;
    },
    getTypeObj(cateObj,typeCode){
        for (var i=0;i<cateObj.children.length;i++)
        { 
            let element = cateObj.children[i];
            if(element.value == typeCode) return element;
        }
        
        return ""
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
      return this.getFullTypeName(schoolCode,this.schools);
    },  

    getShoolObj(schoolCode){
      let cateObj = this.getCateObj(schoolCode,this.schools);
      return this.getTypeObj(cateObj,schoolCode);
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