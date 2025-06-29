const Product  = require("../models/products");
const mongoose = require('mongoose');




// GET / - מחזיר את כל המוצרים
const allProduct = async (req, res) => {
  try {
    const data = await Product.find({})
      .populate('supplier', 'username companyName -_id')

    console.log("Retrieved data:", data);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

//החזרת מוצרים של  ספק מסויים 
const productsOfSupplier = async (req, res) => {
  try {
    const supplierId = req.params.supplierId;
    console.log('>>> supplierId received:', supplierId);


    if (!mongoose.Types.ObjectId.isValid(supplierId)) {
      return res.status(400).json({ message: 'Invalid supplier ID' });
    }

    const products = await Product.find({ supplier: supplierId });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};
;


//חיפוש מוצר
// GET /products?name=מקרר%20חכם
const searchProduct = async (req, res) => {
  try {
    const productName = req.query.name;
    if (!productName) {
      return res.status(400).json({ message: 'Missing product name in query' });
    }

    const result = await Product.find({
      name: { $regex: productName, $options: 'i' }
      
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};


//הוספת מוצר חדש
const addProduct= async (req, res) => {
  try {
    const { name, price, minAmount } = req.validatedBody;
    const supplierId = req.user.id;

    // בדיקה אם מוצר עם אותו שם כבר קיים לספק הזה
    const existingProduct = await Product.findOne({ name, supplier: supplierId });
    if (existingProduct) {
      return res.status(409).json({ message: 'Product with this name already exists for this supplier' });
    }
    const newProduct = new Product({
      name,
      price,
      minAmount,
      supplier: supplierId
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct); 
  } 
  catch (err) {
    console.error("Error saving product:", err);
    res.status(500).json({ message: 'Error saving product', error: err.message });
  }
  };

module.exports={allProduct,productsOfSupplier,addProduct,searchProduct}