const { decode } = require('../../utils/token')

module.exports = async (req, res, next) => {    
    try {
        if(!req.headers.authorization) {
            throw new Error('Token is required')
        }
        const authorization = req.headers.authorization || '';
        const token = authorization.split(' ')[1]   
        const decoded = await decode(token)

        req.logged = { accountId: decoded.id }
    } catch (error) {
        return res.status(401).send({
            code: 401,
            status: 'Unauthorized',
            error: error.message
        })
    }

    return next()
}