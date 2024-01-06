const { absen: AbsenService} = require('../service')

const clockIn = async (req, res, next) => {
    try {
        const ip = req.headers['cf-connecting-ip']
        || req.headers['x-forwarded-for']
        || req.connection.remoteAddress
        || req.ip
        || '0.0.0.0'
        const result = await AbsenService.clockIn(ip, req.logged.accountId)
        return res.status(200).send({
            code: 200,
            status: 'OK',
            result
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: error.message
        })
    }
}

const clockOut = async (req, res, next) => {
    try {
        const ip = req.headers['cf-connecting-ip']
        || req.headers['x-forwarded-for']
        || req.connection.remoteAddress
        || req.ip
        || '0.0.0.0'
        const result = await AbsenService.clockOut(ip, req.logged.accountId)
        return res.status(200).send({
            code: 200,
            status: 'OK',
            result
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: error.message
        })
    }
}

module.exports = { clockIn, clockOut }