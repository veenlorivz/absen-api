const { absen: AbsenRepo } = require('../repo')
const geoip = require('geoip-lite');

const clockIn = async (ip, accountId) => {
    const geo = geoip.lookup(ip)
    const payload = {
        latitude: geo.ll[0],
        longitude: geo.ll[1],
        accountId,
        ipAddress: ip,
        checkTime: new Date(),
        type: 'clockIn'
    }
    return await AbsenRepo.create(payload)
}

const clockOut = async (ip, accountId) => {
    const geo = geoip.lookup(ip)
    const payload = {
        latitude: geo.ll[0],
        longitude: geo.ll[1],
        accountId,
        ipAddress: ip,
        checkTime: new Date(),
        type: 'clockOut'
    }
    return await AbsenRepo.create(payload)
}

module.exports = { clockIn, clockOut }