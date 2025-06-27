const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//פונקציה לאימות הטוקן

function auth(requiredRoles = []) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded;

      // אם requiredRoles ריק – כולם יכולים
      if (requiredRoles.length === 0 || requiredRoles.includes(decoded.role)) {
        return next();
      } else {
        return res.status(403).json({ msg: 'Access denied: insufficient role' });
      }
    } 
    catch (err) {
      return res.status(401).json({ msg: 'Invalid token' });
    }
  };
}

module.exports = auth;











// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();

// const verifyJWT = (req, res, next) => {
// const authHeader = req.headers['authorization'];

// if (!authHeader) return res.sendStatus(401);
// console.log(authHeader); // Bearer token
// const token = authHeader.split(' ')[1];

// jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, decoded) => {

//         if (err) return res.sendStatus(403); //invalid token

//         req.user = decoded.username;

//         next();

//         });

// }

// module.exports = verifyJWT;
