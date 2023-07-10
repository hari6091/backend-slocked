import {Sequelize} from "sequelize";

const db = new Sequelize('slocked', 'root', 'root', {
    host: "localhost",
    dialect: "mysql"
});

export default db;