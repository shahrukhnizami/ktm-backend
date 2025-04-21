import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donationType: {
    type: String,
    enum: ["Zakat", "Sadaqah", "Fitrana", "General Donation"],
    required: true
  },
  email: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  message: {
    type: String
  },
  payment: {
    method: {
      type: String,
      required: true,
      enum: ['creditcard', 'debitcard', 'masterpass', 'mobicred', 'eftpro', 'snapscan', 'zapper',"payfast"]
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled', 'failed'],
      default: 'pending'
    },
    pfPaymentId: {
      type: String
    },
    merchantPaymentId: {
      type: String
    },
  }  
}, { timestamps: true });

export const Donation = mongoose.model('Donation', donationSchema);