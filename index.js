const express = require('express')
const { app: { port: appPort } } = require('./config')

const { 
    auth: AuthRoutes,
    absen: AbsenRoutes,
    account: AccountRoutes,
} = require('./src/routes')

const app = express()

app.use(express.json())
app.use('/auth', AuthRoutes)
app.use('/absen', AbsenRoutes)
app.use('/account', AccountRoutes)

app.listen(appPort, () => console.log(`Server is running in port ${appPort}`))