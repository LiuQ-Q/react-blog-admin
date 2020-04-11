import React, { useState, useEffect } from 'react';
import { List, Row, Col, Modal, message, Button } from 'antd';
import api from '../config/apiUrl';
import '../static/style/articleList.css';

const { confirm } = Modal;

function ArticleList(props) {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    getArticleList();
  }, []);

  const getArticleList = () => {
    api.getArticleList().then((res) => {
      setArticleList(res.data);
    });
  }

  const deletArticleById = (articleId) => {
    confirm({
      title: '确定删除文章?',
      content: '点击ok删除, 文章将被删除!',
      onOk() {
        api.deletArticleById(articleId).then((res) => {
          if (res) {
            message.success('删除成功');
            getArticleList();
          }
        });
      }
    });
  }

  const updateArticleById = (articleId) => {
    props.history.push('/index/add/' + articleId);
  }

  return (
    <div>
      <List 
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={4}>
              <b>类别</b>
            </Col>
            <Col span={4}>
              <b>发布时间</b>
            </Col>
            <Col span={4}>
              <b>浏览量</b>
            </Col>
            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={articleList}
        renderItem={item=>(
          <List.Item>
            <Row className="list-div">
              <Col span={8}>
                {item.title}
              </Col>
              <Col span={4}>
                {item.typeName}
              </Col>
              <Col span={4}>
                {item.addTime}
              </Col>
              <Col span={4}>
                {item.viewCount}
              </Col>
              <Col span={4}>
                <Button 
                  type="primary"
                  onClick={()=>{updateArticleById(item.id)}}
                >修改</Button>&nbsp;
                <Button onClick={()=>{deletArticleById(item.id)}}>删除</Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  )
}

export default ArticleList;