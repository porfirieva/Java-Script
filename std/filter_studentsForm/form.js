window.Form = {
  getData() {
    const firstName = document.getElementById("firstName").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const patronomic = document.getElementById("patronomic").value.trim();
    const birthDate = document.getElementById("dateBirth").value;
    const eduStartDate = document.getElementById("eduStartDate").value;
    const faculty = document.getElementById("faculty").value.trim();

    return {
      surname,
      faculty,
      firstName,
      birthDate,
      patronomic,
      eduStartDate,
    };
  },
  onSubmit(callback) {
    const form = document.getElementById("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      callback(event);
    });
  },
};
