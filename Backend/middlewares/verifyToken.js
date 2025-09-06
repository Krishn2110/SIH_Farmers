// import jwt from 'jsonwebtoken'

// const verifyToken = (req, res, next) => {
//     const token = req.header('Authorization')?.replace('Bearer ', '');


//     if (!token) {
//         return res.status(400).json({ data: false, message: "Access denied.No token provied" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
//         req.user = decoded;
//         next();
//     } catch (e) {
//         return res.status(401).json({ data: false, message: "Invalid token." })
//     }
// }

// export default verifyToken;


import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader?.split(' ')[1];


  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    console.log("Decoded:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verify error:", err);
    return res.status(401).json({ data: false, message: "Invalid token." });
  }
};


export default verifyToken;
