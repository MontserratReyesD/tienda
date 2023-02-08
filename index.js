const express = require('express')
const cors = require('cors')
const routerApi = require('./routes')

//Exportamos los middlewares
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler')

const app = express()
const port = 3000

//Middeware para poder recuperar los datos pasados por post
app.use(express.json())

routerApi(app)

const whitelist = ["http://localhost:5500/frontend.html", "https://myapp.com"] //Solo permirte el acceso a estos dominios
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Acceso no permitido'))
    }
  }
}
app.use(cors(options))

//Rutas
app.get('/', (req, res) => {
  res.send('Este es mi primer express')
})

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log('Mi port ' + port)
})

/* Esto va en otras rutas
//Con parametros opccionales.
app.get('/users', (req, res) => {
  const { limit, offset } = req.query
  if (limit && offset) {
    res.json({
      limit,
      offset
    })
  } else{
    res.send('No hay parametros')
  }
})

//Recibe dos parametros
app.get('/categories/:categoryId/products/:productsId', (req, res) => {
  const { categoryId, productsId } = req.params
  res.json({
    categoryId,
    productsId,
  })
})*/

