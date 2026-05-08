const User = require('../models/User');
const crypto = require('crypto');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      
      // Token format: id.hash
      const [id, hash] = token.split('.');
      
      // Verify hash
      const expectedHash = crypto.createHmac('sha256', process.env.JWT_SECRET || 'secretkey').update(id).digest('hex');
      
      if (hash === expectedHash) {
        req.user = await User.findById(id).select('-password');
        if (req.user) {
          return next();
        }
      }
      
      throw new Error('Invalid token');
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  res.status(401).json({ message: 'Not authorized, no token' });
};

module.exports = { protect };
