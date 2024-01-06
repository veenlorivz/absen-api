const router = require('express').Router()
const { auth: AuthController } = require('../controller')

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)

module.exports = router