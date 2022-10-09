(() => {
  function createCards(cardsCount) {
    function createPairsArray(pairs) {
      const numbers = [];
      for (let double = 0; double < 2; double++) {
        for (let pair = 1; pair <= pairs; pair++) {
          numbers.push(pair);
        }
      }
      return numbers;
    }

    function shuffleNumbers(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    const numbersArray = createPairsArray(cardsCount / 2);
    const randomNumbers = shuffleNumbers(numbersArray);

    for (let i = 0; i < cardsCount; i++) {
      const container = document.querySelector('.container');
      const card = document.createElement('div');
      card.classList.add('card');
      card.textContent = randomNumbers[i];
      container.append(card);
    }
  }
  function initialGame() {
    const message = document.createElement('p');
    message.classList.add('message');
    message.textContent = 'Сколько пар карточек создать?*';
    const rules = document.createElement('p');
    rules.textContent = '*Введите чётное число от 2 до 8';
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.classList.add('input');
    const btnStart = document.createElement('input');
    btnStart.setAttribute('type', 'submit');
    btnStart.setAttribute('value', 'GO!');
    btnStart.classList.add('btn');

    form.append(input, btnStart);
    document.querySelector('.container').append(message, form, rules);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const pairs = input.value;
      const clearField = document.querySelector('.container');
      while (clearField.firstChild) {
        clearField.removeChild(clearField.firstChild);
      }
      createCards(pairs * 2);

      const cards = document.querySelectorAll('.card');

      let lastValue;
      let lastCard;

      function restartGame() {
        const restartBtn = document.createElement('button');
        restartBtn.classList.add('btn');
        restartBtn.textContent = 'Сыграть еще раз';
        clearField.append(restartBtn);
        restartBtn.addEventListener('click', () => {
          while (clearField.firstChild) {
            clearField.removeChild(clearField.firstChild);
          }
          initialGame();
        });
      }

      cards.forEach((item) => {
        item.addEventListener('click', () => {
          item.classList.add('visible');
          const visibleCards = document.querySelectorAll('.visible');
          const currentValue = item.textContent;
          item.classList.add('visible');

          if (visibleCards.length % 2 !== 0) {
            lastValue = currentValue;
            lastCard = item;
          } else if (visibleCards.length % 2 === 0) {
            setTimeout(() => {
              if (lastValue !== currentValue) {
                item.classList.remove('visible');
                lastCard.classList.remove('visible');
              }
              if (visibleCards.length === cards.length) {
                restartGame();
              }
            }, 300);
          }
        });
      });
    });
  }
  initialGame();
})();
