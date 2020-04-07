import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Button, Spin } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import '../static/style/login.css';

function Login() {
  const [ userName, setUserName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  const checkLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  };

  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="博客登录" bordered={true} style={{ width: 400 }}>
          <Input 
            id="userName"
            size="large"
            placeholder="username"
            prefix={<UserOutlined />}
            onChange={(e)=>{setUserName(e.target.value)}}
          />
          <br/><br/>
          <Input.Password
            id="password"
            size="large"
            placeholder="password"
            prefix={<KeyOutlined />}
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          <br/><br/>
          <Button 
            type="primary"
            size="large"
            block
            onClick={checkLogin}
          >登录</Button>
        </Card>
      </Spin>
    </div>
  )
}

export default Login;