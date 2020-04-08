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
    }).then(
      (res) => res.data
    )
  }, 
  // getArticleList: async () => {
  //   return await axios.get( ipUrl + 'getArticleList/').then(
  //     (res) => res.data
  //   )
  // }, 
  // getArticleListByTypeId: async (typeId) => {
  //   return await axios.get( ipUrl + 'getArticleListByTypeId/' + typeId).then(
  //     (res) => res.data
  //   )
  // }, 
  // getArticleById: async (articleId) => {
  //   return await axios.get( ipUrl + 'getArticleById/' + articleId).then(
  //     (res) => res.data.data[0]
  //   )
  // }, 
};

export default serverPath;