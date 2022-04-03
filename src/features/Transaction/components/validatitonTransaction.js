const isValidAddTransaction = (disable, money, type) => {
  const removeComma = money.split(',').join('');
  const checkZeroMoney = removeComma - 0;
  if (checkZeroMoney == 0 || type == 'Chọn nhóm' || disable) {
    return true;
  }
  return false;
};

export {isValidAddTransaction};
