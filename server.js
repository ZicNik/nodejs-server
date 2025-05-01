const express = require('express')
const http = require('http')
const https = require('https')
const fs = require('fs')
const db = require('./db-operations')

const httpPort = 80
const httpsPort = 443
const httpsOptions = {
    cert: fs.readFileSync('ssl/cert.pem'),
    key: fs.readFileSync('ssl/key.pem'),
}

const app = express()
app.use((req, res, next) => {
    if (req.secure) next()
    else res.redirect(`https://${req.headers.host}${req.url}`)
})

const timeFormatOptions = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
}
const timeFormatter = new Intl.DateTimeFormat('it-IT', timeFormatOptions)

app.get('/', (req, res) => {
    res.send('Hello')
    const ip = req.ip.split(':').pop()
    const date = timeFormatter.format(new Date())
    db.insertAccess.run({ip, date})
})

http.createServer(app).listen(httpPort)
https.createServer(httpsOptions, app).listen(httpsPort)