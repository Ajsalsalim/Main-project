const jwt= require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    console.log("hello");
    const token = req.headers['x-access-token'];
    console.log(token);
    if (!token){
        return res.status(401).json({ message: 'Unauthorized' });
    } 
  
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(verified);
      next();
    } catch (error) {
      return res.json({ message: 'Token invalid' });
    }
  };

  exports.verifyToken=verifyToken