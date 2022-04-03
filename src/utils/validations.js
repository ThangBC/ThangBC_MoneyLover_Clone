import moment from 'moment';

const validateEmail = textInputEmail => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(textInputEmail);
};

const validatePassword = textInputPassword => {
  return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(textInputPassword);
};

const validateMoney = textInputMoney => {
  return /^[0-9,]*$/.test(textInputMoney);
};

const validateCurrentDate = textInputDate => {
  return moment(textInputDate).format('DD/MM/YYYY');
};

const formatMoney = inputMoney => {
  return inputMoney.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

const formatMoneyInput = inputMoney => {
  let num = inputMoney.replace(/,/gi, '');
  let num2 = num.replace(/\d(?=(?:\d{3})+$)/g, '$&,');
  return num2;
};

export {
  validateEmail,
  validatePassword,
  validateMoney,
  validateCurrentDate,
  formatMoney,
  formatMoneyInput,
};
