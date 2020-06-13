/* 
    Success and errors are the response method that we have defined 
    already in response So we can follow standward way and error handling
*/

const {
  success,
  errors
} = require('../../utils').response

let article = []

function ArticleCtrl() {
  const methods = {

    // adding a new article
    addArticle: async (req, res) => {
      try {

        /* 
        adding a new article here i am storing article(data) in memory but we can 
        also store it in database  
        */
        const value = req.body
        console.log("value",value);
        
        article.push(value)

        return success(res, 201, '', "new article added ")

      } catch (e) {
        console.log(e)
        return errors(res, 500, e)
      }
    },

    // get list of articles
    articleList: async (req, res) => {

      /*  
        fetching articles  
      */
      try {
        let pageNumber = req.query.pageNumber || 0,
          pageSize = req.query.pageSize || 10,
          articleList = article.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
        return success(res, 200, articleList, 'articles list')

      } catch (e) {
        console.log(e)
        return errors(res, 500, e)
      }
    }

  }
  return Object.freeze(methods)
}

module.exports = ArticleCtrl()
/** */