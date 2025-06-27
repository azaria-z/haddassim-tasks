// יצירת ספק

// const newSupplier = new Supplier({
//   user: user._id, // מקשר למשתמש שנוצר קודם
//   companyName: req.body.companyName,
//   representativeName: req.body.representativeName,
//   phone: req.body.phone,
// });
// await newSupplier.save();

// const createSupplier = async (userId, supplierData) => {
//   const supplier = new SupplierModel({
//     userId,
//     companyName: supplierData.companyName,
//     phone: supplierData.phone,
//     address: supplierData.address,
//     // שדות נוספים
//   });
//   return await supplier.save();
// };
const SupplierModel = require('../models/suppliers');
const createSupplier = async (req, res) => {
  try {
    const { userId, companyName, phone, address } = req.body;

    if (!userId || !companyName) {
      return res.status(400).json({ msg: "Missing supplier fields" });
    }

    const supplier = new SupplierModel({
      userId,
      companyName,
      phone,
      address
    });

    await supplier.save();
    res.status(201).json({ msg: "Supplier details saved successfully" });

  } catch (err) {
    console.error("Error saving supplier:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports={createSupplier}