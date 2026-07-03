// Importamos el modulo mysql2 en modo promesas, para poder hacer peticiones asincronas a la BBDD -> Haremos consultas usando async/await
import mysql2 from "mysql2/promise";

// Importamos la informacion de la conexion a la BBDD
import environments from "../config/environments.js";

// Extraemos solo el objeto database
const { database } = environments;

// Creamos la conexion a la BBDD (un pool de conexiones)
const connection = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true
});

export default connection;
