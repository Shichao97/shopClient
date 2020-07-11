import React, { RefObject } from 'react';
import ReactDOM from 'react-dom';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

//const [form] = Form.useForm();

export default class TestForm extends React.Component<any,any> {
  constructor(props:any){
      super(props);
      this.state={autoCompleteResult:[],username:135}
  }
  
  formRef:RefObject<FormInstance> = React.createRef();

  onGenderChange = (value:any) => {
    let obj:any = this.formRef.current;
    obj.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  };

  onFinish = (values:any) => {
    let _this = this;
    let t = this.formRef;
    let ob = this.formRef.current?.getFieldsValue();

    this.formRef.current?.setFieldsValue({userName:"ttt"});
    ob = this.formRef.current?.getFieldsValue();
    console.log(values);
  };

  onReset = () => {
    this.formRef.current?.resetFields();
  };

  onFill = () => {
    this.formRef.current?.setFieldsValue({
      userName: 'Helloworld'
    });
  };

  componentDidMount(){
    this.onFill();
  }

  //const [form] = Form.useForm();
  render(){
    let _this = this;    

    const onFinish = (values:any) => {
      console.log('Received values of form: ', values);
    };
  
    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>
      </Form.Item>
    );
  
    //const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  
    const onWebsiteChange = (value:any) => {
      if (!value) {
        this.setState({autoCompleteResult:[]});
      } else {
        let arr:any = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        this.setState({autoCompleteResult:arr});//(arr);
      }
    };
  
    
    const websiteOptions = this.state.autoCompleteResult.map((website: any) => ({
      label: website,
      value: website,
    }));
  
    //let form=Form.create();

    
    return(
    <div  className='demo2'>

      <Form
        {...formItemLayout}
        ref={this.formRef} 
        name="register"
        onFinish={this.onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >
      
      <Form.Item
        name="userName"
        label="Username"
        rules={ [{required:false, message: '请输入数字!' }]}
      >
        <Input />
      </Form.Item>



            {
/*
        getFieldDecorator('userName',{//userName实际上就是你获取整个表单数据对象之后，此输入框的名字

          initialValue:'qqqq',//这是用来初始化表单数据的

          rules:[//这是用来校验表单数据的，具体用法请看文档

              {

                  required:true,

                  message:'用户名不能为空'

              },

              {

                  min:5,max:10,

                  message:'长度不在范围内'

              },

              {

                  pattern:new RegExp('^\\w+$','g'),

                  message:'用户名必须为字母或者数字'

              }

          ]

        })(

    <Input  placeholder="请输入用户名" />

)
*/
}       
      



      

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>


      
      </Form>


      </div>);
    }
}