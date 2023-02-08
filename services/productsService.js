const faker = require('faker') //Ayuda a generar datos falsos
//Boom nos ayuda a manejar los errores.
const boom = require('@hapi/boom')

class ProductsService {

  constructor(){
    this.products = [] //Arreglo de productos
    this.generate()
  }

  generate(){
    const limit = 100 //Establece el limite en el que se generan o muestran los productos.
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        Image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(), //Bloquea algunos productos
      })
    }
  }

  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct
  }

  async find(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products)
      }, 5000) //Retraso la entrega de la info en 5 segundos
    })
  }

  async findOne(id){
    const product = this.products.find(item => item.id === id)
    if (!product){
      throw boom.notFound('Producto no encontrado')
    }
    if (product.isBlock) {
      throw boom.conflict('Producto bloqueado')
    }
    return product
  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1){
      throw boom.notFound('Producto no encontrado')
    }
    const product = this.products[index]
    this.products[index] = {
      ...product, //Hace que no se elimine el producto
      ...changes //solo guarda los cambios
    }
    return this.products[index]
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1){
      throw boom.notFound('Producto no encontrado')
    }
    this.products.splice(index, 1)
    return { id }
  }

}

module.exports = ProductsService
