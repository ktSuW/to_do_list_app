"use Strict";
const taskManager = new TaskManager(0);

// *****************************************************
// Whenever the page loads, 
// it will only load what is in the local storage
// *****************************************************
loadPage = ()=> {
  taskManager.load();
  taskManager.render();
}

window.onload = loadPage();

// taskManager.load();
// taskManager.render();

const newTaskForm = document.querySelector("#newTaskForm");
// Reset modal and clear both error and success messages
const resetModal = document.querySelector("#open-task-modal");
const dateElement = document.querySelector("#currentDate");
/************************************************************
 * TASK 4 :
 ************************************************************/
// event listener
resetModal.addEventListener("click", () => {
  let messages = document.querySelectorAll(".validation-message");
  for (let i = 0; i < messages.length; i++) {
    messages[i].innerText = "";
  }
  let icons = document.querySelectorAll(".fas");
  for (let i = 0; i < icons.length; i++) {
    icons[i].classList.remove("fa-check-circle");
    icons[i].classList.remove("fa-exclamation-circle");
    icons[i].parentElement.classList.remove("success");
    icons[i].parentElement.classList.remove("error");
  }
});
$(".modal").on("hidden.bs.modal", function () {
  $(this).find("form")[0].reset();
});
newTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newTaskNameInput = document.querySelector("#newTaskNameInput");
  const newTaskDescription = document.querySelector("#newTaskDescription");
  const newTaskAssignedTo = document.querySelector("#newTaskAssignedTo");
  const newTaskDueDate = document.querySelector("#newTaskDueDate");
  const validationStatus = document.querySelector("#validationStatus");
  const name = newTaskNameInput.value.trim();
  const taskDescription = newTaskDescription.value.trim();
  const assignedTo = newTaskAssignedTo.value.trim();
  const dueDate = newTaskDueDate.value.trim();
  const status = validationStatus.value.trim();
  // const taskHTML = createTaskHTML(
  //   name,
  //   taskDescription,
  //   assignedTo,
  //   dueDate,
  //   status
  // );
  clearErrorMessage(newTaskNameInput);
  clearErrorMessage(newTaskDescription);
  clearErrorMessage(newTaskAssignedTo);
  clearErrorMessage(newTaskDueDate);
  clearErrorMessage(validationStatus);
  let isValid = validFormFieldInput(
    name,
    taskDescription,
    assignedTo,
    dueDate,
    status
  );
  if (isValid) {
    taskManager.addTask(name, taskDescription, assignedTo, dueDate, status);
    //Clear the text content within each tag
    newTaskNameInput.value = "";
    newTaskDescription.value = "";
    newTaskAssignedTo.value = "";
    newTaskDueDate.value = "";
    validationStatus.value = "";
  }
  taskManager.save();
  taskManager.render();
});
// validate the form
const validFormFieldInput = (
  name,
  taskDescription,
  assignedTo,
  dueDate,
  status
) => {
  // Setting boolean values
  let isNameValid = false;
  let isDescriptionValid = false;
  let isAssignedToValid = false;
  let isDueDateValid = false;
  let isStatusValid = false;
  clearErrorMessage(newTaskNameInput);
  clearErrorMessage(newTaskDescription);
  clearErrorMessage(newTaskAssignedTo);
  clearErrorMessage(newTaskDueDate);
  clearErrorMessage(validationStatus);
  // Name Validation
  if (name === "" || name === null) {
    //Show error and Add error class
    setErrorFor(newTaskNameInput, "Name cannot be blank.");
  } else if (name.length <= 5) {
    setErrorFor(newTaskNameInput, "Must be greater than 5.");
  } else {
    setSuccessFor(newTaskNameInput, "Correct input!");
    isNameValid = true;
  }
  // for task description
  if (taskDescription === "" || taskDescription === null) {
    setErrorFor(newTaskDescription, "Description cannot be blank.");
  } else if (taskDescription.length <= 5) {
    setErrorFor(newTaskDescription, "Must be greater than 5.");
  } else {
    setSuccessFor(newTaskDescription, "Correct input!");
    isDescriptionValid = true;
  }
  // for assigned to
  if (assignedTo === "" || assignedTo === null) {
    setErrorFor(newTaskAssignedTo, "Description cannot be blank.");
  } else if (assignedTo.length <= 5) {
    setErrorFor(newTaskAssignedTo, "Must be greater than 5.");
  } else {
    setSuccessFor(newTaskAssignedTo, "Correct input!");
    isAssignedToValid = true;
  }
  // for due date
  const today = formatDate(new Date());
  if (dueDate === "") {
    setErrorFor(newTaskDueDate, "Due date cannot be blank.");
  } else if (dueDate < today) {
    setErrorFor(newTaskDueDate, "Due date cannot be in the past");
  } else {
    setSuccessFor(newTaskDueDate, "Correct input!");
    isDueDateValid = true;
  }
  // for status
  if (status === "" || status === null) {
    setErrorFor(validationStatus, "Please select an option.");
  } else {
    setSuccessFor(validationStatus, "Correct input!");
    isStatusValid = true;
  }
  return (
    isNameValid &&
    isDescriptionValid &&
    isAssignedToValid &&
    isDueDateValid &&
    isStatusValid
  );
};
// format date
const formatDate = (date) => {
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let year = date.getFullYear();
  return `${year}-${month}-${day}`;
  // december dueDate > april currentDate = true is good
  // dueDate < today cannot be allowed
};
/**
 * Set error message for each invalid input
 */
function setErrorFor(element, message) {
  const small = element.parentElement.lastElementChild;
  small.innerText = message;
  small.style.visibility = "visible";
  element.parentElement.classList.add("error");
}
/**
 * Set success message for each valid input
 */
function setSuccessFor(element, message) {
  const small = element.parentElement.lastElementChild;
  small.innerText = message;
  small.style.visibility = "visible";
  element.parentElement.classList.add("success");
}
// clear error messages
function clearErrorMessage(element) {
  const small = element.parentElement.lastElementChild;
  small.innerText = "";
  small.style.visibility = "hidden";
  element.parentElement.classList.remove("error");
}
/************************************************************
 * Task 5: Adding Tasks
 ************************************************************/
// display Current date format
const formatCurrentDate = (date) => {
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let year = date.getFullYear();
  return `${day}-${month}-${year}`;
};
const todayDate = formatCurrentDate(new Date());
function displayCurrentDate(dateElement) {
  dateElement.innerText = todayDate;
}
displayCurrentDate(dateElement);
//===============================================================
// Sprint - 3 - Task 8 - Update A Task
//===============================================================
const tasksList = document.querySelector("#tasksList");
tasksList.addEventListener("click", (event) => {
  if (event.target.classList.contains("done-button")) {
    // select the li
    const parentTask = event.target.parentElement.parentElement;
    const taskId = Number(parentTask.dataset.taskId);
    let task = taskManager.getTaskById(taskId);
    task.status = "done";
    taskManager.render();
  }
});

//=================================================
// Light and Dark Theme 
//=================================================
const checkbox = document.querySelector("#checkbox");
checkbox.addEventListener("change", () => {
  //Change the theme of website
  document.body.classList.toggle("dark");
});