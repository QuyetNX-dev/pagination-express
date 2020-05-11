var express = require("express");
var router = express.Router();
const shortid = require("shortid");

const db = require("../../db");
const controller = require('../../controller/users/users.controller')
const validate = require('../../validate/users.validate')

router.get("/", controller.index);

router.get("/delete/:id", controller.delete);

router.get("/delete/:id/oke", controller.deleteOk);

router.get("/post", controller.create);

router.post("/post",validate.validateUser, controller.postCreate);

router.get("/update/:id", controller.update);
  
router.post("/update/:id/done", controller.updateDone);

module.exports = router;