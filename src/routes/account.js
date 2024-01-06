const router = require('express').Router()
const { account: AccountController } = require('../controller')
const { authentication } = require('../middleware')

router.get('/', authentication, AccountController.getAllAccount)
router.get('/:id', authentication, AccountController.getOne)

module.exports = router