import Joi from 'joi';

export const createDonationSchema = Joi.object({
  donationType: Joi.string()
    .valid("Zakat", "Sadaqah", "Fitrana", "General Donation")
    .required()
    .messages({
      'any.required': 'Donation type is required',
      'any.only': 'Donation type must be one of: Zakat, Sadaqah, Fitrana, General Donation'
    }),
    
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required'
    }),
    
  amount: Joi.number()
    .positive()
    .required()
    .messages({
      'number.base': 'Amount must be a number',
      'number.positive': 'Amount must be greater than 0',
      'any.required': 'Amount is required'
    }),
    
  message: Joi.string()
    .allow('')
    .optional()
    .max(500)
    .messages({
      'string.max': 'Message cannot exceed 500 characters'
    }),
    
    payment: Joi.object({
      method: Joi.string()
        .valid('creditcard', 'debitcard', 'masterpass', 'mobicred', 'eftpro', 'snapscan', 'zapper','payfast')
        .required()
        .messages({
          'any.required': 'Payment method is required',
          'any.only': 'Invalid payment method selected'
        }),
  
      status: Joi.string()
        .valid('pending', 'completed', 'cancelled', 'failed')
        .default('pending')
        .messages({
          'any.only': 'Invalid payment status'
        }),
  
      pfPaymentId: Joi.string().allow('', null).optional(),
  
      merchantPaymentId: Joi.string().allow('', null).optional(),
    }).required()
});

export const donationIdSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid donation ID format',
      'any.required': 'Donation ID is required'
    })
});

export const updateDonationStatusSchema = Joi.object({
  donationId: Joi.string().required().messages({
    'string.base': 'Donation ID must be a string',
    'any.required': 'Donation ID is required'
  }),
  status: Joi.string().required().messages({
    'string.base': 'Status must be a string',
    'any.required': 'Status is required'
  }), 
  gatewayPaymentId: Joi.string().optional(),
  merchantPaymentId: Joi.string().optional()
});