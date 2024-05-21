const sqlite3 = require('sqlite3').verbose();

// Open a database handle
const db = new sqlite3.Database('./notes.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err: Error | null) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the notes database.');
});

db.serialize(() => {
  // Queries scheduled here will be serialized.
  db.run(`CREATE TABLE IF NOT EXISTS notes(
    id TEXT PRIMARY KEY,
    patientId TEXT,
    author TEXT,
    createdAt TEXT,
    updatedAt TEXT,
    type TEXT,
    content TEXT
  )`, (err: Error | null) => {
    if (err) {
      // This should show the error if something went wrong
      console.error(err.message);
    }
  });
});

export default db;