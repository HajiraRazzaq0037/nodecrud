const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

// get all users done
router.get(`/`, userController.getAllUser);
// add  user t mongo db  done
router.post(`/adduser`, userController.addUser);
// in progress
router.get(`/:id`, userController.getUser);
router.delete(`/delusers/:id`, userController.delUser);
router.put(`/updateuser/:id`, userController.updateUser);

module.exports = router;
