const bcrypt = require('bcrypt')
const { auth } = require('../config')

const generate = (data) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(data, salt)
}

const compare = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword); 
}

module.exports = { generate, compare }