// Задание

// Напишите генератор массивов длиной count со случайными числами от n до m. Учтите, что n и m могут быть отрицательными, а также может быть n > m или n < m. Выведите результат с помощью console.log.

// Проверка результата
// Для проверки подставляйте различные значения count, m, n и смотрите на корректность результата. Примеры значений для проверки:

// n = 0, m = 100, count = 100;
// n = 2, m = 5, count = 50;
// n = 100, m = -5, count = 70;
// n = -3, m = -10, count = 42.

function randomArray(count, n, m) {

  let a = [];
  let max = Math.max(n, m);
  let min = Math.min(n, m);
  for (let i = 0; i < count; ++i) {
    a.push(Math.round(Math.random() * (max - min)) + min);
  }
  console.log(a);
}
