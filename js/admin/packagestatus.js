const API_URL = "http://localhost:3000/api/delivery/status";

document.addEventListener("DOMContentLoaded", () => {
  fetchPackageStatus();
});

function fetchPackageStatus() {
  fetch(API_URL)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch package status");
      return res.json();
    })
    .then(data => populateTable(data))
    .catch(err => console.error("Error fetching package status:", err));
}

function populateTable(packages) {
  const tbody = document.querySelector(".history-table tbody");
  tbody.innerHTML = "";

  if (packages.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 3;
    cell.textContent = "No packages found.";
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

    const routeCell = document.createElement("td");
    routeCell.textContent = pkg.route;

    row.appendChild(addressCell);
    row.appendChild(statusCell);
    row.appendChild(routeCell);

    tbody.appendChild(row);
  });
}
