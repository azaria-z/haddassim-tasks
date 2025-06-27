
//פה אני צריכה לשים ניתובים לכל התקינות
//הפונקציה צריכה לקבל את התקינות של הבקשה

// middleware/validate.js
const validate = (schema) => (req, res, next) => {
  console.log("Body received:", req.body);  // ← הדפסת DEBUG
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map((d) => d.message).join(', ');
    return res.status(400).json({ msg: messages });
  }
  req.validatedBody = value;
  console.log("finish validation")
  next();
};

module.exports = validate;
