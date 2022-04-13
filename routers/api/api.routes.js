const express = require('express');
const path = require('path')
const rutasProductos = require('./productos/productos.routes')
const authRoutes = require('./auth/auth.routes');
const { fork } = require('child_process');
// const { infoLog } = require('../../middlewares/logger');
const router = express.Router();

//Routes
// router.use(infoLog)
router.use('/auth', authRoutes);
router.use('/productos', rutasProductos);

router.get('/randoms', (req, res) => {
  const { cant } = req.query
  // console.log(cant,1)
  const random = fork(path.resolve(__dirname, './random/random.routes.js'))

  random.send({cant: cant})
  random.on('message', dato => {
    // console.log(dato)
    res.render('random',{numbers: dato});
  })
})

module.exports = router;