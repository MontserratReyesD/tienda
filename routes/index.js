const productsRouter = require('./productsRouters')
//const usersRouter = require('./usersRouters')


function routerApi(app) {
  app.use('/products', productsRouter)
}

module.exports = routerApi
