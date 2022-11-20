import { HttpStatus } from '@nestjs/common';

interface ErrorDetails {
  message: string;
  key: string;
  code: string;
}

enum ERROR_CODE {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  PARAM_INVALID = 'PARAM_INVALID',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_OTP = 'INVALID_OTP',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  HTTP_CALL_ERROR = 'HTTP_CALL_ERROR',
  ROLE_NOT_FOUND = 'ROLE_NOT_FOUND',
  EMAIL_OR_PHONE_EXISTS = 'EMAIL_OR_PHONE_EXISTS',
  YOU_HAVE_BEEN_SPAM = 'YOU_HAVE_BEEN_SPAM',
  YOU_HAVE_RECEIVED_CODE = 'YOU_HAVE_RECEIVED_CODE',
}

const ErrorList = {
  [ERROR_CODE.INTERNAL_SERVER_ERROR]: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Internal server error',
  },
  [ERROR_CODE.PARAM_INVALID]: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Parameters invalid',
  },
  [ERROR_CODE.HTTP_CALL_ERROR]: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Call http error',
  },
  [ERROR_CODE.UNEXPECTED_ERROR]: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Unexpected error',
  },
  [ERROR_CODE.UNAUTHORIZED]: {
    statusCode: HttpStatus.UNAUTHORIZED,
    message: 'Invalid email or password',
  },
  [ERROR_CODE.INVALID_OTP]: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Invalid OTP',
  },
  [ERROR_CODE.USER_NOT_FOUND]: {
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'User not found',
  },
  [ERROR_CODE.ROLE_NOT_FOUND]: {
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Role not found',
  },
  [ERROR_CODE.EMAIL_OR_PHONE_EXISTS]: {
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Email or phone exists',
  },
  [ERROR_CODE.YOU_HAVE_BEEN_SPAM]: {
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'You have been spamming',
  },
  [ERROR_CODE.YOU_HAVE_RECEIVED_CODE]: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'You have been received code, please check your sms',
  },
};
export { ErrorDetails, ERROR_CODE, ErrorList };
