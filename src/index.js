import "./styles.css";

document
  .getElementById("user-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let username = document.getElementById("input-username").value;
    let email = document.getElementById("input-email").value;
    let address = document.getElementById("input-address").value;
    let isAdmin = document.getElementById("input-admin").checked;
    let UserImage = document.getElementById("input-image").files[0];

    let table = document.getElementById("user-table");
    let rows = table.getElementsByTagName("tr");
    let existingRow = null;

    // Checking if username is already existing
    for (let i = 1; i < rows.length; i++) {
      let rowUsername = rows[i].cells[0].textContent;
      if (rowUsername === username) {
        existingRow = rows[i];
        break;
      }
    }

    if (existingRow) {
      // If match is found, we edit the information
      existingRow.cells[1].textContent = email;
      existingRow.cells[2].textContent = address;
      existingRow.cells[3].textContent = isAdmin ? "X" : "-";
      if (UserImage) {
        let reader = new FileReader();
        reader.onload = function (e) {
          existingRow.cells[4].innerHTML =
            '<img src="' + e.target.result + '" width="64" height="64">';
        };
        reader.readAsDataURL(UserImage);
      }
    } else {
      // If match is not found, create a new row
      let newRow = table.insertRow(table.rows.length);
      let usernameNew = newRow.insertCell(0);
      let emailNew = newRow.insertCell(1);
      let addressNew = newRow.insertCell(2);
      let adminNew = newRow.insertCell(3);
      let imageNew = newRow.insertCell(4);

      usernameNew.textContent = username;
      emailNew.textContent = email;
      addressNew.textContent = address;
      adminNew.textContent = isAdmin ? "X" : "-";
      if (UserImage) {
        let reader = new FileReader();
        reader.onload = function (e) {
          imageNew.innerHTML =
            '<img src="' + e.target.result + '" width="64" height="64">';
        };
        reader.readAsDataURL(UserImage);
      }
    }

    // Resetting the forms
    document.getElementById("input-username").value = "";
    document.getElementById("input-email").value = "";
    document.getElementById("input-address").value = "";
    document.getElementById("input-admin").checked = false;
  });

// Button which empties the user information table
document.getElementById("empty-table").addEventListener("click", function () {
  let table = document.getElementById("user-table");
  let rowCount = table.rows.length;

  // Going through all rows in the table and deleting them.
  for (let i = rowCount - 1; i > 0; i--) {
    table.deleteRow(i);
  }
});
