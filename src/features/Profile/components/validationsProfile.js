import {validatePassword} from '../../../utils/validations';

const isValidChangePass = (inputOldPass, inputNewPass) => {
  return inputOldPass.trim().length != 0 &&
    inputNewPass.trim().length != 0 &&
    !validatePassword(inputOldPass) &&
    !validatePassword(inputNewPass) &&
    inputOldPass.trim().length >= 6 &&
    inputOldPass.trim().length <= 20 &&
    inputNewPass.trim().length >= 6 &&
    inputNewPass.trim().length <= 20
    ? true
    : false;
};
const validErrorPass = inputPass => {
  return inputPass.trim().length == 0
    ? '*Vui lòng không để trống mật khẩu'
    : validatePassword(inputPass)
    ? '*Vui lòng không nhập những ký tự đặc biệt'
    : inputPass.trim().length < 6 || inputPass.trim().length > 20
    ? '*Vui lòng nhập mật khẩu 6-20 ký tự'
    : '';
};

export {isValidChangePass, validErrorPass};
