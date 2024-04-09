import mongoose from 'mongoose';
import Joi from 'joi';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    price: { type: Number, required: true, min: 0 },
    image: { type: String },
    description: { type: String }
});

const Product = mongoose.model('Product', productSchema);

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if(products.length === 0){
            return res.json(400).json([])
        }
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const addProduct = async (req, res) => {
    const { error } = Joi.object({
        name: Joi.string().min(3).required(),
        price: Joi.number().min(0).required(),
        image: Joi.string(),
        description: Joi.string()
    }).validate(req.body, { abortEarly: false });

    if (error) {
        const message = error.details.map((error) => error.message);
        return res.status(400).json({ message });
    }

    const newProduct = req.body;

    try {
        const createdProduct = await Product.create(newProduct);
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const updatedProductData = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (deletedProduct) {
            res.json({ message: "Product deleted successfully" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
