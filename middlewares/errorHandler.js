//Hacemos un middleware general para los errores, en consola
function logErrors (error, req, res, next) {
  console.log(logErrors)
  console.log(error)
  next(error) //Envia un middleware de tipo error.
}

//Detecta error y se devuelve al cliente
function errorHandler (error, req, res, next) {
  console.log(errorHandler)
  res.status(500).json({
    message: error.message, //Mensaje del error
    stack: error.stack, //nos dice donde ocurrio el error

  })
}

//Detecta error con boom y se devuelve al cliente
function boomErrorHandler (error, req, res, next) {
  if (error.isBoom){
    const { output } = error
    res.status(output.statusCode).json(output.payload)
  }
  next(error)
}

module.exports = { logErrors, errorHandler, boomErrorHandler }
