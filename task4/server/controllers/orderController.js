const Order = require("../models/orders")
const User = require("../models/users")
const Product=require("../models/products");
const { not } = require("joi");



// //קבלת כל ההזמנות
const getOrders = async (req, res) => {
  try {
    const data = await Order.find({});  // מחזיר את כל המסמכים בטבלה
    console.log("Retrieved data:", data);
    res.status(200).json(data); // שולח את הנתונים עם סטטוס 200
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
};




// קבלת הזמנות של ספק מסוים
// יש לשפר את הפונקציה הזו
const getOrdersOfSupplier = async (req, res) => {
  try {
    const supplierId = req.params.supplierId; 

    if (!supplierId) {
      return res.status(400).json({ message: "Missing supplier ID" });
    }

    const data = await Order.find({ supplier: supplierId }); // מחפש הזמנות לפי שדה supplier

    console.log("Retrieved data:", data);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
};



//הזמנה חדשה

const newOrder=async(req,res)=>{
  try{
    const {supplier,products}= req.validatedBody
    const currentSupplier = await User.findById(supplier);
    if (!currentSupplier) {
        return res.status(404).json({ msg: "Supplier not found" })
      }
    if (currentSupplier.role !== "supplier") {
        return res.status(400).json({ msg: "You can only order from supplier" });
      }
        // 1. איחוד כמויות של מוצרים כפולים
    const productMap = new Map();
    for (const { product, quantity } of productMap.entries()) {
      const prevQuantity = productMap.get(product) || 0;
      productMap.set(product, prevQuantity + quantity);
    }

    const orderProducts = [];
    let totalPrice = 0;

    for (const p of products) {
      const { productId, quantity } = p;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ msg: `Product ${productId} not found` }); }
        //בודקים את  יש לספק הזה את המוצר
      if (!product.supplier|| product.supplier.toString() !== supplier) {
        return res.status(422).json({msg: `The supplier you choose doesn't have the product ${product.name}`});}
      if (quantity<product.minAmount){
        return res.status(422).json({msg: `quantity for product ${product.name} must be at least ${product.minQuantity}`})}
      orderProducts.push({ product: product._id, quantity })
      totalPrice += product.price * quantity;
    }
    const neworder = await Order.create({
      supplier,
      date:createDate(),
      products: orderProducts,
      totalPrice,
      status: "pending",
    });
    const savedOrder = await neworder.save();
    res.status(201).json(savedOrder);

  }
  catch (error) {
    console.error("Order creation error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ msg: "Invalid id format for product or supplier" });}
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
  

}
function createDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const date = `${day}/${month}/${year}`;
  return date;
}

//עידכון הסטטוס של ההזמנה
const OrderStatuse = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { status } = req.body;
    const { role } = req.user;
    if (!orderId || !status || !role) {
      return res.status(400).json({ message: "Missing parameters" });

    }
    const currentOrder = await Order.findById(orderId);
    if (!currentOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    // בדיקת סטטוס חוקי
    const validStatuses = ["ordered", "processing", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // הרשאות לפי תפקיד
    const rolePermissions = {
      supplier: ["processing"],
      admin: ["completed"]
    };

    if (!rolePermissions[role] || !rolePermissions[role].includes(status)) {
      return res.status(403).json({ message: "You do not have permission to set this status." });
    }

    // // מציאת ההזמנה לפי ID
    // const order = await Order.findById(orderId);
    // if (!order) {
    //   return res.status(404).json({ message: "Order not found" });
    // }
    
    // currentOrder.status=status;
    // שומר את השינוי
 const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } // מחזיר את ההזמנה אחרי העדכון
    );
    console.log("ז data:", updatedOrder);
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
};

// קבלת כל ההזמנות שהושלמו

const getCompletedOrders = async (req, res) => {
  try {
    const data = await Order.find({status:"completed"});  // מחזיר את כל המסמכים בטבלה
    console.log("Retrieved data:", data);
    res.status(200).json(data); // שולח את הנתונים עם סטטוס 200
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
};






module.exports = { getOrders,newOrder,OrderStatuse,getOrdersOfSupplier,getCompletedOrders };
