import connection from "../database/db.js";

const insertAdmin = (admin) => {
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    return connection.query(sql, [admin.name, admin.email, admin.password]);
};

const selectAdminByEmail = (email) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    return connection.query(sql, [email]);
};

export default {
    insertAdmin,
    selectAdminByEmail
};