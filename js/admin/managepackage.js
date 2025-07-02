// Backend API Endpoints
const API_URL = "http://localhost:3000/api/delivery";
const ASSIGN_URL = "http://localhost:3000/api/delivery/assign";

document.addEventListener("DOMContentLoaded", () => {
  fetchPackages();

  document.querySelector(".btn-process").addEventListener("click", processAssignment);
});

function fetchPackages() {
  fetch(API_URL)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch packages");
      return res.json();
    })
    .then(data => populateTable(data))
    .catch(err => console.error("Error fetching packages:", err));
}

function populateTable(packages) {
  const tbody = document.querySelector(".package-table tbody");
  tbody.innerHTML = "";

  if (packages.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 4;
    cell.textContent = "No packages available.";
    cell.style.textAlign = "center";
    row.appendChild(cell);
    tbody.appendChild(row);
    return;
  }

  packages.forEach((pkg, index) => {
    const row = document.createElement("tr");

    const checkboxCell = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.dataset.packageId = pkg.id;
    checkboxCell.appendChild(checkbox);

    const idCell = document.createElement("td");
    idCell.textContent = pkg.id;

    const weightCell = document.createElement("td");
    weightCell.textContent = pkg.weight;

    const typeCell = document.createElement("td");
    typeCell.textContent = pkg.type;

    row.appendChild(checkboxCell);
    row.appendChild(idCell);
    row.appendChild(weightCell);
    row.appendChild(typeCell);

    tbody.appendChild(row);
  });
}

function processAssignment() {
  const selectedDriver = document.querySelector("select").value;
  if (selectedDriver === "Driver") {
    alert("Please select a personnel.");
    return;
  }

  const selectedPackageIds = Array.from(document.querySelectorAll(".package-table tbody input[type='checkbox']:checked"))
    .map(checkbox => checkbox.dataset.packageId);

  if (selectedPackageIds.length === 0) {
    alert("Please select at least one package.");
    return;
  }

  fetch(ASSIGN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      packageIds: selectedPackageIds,
      assignedTo: selectedDriver
    })
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to assign packages");
      return res.json();
    })
    .then(() => {
      alert("Packages assigned successfully.");
      fetchPackages(); // Refresh table
    })
    .catch(err => {
      console.error("Error assigning packages:", err);
      alert("Error assigning packages.");
    });
}
