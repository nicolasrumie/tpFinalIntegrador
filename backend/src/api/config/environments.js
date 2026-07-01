// Importamos el modulo dotenv para leer las variables de entorno
import dotenv from "dotenv";

dotenv.config(); // Cargamos las variables de entorno
// Esto hace que podamos leer el contenido de las variables con process.env.NOMBREVARIABLE

export default {
    port: process.env.PORT || 3001,
    session_key: process.env.SESSION_KEY,
    database: {
        host: process.env.DB_HOST || "localhost",
        name: process.env.DB_NAME || "mizuta_db",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || ""
    }
}