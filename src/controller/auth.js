const { auth: AuthService} = require('../service')

const login = async (req, res, next) => {
    try {
        const result = await AuthService.login(req.body)
        return res.status(200).send({
            access_token: result
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: error.message
        })
    }
}

const register = async (req, res, next) => {
    try {
        await AuthService.register(req.body)
        return res.status(200).send({
            code: 200,
            status: 'OK'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: error.message
        })
    }
}

module.exports = {
    login, register
}