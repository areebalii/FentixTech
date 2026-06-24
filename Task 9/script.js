const form = document.getElementById("studentForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const courseInput = document.getElementById("course");

const tableBody = document.getElementById("studentTableBody");

let editRow = null;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (validateForm()) {
    if (editRow === null) {
      addStudent();
    } else {
      updateStudent();
    }

    form.reset();
  }
});

function validateForm() {
  let isValid = true;

  clearErrors();

  if (nameInput.value.trim() === "") {
    document.getElementById("nameError").innerText = "Name is required";
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(emailInput.value.trim())) {
    document.getElementById("emailError").innerText = "Enter a valid email";
    isValid = false;
  }

  const phonePattern = /^[0-9]{11}$/;

  if (!phonePattern.test(phoneInput.value.trim())) {
    document.getElementById("phoneError").innerText =
      "Phone must contain 11 digits";
    isValid = false;
  }

  if (courseInput.value.trim() === "") {
    document.getElementById("courseError").innerText = "Course is required";
    isValid = false;
  }

  return isValid;
}

function clearErrors() {
  document.getElementById("nameError").innerText = "";
  document.getElementById("emailError").innerText = "";
  document.getElementById("phoneError").innerText = "";
  document.getElementById("courseError").innerText = "";
}

function addStudent() {
  const row = document.createElement("tr");

  row.innerHTML = `
        <td>${nameInput.value}</td>
        <td>${emailInput.value}</td>
        <td>${phoneInput.value}</td>
        <td>${courseInput.value}</td>

        <td>
            <button class="btn btn-warning btn-sm editBtn">
                Edit
            </button>

            <button class="btn btn-danger btn-sm deleteBtn">
                Delete
            </button>
        </td>
    `;

  tableBody.appendChild(row);
}

function updateStudent() {
  editRow.cells[0].innerText = nameInput.value;
  editRow.cells[1].innerText = emailInput.value;
  editRow.cells[2].innerText = phoneInput.value;
  editRow.cells[3].innerText = courseInput.value;

  editRow = null;
}

tableBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("deleteBtn")) {
    e.target.parentElement.parentElement.remove();
  }

  if (e.target.classList.contains("editBtn")) {
    editRow = e.target.parentElement.parentElement;

    nameInput.value = editRow.cells[0].innerText;

    emailInput.value = editRow.cells[1].innerText;

    phoneInput.value = editRow.cells[2].innerText;

    courseInput.value = editRow.cells[3].innerText;
  }
});
