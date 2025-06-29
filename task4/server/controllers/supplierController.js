const User = require("../models/users")


const allSupplier= async (req, res) => {
  try {
    const data = await User.find({ role: 'supplier'},'username companyName phone');  // מחזיר את כל המסמכים בטבלה
    console.log("Retrieved data:", data)
    res.status(200).send(data); // שולח את הנתונים עם סטטוס 200
  } catch (err) {
    res.status(500).json({ message: 'Error fetching suppliers', error: err.message });
  }
};


//חיפוש  ספק לפי שם
// יכול להיות כמה ספקים באותו שם
// GET /suppliers/find?name=green

const findSupplierByName = async (req, res) => {
  try {
    const supplierName = req.query.name;

    if (!supplierName) {
      return res.status(400).json({ message: 'Missing supplier name in query' });
    }

    // חיפוש כל המשתמשים שהם ספקים (role: 'supplier') ושם המשתמש שלהם תואם
    const result = await User.find({
      role: 'supplier',
      username: { $regex: supplierName, $options: 'i' }} ,'username companyName phone');

    res.status(200).json(result);
  } catch (err) {
    console.error("Error finding supplier:", err);
    res.status(500).json({ message: 'Error fetching suppliers', error: err.message });
  }
};



module.exports={allSupplier,findSupplierByName}