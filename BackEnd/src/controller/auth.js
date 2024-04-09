import bcryptjs from "bcryptjs";
import Joi from "joi";
import { User } from "../models/auth";
import jwt from "jsonwebtoken";

const signupSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required()
});

const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const signup = async (req, res) => {
    try {
        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const messages = error.details.map(err => err.message);
            return res.status(400).json({ messages });
        }

        const existUser = await User.findOne({ email: req.body.email });
        if (existUser) {
            return res.status(400).json({
                message: "Tài khoản đã tồn tại",
            });
        }

        const hashedPassword = await bcryptjs.hash(req.body.password, 10);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            confirmPassword: req.body.confirmPassword
        });

        const savedUser = await newUser.save();
        return res.status(201).json({ user: savedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const signin = async (req, res) => {
    try {
        const { error } = signinSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const messages = error.details.map(err => err.message);
            return res.status(400).json({ messages });
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                message: "Tài khoản không tồn tại",
            });
        }

        const isMatch = await bcryptjs.compare(req.body.password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu không đúng",
            });
        }

        const token = jwt.sign({ id: user._id }, "123456", { expiresIn: "1h" });
        return res.status(201).json({ user, token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
