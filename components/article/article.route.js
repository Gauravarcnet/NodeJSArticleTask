function articleRoutes() {
  const ctrl = require('./article.controller')
  return (open, closed) => {

    //we can also use validation using joi during adding article
    closed.route('/articles').post(ctrl.addArticle)

    open.route('/articles').get(ctrl.articleList)
  }
}
module.exports = articleRoutes()