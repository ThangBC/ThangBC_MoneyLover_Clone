import moment from 'moment';

const validateEmail = textInputEmail => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(textInputEmail);
};

const validatePassword = textInputPassword => {
  return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(textInputPassword);
};

const validateMoney = textInputMoney => {
  return /^\d+$/.test(textInputMoney);
};

const validateCurrentDate = textInputDate => {
  return moment(textInputDate).format('DD/MM/YYYY');
};

export {validateEmail, validatePassword, validateMoney, validateCurrentDate};
