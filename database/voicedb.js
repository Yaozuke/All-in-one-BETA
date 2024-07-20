const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/voicedb.db');

db.serialize(() => {
    // Create the new table with the isTemporary and isPublic columns
    db.run(`CREATE TABLE IF NOT EXISTS voice_channels (
        id TEXT PRIMARY KEY, 
        guildId TEXT, 
        channelId TEXT, 
        userId TEXT, 
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
        isTemporary INTEGER DEFAULT 1,
        isPublic INTEGER DEFAULT 0
    )`, (err) => {
        if (err) {
            console.error('Error creating voice_channels table:', err);
        }
    });
});

module.exports = db;
