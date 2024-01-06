const router = require('express').Router()
const { absen: AbsenController } = require('../controller')
const { authentication } = require('../middleware')

router.post('/clock-in', authentication, AbsenController.clockIn)
router.post('/clock-out', authentication, AbsenController.clockOut)

module.exports = router