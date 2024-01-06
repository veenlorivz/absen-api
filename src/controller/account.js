const { account: AccountService} = require('../service')

const getAllAccount = async (req, res, next) => {
    try {
        const result = await AccountService.getAllAccount()
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

const getOne = async (req, res, next) => {
    try {
        const option = {
            where: {
                id: req.params.id
            }
        }
        const result = await AccountService.getOne(option)
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

module.exports = { getAllAccount, getOne }