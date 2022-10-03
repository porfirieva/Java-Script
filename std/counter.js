document.addEventListener("DOMContentLoaded", () => {
  const button = document.createElement("button");

  count = 0;
  function incrtement() {
    button.textContent = count++;
  }

  incrtement();

  button.addEventListener("click", incrtement);
  document.body.append(button);
});
