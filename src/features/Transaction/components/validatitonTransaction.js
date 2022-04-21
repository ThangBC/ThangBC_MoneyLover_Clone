const isValidAddTransaction = (disable, money, type) => {
  const removeComma = money.split(',').join('');
  const checkZeroMoney = removeComma - 0;
  if (type == 'Chọn nhóm' || disable || checkZeroMoney.toString().length < 4) {
    return true;
  }
  return false;
};

export {isValidAddTransaction};
