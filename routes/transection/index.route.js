const express = require("express");
const router = express.Router();

const controller = require('../../controller/transection/transection.controller')


router.get("/", controller.index);

router.get("/delete/:id", controller.delete);

router.get("/create", controller.create);

router.post("/create", controller.postCreate);

router.get('/:id/complete', controller.isComplete)

router.get('/:id/complete/ok', controller.updateComplete)

module.exports = router;
