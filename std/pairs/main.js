(function () {
  createCards(16); // initial app

  function createCards(cardsCount) {
    const numbersArray = createPairsArray(8);
    const randomNumbers = shuffleNumbers(numbersArray);

    for (let i = 0; i < cardsCount; i++) {
      const container = document.querySelector(".container");
      const card = document.createElement("div");
      card.classList.add("card");
      card.textContent = randomNumbers[i];
      container.append(card);
    }
  }

  function shuffleNumbers(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function createPairsArray(pairs) {
    const numbers = [];
    for (let double = 0; double < 2; double++) {
      for (let pair = 1; pair <= pairs; pair++) {
        numbers.push(pair);
      }
    }
    return numbers;
  }

  const cards = document.querySelectorAll(".card");

  cards.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.target.classList.add("visible");

      let visibleCards = document.querySelectorAll(".visible");
      // console.log(visibleCards.length);

      if (visibleCards.length === 3) {
        document.querySelectorAll(".visible").forEach((item) => {
          item.classList.remove("visible");
        });
      }
    });
  });

  // console.log(item.classList.contains("visible"));
})();
