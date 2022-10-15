import response_code from './response_code';
import response_message from './response_response';

const response = {
  success: (res, msg, data = {}) => {
    const result = {
      status: true,
      code: response_code.success,
      message: msg,
      data: data,
      error_code: null,
      errors: {}
    };
    return res.status(response_code.success).json(result);
  },
  notFound: (res, msg = 'Data Not Found') => {
    const result = {
      status: false,
      code: response_code.notFound,
      message: msg,
      data: {},
      error_code: response_message.errorNotFound,
      errors: {}
    };
    return res.status(response_code.notFound).json(result);
  },
  errorValidate: (res, notValid = {}, msg = 'Validate Error', data = {}) => {
    const result = {
      status: false,
      code: response_code.validationError,
      message: msg,
      data: data,
      error_code: response_message.errorValidate,
      errors: notValid,
    };
    return res.status(response_code.validationError).json(result);
  },
  errorCustom: (res, error = 'errorServer', msg = 'Internal Server Error', notValid = {}, data = {}) => {
    const result = {
      status: false,
      code: response_code.badRequest,
      message: msg,
      data: data,
      error_code: response_message[error],
      errors: notValid,
    };
    return res.status(response_code.badRequest).json(result);
  },
  errorAuthNotFound: (res, msg = 'No token provided !!!', data = {}) => {
    const result = {
      status: false,
      code: response_code.authNotFound,
      message: msg,
      data: data,
      error_code: response_message.errorAuthNotFound,
      errors: {},
    };
    return res.status(response_code.authNotFound).json(result);
  },
  errorUnauthorized: (res, msg = 'Invalid Token !!!', data = {}) => {
    const result = {
      status: false,
      code: response_code.unAuthorizedRequest,
      message: msg,
      data: data,
      error_code: response_message.errorUnauthorized,
      errors: {},
    };
    return res.status(response_code.unAuthorizedRequest).json(result);
  },
  errorService: (res, msg = 'Internal Server Error', data = {}) => {
    const result = {
      status: false,
      code: response_code.internalServerError,
      message: msg,
      data: data,
      error_code: response_message.errorServer,
      errors: {},
    };
    return res.status(response_code.internalServerError).json(result);
  },
};

export default response;
