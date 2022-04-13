const path = require('path');
const express = require('express');
const auth = require('../middlewares/auth');
const infoRoute = require('./info/info.routes');
const compression = require('compression');
// const { infoLog } = require('../middlewares/logger');
const PORT = process.argv[2]
const router = express.Router();

// router.use(infoLog)

router.get('/', (req, res) => {
  const user = req.user;
  if (user) {
    return res.redirect('/profile');
  }
  else {
    return res.sendFile(path.resolve(__dirname, '../public/login.html'));
  }
});

router.get('/info', compression(({level:9})), infoRoute)

router.get('/datos', (req, res) => {
  console.table({ port: PORT, date: new Date().toISOString()});
  const html =`Servidor express <span style="color: coral;font-weight: bold;">(NginX)</span> | ${PORT} - <b>PID => ${process.pid}</b> - ${new Date().toLocaleString()}`
  res.send(html);
});

router.get('/profile', auth, async (req, res) => {
  const user = req.user;
  res.render('profile', { sessionUser: user });
});

router.get('/logout', auth, (req, res, next) => {
  req.logOut();
  console.log('User logued out');
  res.redirect('/');
});

module.exports = router;