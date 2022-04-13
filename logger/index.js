const winston = require('winston')
let _require = require('triple-beam'),
  MESSAGE = _require.MESSAGE;
const formatLogger = winston.format(function (info) {
  if(info.level == 'info' || info.level == 'warn') {
    info[MESSAGE] = `[${info.timestamp}] [${info.level}] : [${info.metodo}] => ${info.ruta}`;
    return info;
  }
  return false
});

const infoLogger = winston.createLogger({
  level: 'info',
  transports : [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        formatLogger(),
        winston.format.colorize({all:true}),
      )
    })
  ]
})

const warnLogger = winston.createLogger({
  level: 'warn',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        formatLogger(),
        winston.format.colorize({ all: true}),
      )
    }),
    new winston.transports.File({
      filename:'./logger/logs/warn.log',
      format: winston.format.json()
    })
  ],
  format:winston.format.timestamp(),
})

const errorLogger = winston.createLogger({
  level: 'error',
  transports : [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({all:true}),
        winston.format.printf((info) => `[${info.timestamp}] [${info.level}] : ${info.message}`)
      )
    }),
    new winston.transports.File({
      filename:'./logger/logs/error.log',
      format: winston.format.json()
    })
  ],
  format:winston.format.timestamp(),
})

module.exports = {
  infoLogger,
  warnLogger,
  errorLogger,
}