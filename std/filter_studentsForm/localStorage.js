window.Storage = {
  getStudents() {
    return JSON.parse(localStorage.getItem("students"));
  },
  saveStudents(students) {
    localStorage.setItem("students", JSON.stringify(students));
  },
};
