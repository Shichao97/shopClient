import React, { RefObject } from 'react';
// import ReactDOM from 'react-dom';
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
// import { QuestionCircleOutlined } from '@ant-design/icons';
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
    this.onFill();
  }

  //const [form] = Form.useForm();
  render(){
    

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
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >
      
      <Form.Item
        name="userName"
        label="Username"
        rules={[
          
          {
            required: true,
            pattern: new RegExp(/^[1-9]\d*$/, "g"),
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input  placeholder="test@163.net"/>
      </Form.Item>
      
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']} 
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}

      >
        <Input.Password />
      </Form.Item>


      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>


      
      </Form>
      </Col>
      </Row>
      </div>);
    }
}