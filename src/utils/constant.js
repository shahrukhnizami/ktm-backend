export const errorHandler = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export const responseHandler = (res, statusCode, message, data = null) => {
  const response = {
    success: true,
    message,
  };
  
  if (data !== null) {
    response.data = data;
  }
  
  return res.status(statusCode).json(response);
};

export const baseUrl = "https://192.168.5.32/";
export const PAYFAST_RETURN_URL = `${baseUrl}payment-success`;
export const PAYFAST_CANCEL_URL = `${baseUrl}payment-cancel`;
export const PAYFAST_NOTIFY_URL = `${baseUrl}payment-notify`;