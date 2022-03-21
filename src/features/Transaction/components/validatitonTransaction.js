const isValidAddTransaction = (money, type, dateText) => {
  if (money == '' || type == 'Chọn nhóm' || dateText == 'Chọn ngày giao dịch') {
    return true;
  }
  return false;
};

export {isValidAddTransaction};
