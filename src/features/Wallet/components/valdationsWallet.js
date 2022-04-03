const isValidCreateWallet = (disable, nameWallet) => {
  return nameWallet.trim().length >= 6 &&
    nameWallet.trim().length <= 20 &&
    disable == false
    ? true
    : false;
};

const validErrorNameWallet = inputNameWallet => {
  return inputNameWallet.trim().length < 6 || inputNameWallet.trim().length > 20
    ? '*Vui lòng nhập tên ví 6-20 ký tự'
    : '';
};

export {isValidCreateWallet, validErrorNameWallet};
