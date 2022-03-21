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
  console.log(textInputDate);
  return (
    textInputDate.getDate() +
    '/' +
    (textInputDate.getMonth() + 1) +
    '/' +
    textInputDate.getFullYear()
  );
};

export {validateEmail, validatePassword, validateMoney, validateCurrentDate};
