import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const tableSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  desc: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true
  },
  tag: {
    type: String,
    required: true,
    trim: true
  },
  createdBy: {
    type: String,
    required: true,
    trim: true
  },
  updatedBy: {
    type: String,
    required: true,
    trim: true
  },
}, {
  timestamps: true
});

tableSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  delete object.__v;
  return object;
});

module.exports = mongoose.model('course', tableSchema);
