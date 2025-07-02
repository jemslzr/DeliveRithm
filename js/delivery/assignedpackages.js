// Adjust to your actual backend API endpoint for the driver's assigned packages
const API_URL = "http://localhost:3000/api/delivery/assigned/driver";

document.addEventListener("DOMContentLoaded", () => {
  fetchAssignedPackages();
});

function fetchAssignedPackages() {
  fetch(API_URL)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch assigned packages");
      return res.json();
    })
    .then(data => populateTable(data))
    .catch(err => console.error("Error fetching assigned packages:", err));
}

function populateTable(assignedPackages) {
  const tbody = document.querySelector(".history-table tbody");
  tbody.innerHTML = "";

  if (assignedPackages.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 3;
    cell.textContent = "No assigned packages found.";
    cell.style.textAlign = "center";
    row.appendChild(cell);
    tbody.appendChild(row);
    return;
  }

  assignedPackages.forEach(pkg => {
    const row = document.createElement("tr");

    const addressCell = document.createElement("td");
    addressCell.textContent = pkg.address;

    const statusCell = document.createElement("td");
    statusCell.textContent = pkg.status;
    statusCell.style.fontWeight = "bold";
    statusCell.style.color = getStatusColor(pkg.status);

    const idCell = document.createElement("td");
    idCell.textContent = pkg.id;

    row.appendChild(addressCell);
    row.appendChild(statusCell);
    row.appendChild(idCell);

    tbody.appendChild(row);
  });
}

function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case "pending":
      return "#ffcc00"; // yellow
    case "in transit":
      return "#007777"; // teal
    case "delivered":
      return "green";
    case "cancelled":
      return "red";
    default:
      return "black";
  }
}
