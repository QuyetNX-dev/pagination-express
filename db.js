const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);
db.defaults({ todo: [] }).write();
db.defaults({ users: [] }).write();
db.defaults({ transection: [] }).write();

module.exports = db;
