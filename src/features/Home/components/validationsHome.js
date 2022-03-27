import {validateCurrentDate} from '../../../utils/validations';

const handleTotalCollect = totalCollect => {
  let sum = 0;
  totalCollect.forEach(collect => {
    sum += parseInt(collect);
  });
  return sum;
};

const handleTotalSpend = totalSpent => {
  let minus = 0;
  totalSpent.forEach(spent => {
    minus += parseInt(spent);
  });
  return minus;
};

const convertDate = item => {
  return item.date.slice(0, 2);
};
const convertMonth = item => {
  return item.date.slice(3, -5);
};
const convertYear = item => {
  return item.date.slice(-4);
};

const convertDay = item => {
  return item.date == validateCurrentDate(new Date())
    ? 'Hôm nay'
    : item.date > validateCurrentDate(new Date())
    ? 'Tương lai'
    : 'Các ngày trước';
};

export {
  handleTotalSpend,
  handleTotalCollect,
  convertDate,
  convertMonth,
  convertYear,
  convertDay,
};
