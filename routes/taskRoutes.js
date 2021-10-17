const router = require('express').Router();
const taskControllers = require('../controllers/taskControllers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Authentication,AuthenticationEmployee,AuthenticationManager} = require("../auth");

router.get('/',Authentication,AuthenticationEmployee,taskControllers.readTask);
router.get('/all',Authentication,AuthenticationManager,taskControllers.readAllTask);
router.post('/add',Authentication,AuthenticationEmployee,taskControllers.createTask);
// router.post('/addBroadcast',Authentication,AuthenticationManager,taskControllers.createBroadcast);
router.post('/edit',Authentication,AuthenticationEmployee,taskControllers.editTask)
router.delete('/delete',Authentication,AuthenticationEmployee,taskControllers.deleteTask)
// router.post('/login',taskControllers.login);

module.exports = router;