import React, { useState, useEffect } from 'react';
import marked from 'marked';
import '../static/style/addArticle.css';
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd';
import api from '../config/apiUrl';

const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {

  const [articleId, setArticleId] = useState(0);
  const [articleTitle,setArticleTitle] = useState('');
  const [articleContent , setArticleContent] = useState('');
  const [contentHtml, setContentHtml] = useState('预览内容');
  const [articleIntroduce,setArticleIntroduce] = useState();
  const [introduceHtml,setIntroduceHtml] = useState('预览内容');
  const [showDate,setShowDate] = useState();
  const [typeInfo ,setTypeInfo] = useState([]);
  const [selectedType,setSelectedType] = useState();

  useEffect(() => {
    getTypeInfo();
    if (props.match.params.id) {
      setArticleId(props.match.params.id);
      getArticleById(props.match.params.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const changeSelectedType = (typeId) => {
    setSelectedType(typeId);
  }

  const saveArticle = () => {
    if (!selectedType) {
      message.error('请选择文章类型!');
      return false;
    } else if (!articleTitle) {
      message.error('文章标题不能为空!');
      return false;
    } else if (!articleContent) {
      message.error('文章内容不能为空!');
      return false;
    } else if (!articleIntroduce) {
      message.error('文章简介不能为空!');
      return false;
    } else if (!showDate) {
      message.error('发布日期不能为空!');
      return false;
    }

    let articleInfo = {
      type_id: selectedType,
      title: articleTitle,
      content: articleContent,
      introduce: articleIntroduce,
      add_time: (new Date(showDate.replace('-', '/')).getTime())/1000,
    }

    if (articleId === 0) {  //添加新文章
      articleInfo.view_count = 0;
      api.addArticle(articleInfo).then((res) => {
        setArticleId(res.insertId);
        if (res.isSuccess) {
          message.success('保存成功');
        } else {
          message.error('保存失败');
        }
      });
    } else {  //修改文章
      articleInfo.id = articleId;
      api.updateArticle(articleInfo).then((res) => {
        if (res.isSuccess) {
          message.success('修改成功');
        } else {
          message.error('修改失败');
        }
      });
    }
  }

  const getArticleById = (articleId) => {
    api.getArticleById(articleId)
    .then((res) => {
      const articleInfo = res.data[0];
      
      setArticleTitle(articleInfo.title);
      setArticleContent(articleInfo.articleContent);
      setContentHtml(marked(articleInfo.articleContent));
      setArticleIntroduce(articleInfo.introduce);
      setIntroduceHtml(marked(articleInfo.introduce));
      setShowDate(articleInfo.addTime);
      setSelectedType(articleInfo.typeId);
    });
  }

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                value={articleTitle}
                placeholder="标题"
                size="large"
                onChange={e=>{setArticleTitle(e.target.value)}}
              />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select 
                placeholder="请选择文章类型"
                size="large"
                value={selectedType}
                onChange={changeSelectedType}
              >
                {
                  typeInfo.map((type, index) => {
                    return (<Option key={type.name + index} value={type.id}>{type.name}</Option>)
                  })
                }
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
                value={articleContent}
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
              <Button 
                type="primary" 
                size="large"
                onClick={saveArticle}
              >保存文章</Button>
            </Col>
            <Col span={24}>
              <TextArea
                rows={4}
                placeholder="文章简介"
                value={articleIntroduce}
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
                  onChange={(data, dateString)=>{setShowDate(dateString)}}
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