const validateEmail = textInputEmail => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(textInputEmail);
};

const validatePassword = textInputPassword => {
  return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(textInputPassword);
};

<<<<<<< HEAD
export {validateEmail, validatePassword};
=======
const validateMoney = textInputMoney => {
  return /^\d+$/.test(textInputMoney);
};

export {validateEmail, validatePassword, validateMoney};
>>>>>>> 0c89ede5586fd64fc648a73fc181ab37fae9f331
