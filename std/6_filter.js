let array = [
  { surname: 'Porfirieva', city: 'Nsk', age: 23 },
  { surname: 'Maslennikov', city: 'Nsk', age: 31 },
];

function filter(arra, key, rightValue) {
  let newArr = [];
  for (let obj of arra) {
    if (obj[key] === rightValue) {
      newArr.push(obj);
    }
  }
  return newArr;
}

console.log(filter(array, 'city', 'Nsk'));