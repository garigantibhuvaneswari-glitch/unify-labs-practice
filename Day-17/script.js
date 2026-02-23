
let database = null;
let internsCollection = [];

function createDatabase() {
  database = "unify_labs";
  alert("Database 'unify_labs' created (simulation)");
}

function addCollection() {
  if (!database) {
    alert("Create database first!");
    return;
  }
  internsCollection = [];
  alert("Collection 'interns' added (simulation)");
}

function insertInterns() {
  internsCollection = [
    { name: "Mounika", role: "Frontend Developer", joinedDate: "2024-01-10" },
    { name: "Ammu", role: "Backend Developer", joinedDate: "2024-02-15" },
    { name: "Archana", role: "UI Designer", joinedDate: "2024-03-01" }
  ];
  displayInterns();
}

function displayInterns() {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  internsCollection.forEach(intern => {
    tableBody.innerHTML += `
      <tr>
        <td>${intern.name}</td>
        <td>${intern.role}</td>
        <td>${intern.joinedDate}</td>
      </tr>
    `;
  });
}