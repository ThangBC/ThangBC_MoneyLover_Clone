const validateEmail = textInputEmail => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(textInputEmail);
};

const validatePassword = textInputPassword => {
  return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(textInputPassword);
};

export {validateEmail, validatePassword};
