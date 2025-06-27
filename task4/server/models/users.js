const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true}, // שם משתמש
  password: { type: String, required: true },   
  email: {type: String,required: true,unique: true,trim: true,match: [/^\S+@\S+\.\S+$/, 'כתובת מייל לא תקינה']},
  role: { type: String, enum: ['admin', 'supplier'], required: true }, // הרשאה
  phone:{ type: String, required: true },
  companyName:{ type: String },
  refreshToken: { type: String },                           // לטובת חידוש גישה
} ,{ timestamps: true });
//לעשות תקינות

module.exports = mongoose.model('User', userSchema);
