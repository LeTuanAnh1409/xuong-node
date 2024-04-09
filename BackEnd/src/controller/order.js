import Order from "../models/order.js";


export const createOrder = async (req, res) => {
    try {
        // Ensure user is authenticated
        const userId = req.user._id;

        // Validate input data
        const { items, totalPrice, customerInfo } = req.body;
        if (!items || !totalPrice || !customerInfo) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Create the order
        const order = await Order.create({ userId, items, totalPrice, customerInfo });
        
        // Return success response
        return res.status(201).json(order);
    } catch (error) {
        // Handle errors
        console.error("Error creating order:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Other route handlers (getOrders, getOrderById, updateOrder, updateOrderStatus) remain unchanged


export const getOrders = async (req, res) => {
    try {
        const order = await Order.find();
        if (order.length === 0) {
            return res.status(404).json({ error: "No orders found" }); // Status code 404 for Not Found
        }
        return res.status(200).json(order); // Status code 200 for OK
    } catch (error) {
        return res.status(500).json({ error: error.message }); // Status code 500 for Internal Server Error
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { userId, orderId } = req.params;
        const order = await Order.findOne({ userId, _id: orderId });
        if (!order) {
            return res.status(404).json({ error: "Order not found" }); // Status code 404 for Not Found
        }
        return res.status(200).json(order); // Status code 200 for OK
    } catch (error) {
        return res.status(500).json({ error: error.message }); // Status code 500 for Internal Server Error
    }
};

export const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findOneAndUpdate({ _id: orderId }, req.body, {
            new: true,
        });
        if (!order) {
            return res.status(404).json({ error: "Order not found" }); 
        }
        return res.status(200).json(order); 
    } catch (error) {
        return res.status(500).json({ error: error.message }); 
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const validStatus = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

        if (!validStatus.includes(status)) {
            return res.status(400).json({ error: "Invalid status" }); 
        }

        const order = await Order.findOne({ _id: orderId });
        if (!order) {
            return res.status(404).json({ error: "Order not found" }); 
        }

        if (order.status === "delivered" || order.status === "cancelled") {
            return res.status(400).json({ error: "Order cannot be updated" }); 
        }

        order.status = status;
        await order.save();

        return res.status(200).json({ message: "Order status updated successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message }); 
    }
};
