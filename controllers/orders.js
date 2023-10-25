import Order from "../models/Order.js";

/* CREATE */
export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
/* READ ALL*/
export const getOrders = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1; // 當前頁面
    const pageSize = 5; // 每頁的訂單數量
    const orderStatus = req.query.orderStatus;
    let totalOrders;
    let orders;
    if (orderStatus === "all" || !orderStatus) {
      totalOrders = await Order.countDocuments({});
      orders = await Order.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize);
    } else {
      totalOrders = await Order.countDocuments({ orderStatus: orderStatus });
      orders = await Order.find({ orderStatus: orderStatus })
        .skip((page - 1) * pageSize)
        .limit(pageSize);
    }
    const totalPages = Math.ceil(totalOrders / pageSize); // 總頁數
    // 為每個訂單添加序列號
    orders = orders.map((order, index) => {
      return {
        ...order._doc,
        serialNumber: (page - 1) * pageSize + index + 1,
      };
    });

    const response = {
      success: true,
      orders: orders,
      pagination: {
        total_pages: totalPages,
        current_page: page,
        has_pre: page > 1,
        has_next: page < totalPages,
      },
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// GET BY ID
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    await Order.findByIdAndRemove(req.params.orderId);
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// PATCH
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = req.body.orderStatus;
    await order.save();
    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      orderStatus: order.orderStatus,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
