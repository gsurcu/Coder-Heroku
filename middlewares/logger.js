const { infoLogger, warnLogger, errorLogger} = require('../logger/index')

const infoLog = async (req, res, next) => {
  // console.log('url?: ', req.logger)
  if (!req.route) {
    // console.log('baseUrl: ',req.baseUrl, ', originalUrl: ', req.originalUrl, ', url: ', req.url, ', route: ',req.route)
    // infoLogger.info('',{metodo: req.method, ruta: req.route.path})
    infoLogger.log('info','',{metodo: req.method, ruta: req.originalUrl})
  }
  next()
}
const warnLog = async (req, res) => {
  console.log('url?: ',req.logger)
  console.log('baseUrl: ',req.baseUrl, ', originalUrl: ', req.originalUrl, ', url: ', req.url, ', route: ',req.route)
  // warnLogger.warn('',{metodo: req.method, ruta: req.baseUrl})
  warnLogger.log('warn','',{metodo: req.method, ruta: req.originalUrl})
  res.status(404).json({
    error: -2,
    descripcion: `La ruta ${req.baseUrl} con el metodo ${req.method} no esta implementado`,
  });
}
const errorLog = async (err) => {
  // errorLogger.error()
  errorLogger.log('error', err)
}

module.exports = {
  infoLog,
  warnLog,
  errorLog,
}