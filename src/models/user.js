const mongoose = require('mongoose');
import bcrypt from 'bcrypt';
import configs from '../configs/global_config';

const Schema = mongoose.Schema;

const tableSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
}, {
  timestamps: true
});


tableSchema.pre('save', async function (next) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, Number(configs.bcryptSalt));
  }
  next();
});

tableSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  delete object.__v;
  return object;
});

module.exports = mongoose.model('user', tableSchema);
