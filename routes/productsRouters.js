const express = require('express')

const ProductsService = require('./../services/productsService')
const validatorHandler = require('./../middlewares/validatorHandler')
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/productSchema')

//Creamos un Router
const router = express.Router()

//Instanciamos la clase
const service = new ProductsService

//Llenando con datos falsos usando faker
router.get('/', async (req, res) => {
  const products = await service.find()
  res.json(products)
})

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
})

//Recibe un parametro
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await service.findOne(id)
    res.json(product)
  } catch (error) {
    next(error)
  }

})

//Creamos el metodo POST
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body
    const newProduct = await service.create(body)
    res.status(201).json(newProduct)
  }
)

//Actualizamos por metodo patch
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const product = await service.update(id, body)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }
)

//Actualizamos por metodo put
router.put('/:id', (req, res) => {
  const { id } = req.params
  const body = req.body
  res.json({
    message: "Actualizado put",
    data: body,
    id,
  })
})

//Eliminamos
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const respuesta = await service.delete(id)
  res.status(500).json(respuesta)
})

//Lo exportamos
module.exports = router
