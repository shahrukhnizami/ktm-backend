import Joi from 'joi';

export const initiatePaymentSchema = Joi.object({
  donationId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid donation ID format',
      'any.required': 'Donation ID is required'
    }),
    
  paymentMethod: Joi.string()
    .valid('creditcard', 'debitcard', 'masterpass', 'mobicred', 'eftpro', 'snapscan', 'zapper')
    .required()
    .messages({
      'any.required': 'Payment method is required',
      'any.only': 'Invalid payment method selected'
    })
});

export const paymentStatusSchema = Joi.object({
  m_payment_id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
    
  pf_payment_id: Joi.string()
    .required(),
    
  payment_status: Joi.string()
    .valid('COMPLETE', 'FAILED', 'CANCELLED', 'PENDING')
    .required(),
    
  merchant_payment_id: Joi.string()
    .optional()
});