var express = require("express");
var router = express.Router();


const db = require("../../db");
const controller = require('../../controller/book/book.controller')
const validate = require('../../validate/book.validate')

router.get("/", controller.index);

router.get("/delete/:id", controller.delete);
  
router.get("/delete/:id/oke", controller.deleteOk);

router.get("/post", controller.post);

router.post("/post", validate.validateBook, controller.postCreate);

router.get("/update/:id", controller.update);

router.post("/update/:id/done", controller.updateDone);

module.exports = router