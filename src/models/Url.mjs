import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: false,
    index: { expires: 0 }
  },
});

const Url = mongoose.model('Url', urlSchema);

export default Url;
