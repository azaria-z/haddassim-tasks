

const jwt = require('jsonwebtoken');
const User = require('../models/users'); // המודל שלך ל-MongoDB
require('dotenv').config();


const RefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); // אין טוקן רענון

  const refreshToken = cookies.jwt;

  try {
    // מחפש משתמש עם טוקן הרענון במונגו
    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) return res.sendStatus(403); // לא נמצא משתמש עם הטוקן

    // מאמת את טוקן הרענון
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.username !== decoded.username) return res.sendStatus(403);

        // מייצר טוקן גישה חדש (Access Token)
        const accessToken = jwt.sign(
          { username: decoded.username,role:decoded.role },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '30s' }
        );

        res.json({ accessToken });
      }
    );
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = RefreshToken ;
