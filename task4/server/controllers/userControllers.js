const UserModel = require('../models/users')
const Product = require('../models/products');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


 // הרשמה למערכת

const sign_up= async (req, res) => {
  try {

    const { username,email, password, phone ,role,supplierInfo  } = req.validatedBody;
    console.log("Body:", req.validatedBody);
    if (role === 'admin') {
      const existingAdmin = await UserModel.findOne({ role: 'admin' });
      if (existingAdmin) {
        return res.status(400).json({ msg: "An admin already exists in the system" });
      }
    }

    // בדיקה אם המשתמש כבר קיים
    // אני בודקת לפי המייל שזה מזהה ייחודי
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "Username already exists" });
    }
    // הצפנת הסיסמה
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt);

    // יצירת משתמש חדש
    const newUser = new UserModel({
      username,
      password: hashedPassword,
      email,
      phone,
      role
    });
    if (role === 'supplier') {
      newUser.companyName = supplierInfo.companyName;
    }
    // שמירת המוצרים
    await newUser.save();
    if (role === 'supplier' && supplierInfo.products.length > 0) {
      const productDocs = supplierInfo.products.map((p) => ({
        Name: p.name,
        price: p.price,
        MinAmount :p.minAmount,
        supplier: newUser._id
      }));
      await Product.insertMany(productDocs);
    }


    
// במידה והוא ספק אני צריכה לקחת שדות נוספים
    res.status(201).json({ msg: "User created successfully" });

 } 
 catch (err) {
  console.error("Error creating user:", err);
  res.status(400).json({
    msg: "User creation failed",
    error: err.message,
    details: err.errors || null
  });
}

};


// התחברות למערכת

const login= async (req, res) => {
  try {
    const { email, password } = req.validatedBody;
    // חיפוש המשתמש במסד לפי שם משתמש
    const user = await UserModel.findOne({ email});
    if (!user) {
      return res.status(400).send('auth fail');
    }
    // השוואת סיסמה מוצפנת
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const accessToken = jwt.sign({id:user._id,role: user.role},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"10m"})
      const refreshToken = jwt.sign({ id: user._id },process.env.REFRESH_TOKEN_SECRET,{ expiresIn: '24d' });

        // שליחת עוגיה עם טוקן הריענון
      res.cookie('jwt', refreshToken, {
        httpOnly: true,      // לא נגיש ל-JS
        secure: true,        // רק ב-https (בהפעלה בפיתוח אפשר false)
        sameSite: 'Strict',  // הגנה מפני CSRF
        maxAge: 24 * 60 * 60 * 1000 // 24 שעות לדוגמה
      });

      // שמירה במסד הנתונים
      user.refreshToken = refreshToken;
      await user.save();
      res.json({ msg: 'Success', accessToken, refreshToken });
    } 

  else {
      res.status(401).send('auth fail');
    }

  } 
  
  catch (err) {
    console.error("Login error:", err);
    res.status(500).send('Internal Server Error');
  }
};


const logout= async (req, res) => {
  const refreshToken = req.cookies?.jwt || req.body.refreshToken;
   if (!refreshToken) return res.sendStatus(204); // אין טוקן, פשוט מחזירים שאין תוכן
    // מוחקים את הטוקן מהרשומות במסד הנתונים
  const user = await UserModel.findOne({ refreshToken });
  if (!user) {
    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'Strict' });
    return res.sendStatus(204);
  }
  user.refreshToken = null;
  await user.save();
  // מנקים את העוגיה בדפדפן
  res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'Strict' });
  res.json({ msg: 'Logged out successfully' });
};




module.exports = {
  sign_up,login,logout
};
