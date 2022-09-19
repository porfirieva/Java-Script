let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130,
};

function sumAllMoney(obj) {
  let summary;
  for (let key in obj) {
    summary += obj[key];
  }
  console.log(summary);
}

sumAllMoney(salaries);
