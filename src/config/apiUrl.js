import axios from 'axios';

const ipUrl = 'http://127.0.0.1:7001/admin/';
const serverPath = {
  login: async (username, password) => {
    return await axios({
      method: 'post',
      url: ipUrl + 'login/',
      data: {
        username,
        password
      },
      withCredentials: true
    }).then((res) => res.data)
  },

  getTypeInfo: async () => {
    return await axios({
      method: 'get',
      url: ipUrl + 'getTypeInfo/',
      withCredentials: true
    }).then((res) => res.data)
  },

  addArticle: async (article) => {
    return await axios({
      method: 'post',
      url: ipUrl + 'addArticle/',
      data: article,
      withCredentials: true
    }).then((res) => res.data)
  },

  updateArticle: async (article) => {
    return await axios({
      method: 'post',
      url: ipUrl + 'updateArticle/',
      data: article,
      withCredentials: true
    }).then((res) => res.data)
  },

  getArticleList: async () => {
    return await axios({
      method: 'get',
      url: ipUrl + 'getArticleList/',
      withCredentials: true
    }).then((res) => res.data)
  },

  deletArticleById: async (articleId) => {
    return await axios({
      method: 'get',
      url: ipUrl + 'deletArticleById/' + articleId,
      withCredentials: true
    }).then((res) => res.data)
  },

  getArticleById: async (articleId) => {
    return await axios({
      method: 'get',
      url: ipUrl + 'getArticleById/' + articleId,
      withCredentials: true
    }).then((res) => res.data)
  },

};

export default serverPath;