import Database from "better-sqlite3";
const db = new Database("database.db");

db.exec(
    `CREATE TABLE IF NOT EXISTS messages(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        message TEXT,
        smiley TEXT
        )`
    
);
db.exec(`
    INSERT INTO messages (name, message, smiley)
    VALUES
    ('Dorra', 'Hello everyone','😊'),
    ('Adam', 'Hi mum i dont feel good today','😭'),
    ('Jude', 'I love you Mum', '😍')
`);