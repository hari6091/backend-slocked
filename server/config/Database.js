import { Sequelize } from "sequelize";

const db = new Sequelize('rfid', 'postgres', 'pgpassword', {
    host: "database",
    dialect: "postgres",
});

export default db;