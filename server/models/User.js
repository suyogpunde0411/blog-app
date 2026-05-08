const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Hash password before saving using built-in crypto
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const hash = crypto.createHash('sha256').update(this.password).digest('hex');
  this.password = hash;
  next();
});

// Match user entered password to hashed password
userSchema.methods.matchPassword = function (enteredPassword) {
  const hash = crypto.createHash('sha256').update(enteredPassword).digest('hex');
  return hash === this.password;
};

module.exports = mongoose.model('User', userSchema);
