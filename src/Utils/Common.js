export const monthsCapital = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];
export const monthsCamelCase = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// input hello world nEW
// output Hello World New
export const stringToCamelCase = (string)=>{
  // const words = string.split(' ');
  // return words.map((word) => {
  //   return word[0].toUpperCase() + word.substring(1).toLowerCase();
  // }).join(' ');
  const splitStr = string.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ').trimEnd();
};

