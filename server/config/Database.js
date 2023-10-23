import { Sequelize } from "sequelize";

const db = new Sequelize('rfid', 'pguser', 'pgpassword', {
    host: "database",
    dialect: "postgres",
});

export default db;