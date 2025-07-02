const DASHBOARD_API = "http://localhost:3000/api/delivery/dashboard";
const PERSONNEL_API = "http://localhost:3000/api/user/active";

document.addEventListener("DOMContentLoaded", () => {
  fetchDashboardStats();
  fetchActivePersonnel();
});

function fetchDashboardStats() {
  fetch(DASHBOARD_API)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch dashboard data");
      return res.json();
    })
    .then(data => populateDashboard(data))
    .catch(err => console.error("Error fetching dashboard data:", err));
}

function fetchActivePersonnel() {
  fetch(PERSONNEL_API)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch personnel data");
      return res.json();
    })
    .then(data => populatePersonnel(data))
    .catch(err => console.error("Error fetching personnel data:", err));
}

function populateDashboard(data) {
  const infoBoxes = document.querySelectorAll(".info-box");

  // Total Packages & Pending
  const totalPackages = infoBoxes[0].querySelectorAll("p")[0];
  const pendingPackages = infoBoxes[0].querySelectorAll("p")[1];

  totalPackages.textContent = data.totalPackages + " packages";
  pendingPackages.textContent = data.pendingPackages + " pending";

  // Truck Capacity
  const truckCapacity = infoBoxes[1].querySelector("p");
  truckCapacity.textContent = data.truckCapacity + " kg capacity";

  // Route
  const route = infoBoxes[2].querySelectorAll("p")[1];
  route.textContent = data.route || "N/A";
}

function populatePersonnel(data) {
  const activePersonnel = document.querySelectorAll(".info-box")[2].querySelectorAll("p")[0];
  activePersonnel.textContent = data.activeCount + " active";
}
