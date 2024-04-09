import Cart from "../models/cart";
export const getcartByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ userId }).populate("products.productId");
        
        if (!cart) {
            return res.status(404).json({ message: "Không tìm thấy giỏ hàng cho người dùng này" });
        }

        const products = cart.products.map(item => ({
            productId: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            image: item.productId.image,
            quantity: item.quantity
        }));

        return res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi khi lấy giỏ hàng" });
    }
}


export const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        const existProductIndex = cart.products.findIndex((item) =>
            item.productId.toString() == productId
        );

        if (existProductIndex !== -1) {
            cart.products[existProductIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }

        await cart.save();

        return res.status(200).json({ message: "Đã thêm vào giỏ hàng" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const removeProductFromCart = async (req, res) => {
    const { userId, productId } = req.params; 

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Không tìm thấy giỏ hàng cho người dùng này" });
        }

        cart.products = cart.products.filter(item => item.productId.toString() !== productId);
        await cart.save();

        return res.status(200).json({ message: "Sản phẩm đã được xóa khỏi giỏ hàng" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi khi xóa sản phẩm khỏi giỏ hàng" });
    }
};
export const increaseProductQuantity = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Không tìm thấy giỏ hàng cho người dùng này" });
        }

        const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity++;
            await cart.save();
            return res.status(200).json({ message: "Số lượng sản phẩm đã được tăng" });
        } else {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi khi tăng số lượng sản phẩm" });
    }
};

export const decreaseProductQuantity = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Không tìm thấy giỏ hàng cho người dùng này" });
        }

        const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
        if (productIndex !== -1) {
            if (cart.products[productIndex].quantity > 1) {
                cart.products[productIndex].quantity--;
                await cart.save();
                return res.status(200).json({ message: "Số lượng sản phẩm đã được giảm" });
            } else {
                cart.products.splice(productIndex, 1);
                await cart.save();
                return res.status(200).json({ message: "Sản phẩm đã được xóa khỏi giỏ hàng" });
            }
        } else {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi khi giảm số lượng sản phẩm" });
    }
};
