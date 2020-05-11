var express = require("express");
var router = express.Router();
const validate = require('../../validate/login.validate')
router.get('/', (req, res) => {
    res.render('authentication/login',{
    })
})

router.post('/', validate.validateLogin, (req, res) => {
    res.send('hello')
  })

module.exports = router