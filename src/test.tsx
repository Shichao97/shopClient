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
import ImageUpload from './ImageUpload';

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
    console.log(values);
  };

  onReset = () => {
    this.formRef.current?.resetFields();
  };

  onFill = () => {
    this.formRef.current?.setFieldsValue({
      userName: '12345',
      password: '123abc',
      confirm: '123abc',
    });
  };

  componentDidMount(){
    //this.onFill();
  }

  getGoodsTypes(){
    let win:any = window;
    return win.goods_types;
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
  
  
    
    return(
    <div  className='demo2'>
      <h2>Add your second-hand goods here!</h2>
      <table className="content-table">
        <tr>
          <td><h3> Upload Images: </h3></td><td><ImageUpload ref="imgup"/></td>
        </tr>
      </table>
      <Row><Col className='demo3'>

      <Form
        {...formItemLayout}
        ref={this.formRef} 
        name="register"
        onFinish={this.onFinish}
        initialValues={{
          typeCode: ['Furniture', 'Bed'],
        }}        
        scrollToFirstError
      >
      
      <Form.Item
        name="name"
        label="Goods Name"
        rules={ [{required:true, message: 'Please enter goods name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="location"
        label="Location"
        rules={ [{required:true, message: 'Please enter location!' }]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        name="typeCode"
        label="Classification"
        rules={[
          { type: 'array', required: true, message: 'Please select goods Classification!' },
        ]}
      >
        <Cascader options={this.getGoodsTypes()} />
      </Form.Item>


      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: 'Please input goods price!' },
        {pattern: new RegExp(/^[1-9]\d*$/, "g"),message: 'Please enter number!' }]}
      >
        <Input style={{ width: '100%' }}/>
      </Form.Item>

      <Form.Item
        name="method"
        valuePropName="checked"
        rules={[
          { 
            validator:(_, value) => {
              if(true) {
                  return Promise.resolve()
              }else{
                  return Promise.reject('Should select at least one deliver-methed')
              }
            },
          }
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>Shipping</Checkbox>
        <Checkbox>Self-pick</Checkbox>
        <Checkbox>Dome-dilivery</Checkbox>
      </Form.Item>



 

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>


      
      </Form>
      </Col>
      </Row>
      </div>);
    }
}