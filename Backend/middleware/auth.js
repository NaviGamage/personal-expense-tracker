const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // 1. Get the token from the Authorization header
  const authHeader = req.header('Authorization');
  
  // hedar or bearer token isnot present,block the request and send a 401 Unauthorized response
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Extract the token from the header (the part after "Bearer ")
  const token = authHeader.split(' ')[1];

  try {
    // 2. using the secret key to verify the token and decode it to get the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Attach the user ID to the request object so that it can be accessed in the route handler
    req.user = decoded.userId;
    
    // 4. Call the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};