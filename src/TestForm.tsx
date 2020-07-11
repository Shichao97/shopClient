import React from 'react';
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
      this.state={autoCompleteResult:[]}
  }
  
  render(){
    //const [form] = Form.useForm();

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
    <div>

      <Form
        {...formItemLayout}

        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >

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
        <Input />
      </Form.Item>

      </Form>


      </div>);
    }
}