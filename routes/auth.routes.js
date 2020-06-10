const { Router } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Stock = require("../models/stock")

const saltRounds = 10;
const router = new Router();

//SIGNUP ROUTES
router.get("/signup", (req, res, next) => res.render("auth/signup"));
router.post("/signup", (req, res, next) => {
   const {username, password} = req.body 

  if (!username || !password) {
    //validacion de usuario 
    res.render('auth/signup', {
        errorMessage: 'Las informaciones username y contraseña son obligatoria'
    });
    return;
  }
    
  //   //validacion de password regular expression

    bcrypt.genSalt(saltRounds)
     .then(salt => bcrypt.hash(password, salt))
     .then(hash => User.create({
      username: username,
      password: hash
    }))
    .then(data => {
      console.log('Haciendo SignUp', data)
      res.redirect('/')
    })

  })
  
  router.get("/login", (req, res, next) => res.render("auth/login"))
  router.post('/login', (req, res, next) => {
    console.log('SESSION =====> ', req.session);
   
    const { username, password } = req.body;
    if (username === '' || password === '') {
      res.render('auth/login', {
        errorMessage: 'Please enter both, username and password to login.'
      });
      return;
    }   
    User.findOne({ username })
      .then(user => {
        if (!user) {
          res.render('auth/login', { errorMessage: 'Email is not registered. Try with other username.' });
          return;
        } else if (bcrypt.compareSync(password, user.password)) {
          console.log("probando login")
          // when we introduce session, the following line gets replaced with what follows:
          res.render('userprofile', { user });
   
          //******* SAVE THE USER IN THE SESSION ********//
          req.session.currentUser = user;
          res.redirect('userprofile');
        } else {
          res.render('auth/login', { errorMessage: 'Incorrect password.' });
        }
      })
      .catch(error => next(error));
  });

  //res.redirect("/"));
  router.get('/userprofile', (req, res) => {
    
    res.render('userprofile', { userInSession: req.session.currentUser });
    Stock.find({})
    .then((stock) => {
      res.render("index", { data: stock });
    })
    .catch((err) => console.log(err));
  });
  router.post('/userprofile', (req, res, next)=>{
    Stock.create(req.body)
    .then(() => res.redirect("/userprofile"))
    .catch((e) => console.log(e));
  })
  router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });
module.exports = router;
