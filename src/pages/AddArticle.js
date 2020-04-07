import React, { useState } from 'react';
import marked from 'marked';
import '../static/style/addArticle.css';
import { Row, Col, Input, Select, Button, DatePicker } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

function AddArticle() {

  const [articleId, setArticleId] = useState(0);
  const [articleTitle,setArticleTitle] = useState('');
  const [articleContent , setArticleContent] = useState('');
  const [contentHtml, setContentHtml] = useState('预览内容');
  const [articleIntroduce,setArticleIntroduce] = useState();
  const [introduceHtml,setIntroduceHtml] = useState('预览内容');
  const [showDate,setShowDate] = useState();
  const [updateDate,setUpdateDate] = useState();
  const [typeInfo ,setTypeInfo] = useState([]);
  const [selectedType,setSelectType] = useState(1);

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  const changeContent = (e) => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setContentHtml(html);
  }

  const changeIntroduce = (e) => {
    setArticleIntroduce(e.target.value);
    let html = marked(e.target.value);
    setIntroduceHtml(html)
  }

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                placeholder="标题"
                size="large"
              />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select defaultValue="1" size="large">
                <Option value="1">Vue</Option>
              </Select>
            </Col>
          </Row>
          <br/>
          <Row gutter={3}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={25}
                placeholder="文章内容"
                onChange={changeContent}
              />
            </Col>
            <Col span={12}>
              <div 
                className="show-html"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              ></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button type="primary" size="large">发布文章</Button>
            </Col>
            <Col span={24}>
              <TextArea
                rows={4}
                placeholder="文章简介"
                onChange={changeIntroduce}
              ></TextArea>
              <div 
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: introduceHtml }}
              ></div>
            </Col>
            <Col span={12}>
              <div className="date=select">
                <DatePicker
                  placeholder="发布日期"
                  size="large"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default AddArticle;