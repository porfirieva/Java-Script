const DATA_STUDENTS = [
  {
    surname: "Сидоров",
    firstName: "Иван",
    patronomic: "Михайлович",
    birthDate: "1990-12-23",
    eduStartDate: Number(2005),
    faculty: "Мехмат",
  },

  {
    surname: "Сидорова",
    firstName: "Ивана",
    patronomic: "Михайловна",
    birthDate: "1994-11-12",
    eduStartDate: Number(2021),
    faculty: "Журналистика",
  },

  {
    surname: "Бабушкина",
    firstName: "Мария",
    patronomic: "Алексеевна",
    birthDate: "1992-01-01",
    eduStartDate: Number(2019),
    faculty: "Информатика",
  },

  {
    surname: "Андропов",
    firstName: "Александр",
    patronomic: "Петрович",
    birthDate: "1992-10-03",
    eduStartDate: Number(2020),
    faculty: "Мехмат",
  },

  {
    surname: "Никифоров",
    firstName: "Олег",
    patronomic: "Олегович",
    birthDate: "1995-12-24",
    eduStartDate: Number(2017),
    faculty: "Мехмат",
  },

  {
    surname: "Никифоров",
    firstName: "Олег",
    patronomic: "Иванович",
    birthDate: "1995-12-24",
    eduStartDate: Number(2017),
    faculty: "Журналистика",
  },

  {
    surname: "Никифоров",
    firstName: "Олег",
    patronomic: "Иванович",
    birthDate: "1994-12-24",
    eduStartDate: Number(2017),
    faculty: "Журналистика",
  },

  {
    surname: "Кукушкин",
    firstName: "Олег",
    patronomic: "Олегович",
    birthDate: "1995-12-24",
    eduStartDate: Number(2017),
    faculty: "Журналистика",
  },
];
let SORT_STUDENTS = DATA_STUDENTS;


// let allStudents = Storage.getStudents();
// if (allStudents !== null) {
//   allStudents.forEach((el) => DATA_STUDENTS.push(el));
// }

createTable(DATA_STUDENTS);

Form.onSubmit(() => {
  const data = Form.getData();
  const { isValid, errors } = validateFormData(data);
  const birthDate = getAge(data.birthDate);

  const student = {
    firstName: data.firstName,
    surname: data.surname,
    patronomic: data.patronomic,
    faculty: data.faculty,
    birthDate,
    eduStartDate: Number(data.eduStartDate),
  };

  if (isValid) {
    DATA_STUDENTS.push(student);
    Storage.saveStudents(DATA_STUDENTS);
    clearForm();
    createTable(DATA_STUDENTS);
  } else {
    showErrors(errors);
  }
});

function validateFormData({ birthDate, eduStartDate }) {
  const errors = {};

  const firstNameValidator = validateFirstName(firstName);
  if (!firstNameValidator.valid) {
    errors.firstName = firstNameValidator.error;
  }

  const surnameValidator = validateSurname(surname);
  if (!surnameValidator.valid) {
    errors.surname = surnameValidator.error;
  }

  const patronomicValidator = validatePatronomic(patronomic);
  if (!patronomicValidator.valid) {
    errors.patronomic = patronomicValidator.error;
  }

  const currentDate = new Date();
  const birthFrom = new Date("1900-01-01T00:00:00");
  const birthStudent = new Date(birthDate);
  if (!(birthFrom < birthStudent && birthStudent < currentDate)) {
    errors.birthDate = "Введите корректную дату рождения";
  }

  const eduStartMax = currentDate.getFullYear();
  if (!(eduStartMax >= new Date(eduStartDate).getFullYear())) {
    errors.eduStartDate = "Введите год от 2000 до текущего";
  }

  const facultyValidator = validateFaculty(faculty);
  if (!facultyValidator.valid) {
    errors.faculty = facultyValidator.error;
  }

  const isValid = isObjectEmpty(errors);

  return { isValid, errors };
}

function validateFirstName(firstName) {
  if (firstName.value.length > 0) {
    return {
      valid: true,
    };
  } else {
    return {
      error: "Введите имя",
    };
  }
}

function validateSurname(surname) {
  if (surname.value.length > 0) {
    return {
      valid: true,
    };
  } else {
    return {
      error: "Введите фамилию",
    };
  }
}

function validatePatronomic(patronomic) {
  if (patronomic.value.length > 0) {
    return {
      valid: true,
    };
  } else {
    return {
      error: "Введите фамилию",
    };
  }
}

function validateFaculty(faculty) {
  if (faculty.value.length > 0) {
    return {
      valid: true,
    };
  } else {
    return {
      error: "Введите название факультета",
    };
  }
}

function showErrors(errors) {
  const nameErr = document.querySelector(".nameErr");
  const surErr = document.querySelector(".surErr");
  const patrErr = document.querySelector(".patErr");
  const birthErr = document.querySelector(".birthErr");
  const toStartErr = document.querySelector(".toStartErr");
  const facErr = document.querySelector(".facErr");
  nameErr.textContent = errors.firstName;
  surErr.textContent = errors.surname;
  patrErr.textContent = errors.patronomic;
  birthErr.textContent = errors.birthDate;
  toStartErr.textContent = errors.eduStartDate;
  facErr.textContent = errors.faculty;
}

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function clearForm() {
  firstName.value = "";
  surname.value = "";
  patronomic.value = "";
  dateBirth.value = "";
  eduStartDate.value = "";
  faculty.value = "";
  showErrors("");
}

function getStorage(key) {
  let storage = localStorage.getItem(key);
  if (storage == null) {
    return [];
  } else {
    let data = JSON.parse(storage);
    return data;
  }
}

function createTable(students) {
  drawTable(students);

  document.querySelector(".column-name").addEventListener("click", () => {
    createTable(
      students.sort((a, b) => {
        return a.surname + a.firstName + a.patronomic >
          b.surname + b.firstName + b.patronomic
          ? 1
          : b.surname + b.firstName + b.patronomic >
            a.surname + a.firstName + a.patronomic
          ? -1
          : 0;
      })
    );
  });

  document.querySelector("#facultyName").addEventListener("click", () => {
    createTable(
      students.sort((a, b) => {
        return a.faculty > b.faculty ? 1 : b.faculty > a.faculty ? -1 : 0;
      })
    );
  });

  document.querySelector("#age").addEventListener("click", () => {
    createTable(
      students.sort((a, b) => {
        return new Date(a.birthDate.split(" ")) >
          new Date(b.birthDate.split(" "))
          ? 1
          : new Date(b.birthDate.split(" ")) > new Date(a.birthDate.split(" "))
          ? -1
          : 0;
      })
    );
  });

  document.querySelector("#studies").addEventListener("click", () => {
    createTable(
      students.sort((a, b) => {
        return a.eduStartDate > b.eduStartDate
          ? 1
          : b.eduStartDate > a.eduStartDate
          ? -1
          : 0;
      })
    );
  });
}

document.querySelector("#fullnameSearch").addEventListener("input", () => {
  filterStudents()
});
document.querySelector("#facultySearch").addEventListener("input", () => {
  filterStudents()
});

document.querySelector("#startSearch").addEventListener("input", () => {
  filterStudents()
});

document.querySelector("#endSearch").addEventListener("input", () => {
  filterStudents()
});

function filterStudents() {
  let fullnameInput = getValue("#fullnameSearch");
  let facultyInput = getValue("#facultySearch");
  let startEduInput = getValue("#startSearch");
  let endEduInput = getValue("#endSearch");
  let match = false;

  let filteredStudents = DATA_STUDENTS.filter((student) => {
    if(fullnameInput) {
      let fullname = student.firstName + student.surname + student.patronomic;
      match = fullname.toLowerCase().includes(fullnameInput.toLowerCase())
      if (!match) {
        return false;
      }
    }

    if (facultyInput) {
      match = student.faculty.toLowerCase().includes(facultyInput.toLowerCase())
      if(!match) {
        return false;
      }
    }

    if (startEduInput) {
      match = String(student.eduStartDate).includes(startEduInput)
      if(!match) {
        return false
      }
    }

    if (endEduInput) {
      let endStudies = getEndStudies(student.eduStartDate);
      match = endStudies.includes(endEduInput)
      if(!match) {
        return false;
      }
    }

    return match;

  })

  if (!fullnameInput && !facultyInput && !startEduInput && !endEduInput) {
    createTable(DATA_STUDENTS)
  } else {
    createTable(filteredStudents)
  }
}

function getValue(id) {
  return document.querySelector(id).value
}

function getAge(birth) {
  const currentDay = new Date();
  const today = new Date(
    currentDay.getFullYear(),
    currentDay.getMonth(),
    currentDay.getDate()
  );
  const birthday = new Date(birth);
  let birthCurrentYear = new Date(
    today.getFullYear(),
    birthday.getMonth(),
    birthday.getDate()
  );
  let day = `${String(birthday.getDate())}-${String(
    birthday.getMonth() + 1
  )}-${String(birthday.getFullYear())}`;
  let age = today.getFullYear() - birthday.getFullYear();
  if (today < birthCurrentYear) {
    age = age - 1;
  }
  return `${day} (${age} лет)`;
}

function getEndStudies(startStudies) {
  let endStudies = startStudies + 4;
  const currentDate = new Date();
  const isAlready = new Date(endStudies, 09);
  const course = currentDate.getFullYear() - startStudies;
  if (isAlready < currentDate) {
    return (endStudies = "закончил");
  } else {
    return `${endStudies} (${course} курс)`;
  }
}

function drawTable(students) {
  const tableWrapper = document.querySelector(".table-wrapper");
  while (tableWrapper.firstChild) {
    tableWrapper.removeChild(tableWrapper.firstChild);
  }
  const COLUMN_NAME = document.createElement("div");
  const name = document.createElement("p");
  name.id = "name";
  const COLUMN_FACULTY = document.createElement("div");
  const faculty = document.createElement("p");
  faculty.id = "facultyName";
  const COLUMN_AGE = document.createElement("div");
  const age = document.createElement("p");
  age.id = "age";
  const COLUMN_STUDIES = document.createElement("div");
  const studies = document.createElement("p");
  studies.id = "studies";
  COLUMN_NAME.classList.add("col-4", "column-name");
  COLUMN_FACULTY.classList.add("col-3", "column-faculty");
  COLUMN_AGE.classList.add("col-2", "column-age");
  COLUMN_STUDIES.classList.add("col-3", "column-studie");
  name.textContent = "ФИО";
  faculty.textContent = "Факультет";
  age.textContent = "ДР";
  studies.textContent = "Годы обучения";
  COLUMN_NAME.append(name);
  COLUMN_FACULTY.append(faculty);
  COLUMN_AGE.append(age);
  COLUMN_STUDIES.append(studies);
  tableWrapper.append(COLUMN_NAME, COLUMN_FACULTY, COLUMN_AGE, COLUMN_STUDIES);

  students.forEach((el) => {
    const nameCell = document.createElement("p");
    nameCell.append(`${el.surname} ${el.firstName} ${el.patronomic}`);
    COLUMN_NAME.append(nameCell);

    const facultyCell = document.createElement("p");
    facultyCell.append(el.faculty);
    COLUMN_FACULTY.append(facultyCell);

    const ageCell = document.createElement("p");
    ageCell.append(getAge(el.birthDate));
    COLUMN_AGE.append(ageCell);

    const studiesCell = document.createElement("p");
    let endStudies = getEndStudies(el.eduStartDate);
    const eduStart = el.eduStartDate;
    let studiesYears = `${eduStart}-${endStudies}`;
    studiesCell.append(studiesYears);
    COLUMN_STUDIES.append(studiesCell);
  });
}

// search in the fullname
function searchFullname(event) {
  let value = event.target.value;
  if(value.length > 0) {
    value = value[0].toUpperCase() + value.slice(1);
    if(SORT_STUDENTS.length === 0) {
      DATA_STUDENTS.map((el) => {
        let pos = -1;
        let fullname = el.firstName + el.surname + el.patronomic;
        while((pos = fullname.indexOf(value, pos + 1)) != -1) {
          if(!SORT_STUDENTS.includes(el)) {
            SORT_STUDENTS.push(el);
          }
        }
      })
    } else {
      // console.log(SORT_STUDENTS)
      SORT_STUDENTS.map((el) => {
        let pos = -1;
        let fullname = el.firstName + el.surname + el.patronomic;
        while((pos = fullname.indexOf(value, pos + 1)) != -1) {
          if(!SORT_STUDENTS.includes(el)) {
            SORT_STUDENTS.push(el);
          }
        }
      })
      createTable(SORT_STUDENTS)
    }
  } else {
    createTable(DATA_STUDENTS);
  }
}

//search in the faculty name

function searchFullname(event) {
  let value = event.target.value;
  if(value.length > 0) {
    SORT_STUDENTS.sort(() => {

    })
    // SORT_STUDENTS = DATA_STUDENTS.
    // createTable(SORT_STUDENTS)
  }
}

function searchFaculty(event) {
  let value = event.target.value;
  if(value.length > 0) {
    value = value[0].toUpperCase() + value.slice(1)
    if(SORT_STUDENTS.length === 0) {
      DATA_STUDENTS.forEach((el) => {
        let pos = -1;
        while((pos = el.faculty.indexOf(value, pos + 1)) != -1) {
      
          SORT_STUDENTS = []

          if(!SORT_STUDENTS.includes(el)) {
            SORT_STUDENTS.push(el);
          }
        }
      })
    } else {
      // console.log(SORT_STUDENTS)
      SORT_STUDENTS.forEach((el) => {
        let pos = -1;
        while((pos = el.faculty.indexOf(value, pos + 1)) != -1) {
      // console.log(SORT_STUDENTS)
        SORT_STUDENTS = []

          if(!SORT_STUDENTS.includes(el)) {
            // SORT_STUDENTS = []
            SORT_STUDENTS.push(el);
            // console.log(SORT_STUDENTS)

          }
        }
      })
      createTable(SORT_STUDENTS);
    }
  } else {
    createTable(DATA_STUDENTS);
  }
}

//search in the start education
function searchStartEdu() {
  let value = document.getElementById('startSearch').value;
  const SORT_STUDENTS = [];
  DATA_STUDENTS.forEach((el) => {
    let pos = -1;
    while((pos = String(el.eduStartDate).indexOf(value, pos + 1)) != -1) {
      SORT_STUDENTS.push(el);
    }
  })
  createTable(SORT_STUDENTS)
}

//search in the end education
function searchEndEdu() {
  let value = document.getElementById('endSearch').value;
  const SORT_STUDENTS = [];
  DATA_STUDENTS.forEach((el) => {
    let pos = -1;
    let endStudies = getEndStudies(el.eduStartDate);
    while((pos = String(endStudies).indexOf(value, pos + 1)) != -1) {
      SORT_STUDENTS.push(el);
    }
  })
  createTable(SORT_STUDENTS)
}