const express = require("express");
const fs = require("fs");
const userController = require("../controller/userController");
const router = express.Router();

const resData = JSON.parse(fs.readFileSync(`./data.json`, "utf-8"));

router.get(`/`, (req, res) => {
  res.status(200).send({
    status: "success",
    data: {
      resData,
    },
  });
});

router.get(`/:id`, userController.getUser);
router.delete(`/delusers/:id`, userController.delUser);
router.put(`/updateuser/:id`, userController.updateUser);
router.post(`/adduser`, userController.addUser);

module.exports = router;
