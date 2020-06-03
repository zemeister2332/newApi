const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
// model
const User = require('../model/User');


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'We have a test in our app' });
});




/* POST Method. */
router.post('/register', (req, res, next) => {
  const {username, password} = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    const user = new User({
      username,
      password: hash
    });

    const promise = user.save();
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
  });
});


router.post('/authenticate', (req, res, next) => {
  const {username, password} = req.body;

  User.findOne({
    username
  },(err,user) => {
      if (err)
        throw err;

    if (!user){
      res.json({
        status: false,
        message: 'Kirish Muvaffaqiyatsiz'
      });
    }else{
      bcrypt.compare(password, user.password).then((pas) => {
          if (!pas){
            res.json({
              status: false,
              message: 'Foydalanuvchi malumotlari notogri, Notogri parol'
            })
          }else{
            const payload = {
              username
            };
            const token = jwt.sign(payload, req.app.get('api_secret_key'), {
              expiresIn: 720 // 12 soat
            });

            res.json({
              status: true,
              token
            })
          }
      });
    }
  });
});

module.exports = router;
