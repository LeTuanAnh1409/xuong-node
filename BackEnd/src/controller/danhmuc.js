import * as httpStatusCodes from "http-status-codes";
import Category from "../models/category"
import Joi from 'joi'
import Product from "../models/product";


const categorySchema = Joi.object({
    name: Joi.string().required().min(3),
    price: Joi.number().positive().required(),
    image: Joi.string(),
    description: Joi.string(),
});
export const getAll = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(httpStatusCodes.StatusCodes.OK).json({ categories });
    } catch (error) {
        console.log(error);
        return res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category)
            return res.status(httpStatusCodes.StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy danh mục" });

        const products = await Product.find({ category: req.params.id });
        return res.status(httpStatusCodes.StatusCodes.OK).json({ category, products });
    } catch (error) {
        console.log(error);
        return res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

export const removeCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        return res.status(httpStatusCodes.StatusCodes.OK).json({ category });
    } catch (error) {
        console.log(error);
        return res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

export const addCategory = async (req, res) => {
    try {
        const { error, value } = categorySchema.validate(req.body);
        if (error) {
            return res.status(httpStatusCodes.StatusCodes.BAD_REQUEST).json({ message: error.message });
        }

        const category = await Category.create(value);
        return res.status(httpStatusCodes.StatusCodes.CREATED).json(category);
    } catch (error) {
        console.log(error);
        return res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { error, value } = categorySchema.validate(req.body);
        if (error) {
            return res.status(httpStatusCodes.StatusCodes.BAD_REQUEST).json({ message: error.message });
        }

        const category = await Category.findByIdAndUpdate(req.params.id, value, { new: true });
        return res.status(httpStatusCodes.StatusCodes.OK).json({ category });
    } catch (error) {
        console.log(error);
        return res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};
