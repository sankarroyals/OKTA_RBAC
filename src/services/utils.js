/* eslint-disable prefer-const */

import fromExponential from 'from-exponential';

/* eslint-disable max-len */
export const titleCase = (str) => {
  let splitted = str?.toLowerCase().split(' ') || [];
  for (let i = 0; i < splitted.length; i++) {
    splitted[i] = splitted[i].charAt(0).toUpperCase() + splitted[i].slice(1);
  }
  return splitted.join(' ');
};

export const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

export const monthsCap = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

export const leapYear = (year) => {
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
};

export const generateMonthDropDownValues = () => {
  const planMonths = [];
  const offsetYear = 1;
  const currYear = new Date().getFullYear();
  const currMonth = new Date().getMonth();
  const NO_OF_YEARS = 3;
  const monthsUptoThisYear = monthArr.slice(0, currMonth+1).reverse();
  const remainingMonthsThisYear = monthArr.slice(currMonth+1).reverse();
  const prevTwoYearsWithOutMon = [Number(currYear)-1, Number(currYear)-2];
  const prevThreeYears = [];
  monthsUptoThisYear.forEach((month) => prevThreeYears.push(month +' ' + currYear));
  prevTwoYearsWithOutMon.forEach((year) => {
    const monthArrDummy = [...monthArr];
    monthArrDummy.reverse().forEach((month) => prevThreeYears.push(month +' ' + year));
  });
  remainingMonthsThisYear.forEach((month) => prevThreeYears.push(month +' ' + (currYear- NO_OF_YEARS)));
  // console.log({prevThreeYears});
  const toYear = currYear - offsetYear;
  for (let index = currYear; index >= toYear; index--) {
    for (let mindex=0; mindex < monthArr.length; mindex++) {
      const keystr = monthArr[mindex]+' '+index;
      const obj = {key: [index, mindex+1], value: keystr};
      planMonths.push(obj);
    }
  }
  const planMonthsModified = [];
  prevThreeYears.forEach( (year) => {
    const value = {'key': [Number(year.split(' ')[1]), Number(monthArr.indexOf(year.split(' ')[0])+1)], 'value': year};
    planMonthsModified.push(value);
  });
  return planMonthsModified;
};

export const dropDownValuesForNextThreeYears = () => {
  const planMonths = [];
  const offsetYear = 1;
  const currYear = new Date().getFullYear();
  const currMonth = new Date().getMonth();
  // const NO_OF_YEARS = 3;
  const monthsUptoThisYear = monthArr.slice(currMonth);
  // const remainingMonthsThisYear = monthArr.slice(0, currMonth+1);
  const prevTwoYearsWithOutMon = [Number(currYear)+1, Number(currYear)+2];
  const prevThreeYears = [];
  monthsUptoThisYear.forEach((month) => prevThreeYears.push(month +' ' + currYear));
  prevTwoYearsWithOutMon.forEach((year) => {
    const monthArrDummy = [...monthArr];
    monthArrDummy.forEach((month) => prevThreeYears.push(month +' ' + year));
  });
  // remainingMonthsThisYear.forEach((month) => prevThreeYears.push(month +' ' + (currYear + NO_OF_YEARS)));
  // console.log({prevThreeYears});
  const toYear = currYear - offsetYear;
  for (let index = currYear; index >= toYear; index--) {
    for (let mindex=0; mindex < monthArr.length; mindex++) {
      const keystr = monthArr[mindex]+' '+index;
      const obj = {key: [index, mindex+1], value: keystr};
      planMonths.push(obj);
    }
  }
  const planMonthsModified = [];
  prevThreeYears.forEach( (year) => {
    const value = {'key': [Number(year.split(' ')[1]), Number(monthArr.indexOf(year.split(' ')[0])+1)], 'value': year};
    planMonthsModified.push(value);
  });
  // console.log({planMonthsModified});
  return planMonthsModified;
};

export function roundToTwo(num) {
  if (num!==undefined && num?.toString().includes('e')) {
    console.log(num, fromExponential(num));
    return +parseFloat(+fromExponential(num)).toFixed(2);
  }
  if (isNaN(num) || num==null) return 0;
  // if (!Number.isInteger(num) && !(Math.floor(num) == num)) {
  if (num % 1 !== 0) {
    const roundedNum = +(Math.round(num + 'e+2') + 'e-2');
    if (roundedNum == 0) return 0;
    return roundedNum;
  } else {
    return parseFloat(num);
  }
}
