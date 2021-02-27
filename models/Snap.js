const mongoose = require('mongoose');

const SnapSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: '',
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('snap', SnapSchema);
