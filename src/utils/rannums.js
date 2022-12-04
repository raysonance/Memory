export default function generate(n) {
  let add = 1;
  let max = Math.pow(10, n + add);
  let min = max / 10;
  let number = Math.floor(Math.random() * (max - min + 1)) + min;
  number = ('' + number).substring(add);
  if (number.length < n) {
    number + String(Math.floor(Math.random() * 10));
  }
  let numberStr = number.split('');
  let last = null;
  let count = 0;
  for (let i = 0; i < numberStr.length; i++) {
    if (numberStr[i] !== last) {
      last = numberStr[i];
      count = 0;
    }
    count += 1;

    if (count === 3) {
      numberStr[i] = String(Math.floor(Math.random() * 10));
    }
  }
  number = numberStr.join('');
  return number;
}
