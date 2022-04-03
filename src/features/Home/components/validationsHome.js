import {validateCurrentDate} from '../../../utils/validations';
import moment from 'moment';

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
  return item.slice(0, 2);
};
const convertMonth = item => {
  return item.slice(3, -5);
};
const convertYear = item => {
  return item.slice(-4);
};

const convertDay = item => {
  const currentDate = moment(validateCurrentDate(new Date()), 'DD/MM/YYYY');
  const firebaseDate = moment(item, 'DD/MM/YYYY');
  return currentDate > firebaseDate
    ? 'Các ngày trước'
    : currentDate < firebaseDate
    ? 'Tương lai'
    : 'Hôm nay';
};

export {
  handleTotalSpend,
  handleTotalCollect,
  convertDate,
  convertMonth,
  convertYear,
  convertDay,
};
