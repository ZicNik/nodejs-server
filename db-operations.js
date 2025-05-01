const db = require('better-sqlite3')('server.db', { fileMustExist: true, verbose: console.log })

const insertAccess = db.prepare('INSERT INTO accesses (ip, date) VALUES (@ip, @date)')

process.on('exit', () => db.close())
process.on('SIGHUP', () => process.exit(128 + 1))
process.on('SIGINT', () => process.exit(128 + 2))
process.on('SIGTERM', () => process.exit(128 + 15))

exports.insertAccess = insertAccess