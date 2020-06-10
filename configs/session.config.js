const session = require('express-session')
module.export = app => {
  app.use(
      session({
          secret: 'robert',
          resave: false,
          saveUninitialized: true,
          cookie: {
              maxAge: 8 * 60 * 60 * 1000 //tempo inativo para desconectar o usuário => 8 horas
          }
      }))
}
