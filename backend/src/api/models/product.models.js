import connection from '../database/db.js';

const selectAllProducts = () => {
    const sql = 'SELECT * FROM products';
    return connection.query(sql);
};

const selectActiveProducts = () => {
    const sql = 'SELECT * FROM products WHERE active = true';
    return connection.query(sql);
};

const selectProductById = (id) => {
    const sql = 'SELECT * FROM products WHERE id = ?';
    return connection.query(sql, [id]);
};

const insertNewProduct = (product) => {
    const sql = "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";
    return connection.query(sql, [name, image, category, price]);
};

const updateProductById = (id, product) => {
    const sql = "UPDATE products SET name = ?, image = ?, category = ?, price = ? WHERE id = ?";
    return connection.query(sql, [name, image, category, price, id]);
};

const unactiveProductById = (id) => {
    const sql = "UPDATE products SET active = false WHERE id = ?";
    return connection.query(sql, [id]);
};

const activeProductById = (id) => {
    const sql = "UPDATE products SET active = true WHERE id = ?";
    return connection.query(sql, [id]);
};

export default {
    selectAllProducts,
    selectActiveProducts,
    selectProductById,
    insertNewProduct,
    updateProductById,
    unactiveProductById,
    activeProductById
};
