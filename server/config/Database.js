import { Sequelize } from "sequelize";

const db = new Sequelize('rfid', 'pguser', 'pgpassword', {
    host: "localhost",
    dialect: "postgres",
});

export default db;