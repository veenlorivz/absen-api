const { account: AccountRepo} = require('../repo')
const { generate, compare } = require('../../utils/password')
const { generate: generateToken, } = require('../../utils/token')

const getAllAccount = async () => {
    const account = await AccountRepo.getBy()
    return account
}

const getOne = async (options) => {
    const account = (await AccountRepo.getBy(options))[0]
    return account
}

module.exports = { getAllAccount, getOne }