const toWord = n => {
  let dg = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  let listNum = n.split('');
  listNum.map((num, index) => (listNum[index] = dg[num]));
  const numWord = listNum.join(' ');
  return numWord;
};

export default toWord;
