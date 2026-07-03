import { join, __dirname } from "../utils/index.js";

export const adminGetView = async (req, res) => {
    res.render("admin/get");
};

export const adminGetByIdView = async (req, res) => {
    res.render("admin/getById");
};

export const adminPostView = async (req, res) => {
    res.render("admin/post");
};

export const adminPutView = async (req, res) => {
    res.render("admin/put");
};

export const adminDeleteView = async (req, res) => {
    res.render("admin/delete");
};