import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Button, Spin, message } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import '../static/style/login.css';
import api from '../config/apiUrl';

function Login(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  const checkLogin = () => {
    setIsLoading(true);

    if (!username) {
      message.error('用户名不能为空!');
      setTimeout(() => {
        setIsLoading(false);
      }, 500)
      return false;
    } else if (!password) {
      message.error('密码不能为空!')
      setTimeout(() => {
        setIsLoading(false);
      }, 500)
      return false;
    }

    api.login(username, password).then((res) => {
      setIsLoading(false);
      console.log(res);
      if (res.data === '登录成功') {
        localStorage.setItem('openId',res.openId);
        props.history.push('/index');
      } else {
        message.error('用户名密码错误');
      }
    });
    
  };

  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="博客登录" bordered={true} style={{ width: 400 }}>
          <Input 
            id="username"
            size="large"
            placeholder="username"
            prefix={<UserOutlined />}
            onChange={(e)=>{setUsername(e.target.value)}}
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