import { PAYFAST_CANCEL_URL, PAYFAST_NOTIFY_URL, PAYFAST_RETURN_URL } from "../utils/constant.js";

export const config = {
    merchantId: process.env.PAYFAST_MERCHANT_ID || '10038332',
    merchantKey: process.env.PAYFAST_MERCHANT_KEY || 'j55vbz7qn47x8',
    sandbox: process.env.PAYFAST_SANDBOX === 'true' || true,
    paymentUrl: process.env.PAYFAST_PAYMENT_URL ||
        (process.env.PAYFAST_SANDBOX === 'true' || true ?
            'https://sandbox.payfast.co.za/eng/process' :
            'https://www.payfast.co.za/eng/process'),
    return_url: PAYFAST_RETURN_URL,
    cancel_url: PAYFAST_CANCEL_URL,
    notify_url: PAYFAST_NOTIFY_URL,
};
