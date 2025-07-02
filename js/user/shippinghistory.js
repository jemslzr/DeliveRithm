const API_URL = "http://localhost:3000/api/delivery/history";

document.addEventListener("DOMContentLoaded", () => {
  fetchShippingHistory();
});

function fetchShippingHistory() {
  fetch(API_URL)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch shipping history");
      return res.json();
    })
    .then(data => populateTable(data))
    .catch(err => console.error("Error fetching shipping history:", err));
}

function populateTable(packages) {
  const tbody = document.querySelector(".history-table tbody");
  tbody.innerHTML = "";

  if (packages.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 4;
    cell.textContent = "No shipping history available.";
    cell.style.textAlign = "center";
    row.appendChild(cell);
    tbody.appendChild(row);
    return;
  }

  packages.forEach(pkg => {
    const row = document.createElement("tr");

    const addressCell = document.createElement("td");
    addressCell.textContent = pkg.address;

    const statusCell = document.createElement("td");
    statusCell.textContent = pkg.status;
    statusCell.style.fontWeight = "bold";
    statusCell.style.color = getStatusColor(pkg.status);

    const typeCell = document.createElement("td");
    typeCell.textContent = pkg.packageType;

    const idCell = document.createElement("td");
    idCell.textContent = pkg.id;

    row.appendChild(addressCell);
    row.appendChild(statusCell);
    row.appendChild(typeCell);
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
