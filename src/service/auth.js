const { account: AccountRepo} = require('../repo')
const { generate, compare } = require('../../utils/password')
const { generate: generateToken, } = require('../../utils/token')

const login = async (data) => {
    const options = {
        where: {
            email: data.email
        }
    }
    const account = (await AccountRepo.getBy(options))[0]
    if(!account) {
        throw new Error('Email or Password is wrong')
    }
    if(!compare(data.password, account.password)) {
        throw new Error('Email or Password is wrong')
    }
    const token = generateToken({
        id: account.id,
    })

    return token
}

const register = async (data) => {
    const password = generate(data.password)
    const payload = {
        name: data.name,
        email: data.email,
        password
    }
    return await AccountRepo.create(payload)
}

module.exports = { login, register }