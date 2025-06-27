const Product  = require("../models/products");




// GET / - מחזיר את כל המוצרים
const allProduct= async (req, res) => {
  try {
    const data = await Product.find({});
    console.log("Retrieved data:", data);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

//החזרת מוצרים של  ספק מסויים 
const productsOfSupplier= async (req, res) => {
  try {
    const supplierName = req.params.supplierName;
      if (!supplierName) {
      return res.status(400).json({ message: 'no Product' });
    }
    const data = await Product.find({supplir:supplierName});
    console.log("Retrieved data:", data);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

//הוספת מוצר חדש
const addProduct= async (req, res) => {
  try {
    const product = new Product(req.body); // req.body כבר מאומת
    const savedProduct = await product.save();
    res.status(201).json(savedProduct); 
  } 
  catch (err) {
    console.error("Error saving product:", err);
    res.status(500).json({ message: 'Error saving product', error: err.message });
  }
  };

//חיפוש מוצר
//החזרת מוצרים של  ספק מסויים 
// GET /products?name=מקרר%20חכם

const searchProduct= (req, res) => {
  try {
    const productName = req.query.name;
    if (!productName) {
      return res.status(400).json({ message: 'Missing product name in query' });
    }
    // סינון לפי שם מדויק (אפשר לשנות ל-contains לפי צורך)
    const result = Product.filter(product =>
      product.name === productName
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

module.exports={allProduct,productsOfSupplier,addProduct,searchProduct}