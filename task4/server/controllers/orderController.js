const Order = require("../models/orders")

//קבלת כל ההזמנות
const getOrders =async (req, res) => {
  try {
    const data = await Order.find({});  // מחזיר את כל המסמכים בטבלה
    console.log("Retrieved data:", data)
    res.status(200).send(data); // שולח את הנתונים עם סטטוס 200
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

//קבלת הזמנות של ספק מסויים
// יש לשפר את הפונקציה הזו
// const getOrdersOfSupplies =async (req, res) => {
//   try {
//     const data = await Order.find({Supplies:Supplies});  // מחזיר את כל המסמכים בטבלה
//     console.log("Retrieved data:", data)
//     res.status(200).send(data); // שולח את הנתונים עם סטטוס 200
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching products', error: err.message });
//   }
// };


module.exports = { getOrders,getOrdersOfSupplies };
