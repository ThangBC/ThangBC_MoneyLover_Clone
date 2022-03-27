import {validateEmail, validatePassword} from '../../../utils/validations';

const isValidRegister = (email, password) => {
  return email.trim().length != 0 &&
    password.trim().length != 0 &&
    validateEmail(email) &&
    !validatePassword(password) &&
    password.trim().length >= 6 &&
    password.trim().length <= 20
    ? true
    : false;
};

const validErrorEmail = textEmail => {
  return textEmail.trim().length == 0
    ? '*Vui lòng không để trống Email'
    : !validateEmail(textEmail)
    ? '*Vui lòng nhập đúng định dạng Email'
    : '';
};

const validErrorPass = textPassword => {
  return textPassword.trim().length == 0
    ? '*Vui lòng không để trống Mật khẩu'
    : validatePassword(textPassword)
    ? '*Vui lòng không nhập những ký tự đặc biệt'
    : textPassword.trim().length < 6 || textPassword.trim().length > 20
    ? '*Vui lòng nhập mật khẩu 6-20 ký tự'
    : '';
};

export {isValidRegister, validErrorEmail, validErrorPass};
