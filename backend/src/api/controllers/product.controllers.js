import ProductModels from "../models/product.models.js";

export const getAllProducts = async (req, res) => {

    const [rows] = await ProductModels.selectAllProducts();

    res.status(200).json({
        payload: rows
    });
};

export const getActiveProducts = async (req, res) => {

    try {
            const [rows] = await ProductModels.selectActiveProducts();

            res.status(200).json({
                payload: rows
            });

        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: "Error interno del servidor"
            });
    }
    
};

export const getProductById = async (req, res) => {
    const id = req.params.id; 

    const [rows] = await ProductModels.selectProductById(id);

    res.status(200).json({
        payload: rows
    });
};

export const createProduct = async (req, res) => {
    try {
        console.log(req.body);

        const {name, image, category, price } = req.body;

        const [rows] = await ProductModels.insertNewProduct({name, image, category, price});

        res.status(200).json({
            message: "Producto creado con exito",
            productId: rows.insertId
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;

        console.log(req.body);

        const { name, image, category, price } = req.body;

        const [rows] = await ProductModels.updateProductById(id, { name, image, category, price });

        res.status(200).json({
            message: "Producto actualizado con exito",
            payload: rows
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const unactiveProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const [rows] = await ProductModels.unactiveProductById(id);

        res.status(200).json({
            message: "Producto dado de baja",
            payload: rows
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error interno del server"
        });
    }
};

export const activeProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const [rows] = await ProductModels.activeProductById(id);

        res.status(200).json({
            message: "Producto dado de alta",
            payload: rows
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};