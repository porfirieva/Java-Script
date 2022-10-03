(function () {
  function createAppTitle(title) {
    let appTitle = document.createElement("h2");
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createTodoItemForm() {
    let form = document.createElement("form");
    let input = document.createElement("input");
    let button = document.createElement("button");
    let buttonWrapper = document.createElement("div");

    form.classList.add("input-group", "mb-3");
    input.classList.add("form-control");
    input.placeholder = "Введите название нового дела";
    button.classList.add("btn", "btn-primary");
    buttonWrapper.classList.add("input-group-append");
    button.textContent = "Добавить дело";

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    button.setAttribute("disabled", ""); // по умолчанию при загрузке страницы disabled
    input.addEventListener("input", function () {
      let inputValue = input.value; // получаем содержимое инпута
      if (inputValue === "") {
        button.setAttribute("disabled", "");
      } else {
        button.removeAttribute("disabled");
      }
    });

    return {
      form,
      input,
      button,
    };
  }

  function createTodoList() {
    let list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
  }

  function createTodoItem(name) {
    let item = document.createElement("li");

    let buttonGroup = document.createElement("div");
    let doneButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    item.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    item.textContent = name;

    buttonGroup.classList.add("btn-group", "btn-group-sm");
    doneButton.classList.add("btn", "btn-success");
    doneButton.textContent = "Готово";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Удалить";

    buttonGroup.append(deleteButton);
    buttonGroup.append(doneButton);
    item.append(buttonGroup);

    return {
      item,
      deleteButton,
      doneButton,
    };
  }

  function createTodoApp(container, title = "Список дел", initialTodo = []) {
    // отрисовка приложения
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    //для каждого объекта массива, передаваемого функции, делаем отрисовку
    initialTodo.forEach((todo) => {
      let todoItem = createTodoItem(todo.name);
      todoList.append(todoItem.item);

      todoItem.doneButton.addEventListener("click", function () {
        todoItem.item.classList.toggle("list-group-item-success");
        todo.done = !todo.done;
        localStorage.setItem(title, JSON.stringify(initialTodo));
      });
      todoItem.deleteButton.addEventListener("click", function () {
        if (confirm("Вы уверены?")) {
          todoItem.item.remove();
          let result = initialTodo.filter(
            (currentTodo) => currentTodo.name != todo.name
          );
          localStorage.setItem(title, JSON.stringify(result));
          initialTodo = result;
        }
      });

      if (todo.done === true) {
        todoItem.item.classList.add("list-group-item-success");
      }
    });

    // по клику на кнопку создания нового дела запускаем функцию
    todoItemForm.form.addEventListener("submit", function (e) {
      e.preventDefault(); // отменяем действие по умолчанию

      let currentInputValue = todoItemForm.input.value;
      let todo = {
        name: currentInputValue,
        done: false,
      };
      initialTodo.push(todo);
      localStorage.setItem(title, JSON.stringify(initialTodo));

      if (currentInputValue === "") {
        return; // если значение поля ввода пустое, завершить функцию
      }

      // возвращаем из функции создания дела кнопки удалить/готово, и вешаем на них слушателя
      let todoItem = createTodoItem(currentInputValue);

      todoItem.doneButton.addEventListener("click", function () {
        todoItem.item.classList.toggle("list-group-item-success");
        todo.done = !todo.done;
        localStorage.setItem(title, JSON.stringify(initialTodo));
      });
      todoItem.deleteButton.addEventListener("click", function () {
        if (confirm("Вы уверены?")) {
          todoItem.item.remove();
          let result = initialTodo.filter(
            (currentTodo) => currentTodo.name != todo.name
          );
          localStorage.setItem(title, JSON.stringify(result));
          initialTodo = result;
        }
      });

      // значение из инпута ли в список добавляем
      todoList.append(todoItem.item);

      todoItemForm.input.value = "";
      todoItemForm.button.setAttribute("disabled", "");
    });
  }

  window.createTodoApp = createTodoApp;
})();
