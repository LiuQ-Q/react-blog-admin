import React, { useState, useEffect } from 'react';
import { List, Row, Col, Modal, Input, message, Button } from 'antd';
import api from '../config/apiUrl';
import '../static/style/category.css';

const { confirm } = Modal;

function Category(props) {
  const [typeInfo, setTypeInfo] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTypeId, setCurrentTypeId] = useState(0);
  const [currentTypeInfo, setCurrentTypeInfo] = useState('');

  useEffect(() => {
    getTypeInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTypeInfo = () => {
    api.getTypeInfo().then((res) => {
      if (res.data === '未登录') {
        localStorage.removeItem('openId');
        props.history.push('/');
      } else {
        setTypeInfo(res.data);
      }
    })
  }

  const showModal = (mode) => {
    if (mode === 'add') {
      setCurrentTypeId(0);
      setCurrentTypeInfo('');
    } else {
      setCurrentTypeId(mode);
      setCurrentTypeInfo(typeInfo.find((item) => item.id === mode).name);
    }
    
    setModalVisible(true);
  }

  const hiddenModal = () => {
    setModalVisible(false);
  }

  const handleOk = () => {
    if (currentTypeId === 0) {
      api.addType({name: currentTypeInfo}).then(res => {
        if (res.isSuccess) {
          message.success('添加成功');
          getTypeInfo();
          hiddenModal();
        } else {
          message.error('添加失败');
        }
      })
    } else {
      api.updateType({
        id: currentTypeId,
        name: currentTypeInfo
      }).then(res => {
        if (res.isSuccess) {
          message.success('修改成功');
          getTypeInfo();
          hiddenModal();
        } else {
          message.error('修改失败');
        }
      })
    }
  }

  const deleteTypeById = (typeId) => {
    confirm({
      title: '确定删除类别?',
      content: '点击ok删除, 当前类别下的文章类别会成为空',
      onOk() {
        api.deletTypeById(typeId).then((res) => {
          if (res) {
            message.success('删除成功');
            getTypeInfo();
          }
        });
      }
    });
  }

  return (
    <div>
      <Button 
        type="primary"
        onClick={()=>{showModal('add')}}
      >添加</Button>
      <List
        className="type-list"
        header={
          <Row className="list-div">
            <Col span={6}>
              <b>类别名称</b>
            </Col>
            <Col span={6}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={typeInfo}
        renderItem={item=>(
          <List.Item>
            <Row className="list-div">
              <Col span={6}>
                {item.name}
              </Col>
              <Col span={6}>
                <Button 
                  type="primary"
                  onClick={()=>{showModal(item.id)}}
                >修改</Button>&nbsp;
                <Button onClick={()=>{deleteTypeById(item.id)}}>删除</Button>
              </Col>
          </Row>
          </List.Item>
        )}
      ></List>
      <Modal
          title="Basic Modal"
          visible={modalVisible}
          onOk={handleOk}
          onCancel={hiddenModal}
        >
          <Input
            value={currentTypeInfo}
            placeholder="类别名称"
            size="large"
            onChange={e=>{setCurrentTypeInfo(e.target.value)}}
          />
        </Modal>
    </div>
  )
}

export default Category;