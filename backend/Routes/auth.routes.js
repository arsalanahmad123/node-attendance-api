const router = require("express").Router();

const authController = require("../Controllers/auth.controller");


router.post("/register", authController.register);

router.get("/users", authController.getUsers)
router.get("/attendance/:id", authController.getAttendance)
router.get("/users/:id", authController.fetchUser)
router.post("/users/:id/attendance", authController.createAttendance)
router.post("/attendance/:id", authController.updateAttendance)
module.exports = router 