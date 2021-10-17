const router = require('express').Router();
const userControllers = require('../controllers/userControllers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Authentication,AuthenticationManager} = require("../auth");

router.get('/all',Authentication,AuthenticationManager,userControllers.getAllUser);
router.post('/add',userControllers.createUser);
router.post('/login',userControllers.login);

module.exports = router;