const isValidAddTransaction = (money, type) => {
  if (money == '' || type == 'Chọn nhóm') {
    return true;
  }
  return false;
};

export {isValidAddTransaction};
