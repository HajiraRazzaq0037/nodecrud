const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

router.get(`/`, userController.getAllUser);
router.post(`/adduser`, userController.addUser);
router.get(`/getuserbyId/:id`, userController.getUser);
router.delete(`/delusers/:id`, userController.delUser);
router.put(`/updateuser`, userController.updateUser);
router.post(`/register`, userController.register);
router.post(`/signIn`, userController.login);

module.exports = router;
