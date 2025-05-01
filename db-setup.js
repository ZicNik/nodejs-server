const db = require('better-sqlite3')('server.db', {verbose: console.log})
db.pragma('journal_mode = WAL')
db.prepare('CREATE TABLE IF NOT EXISTS "accesses" ("ip" TEXT, "date" TEXT)').run()
db.close()