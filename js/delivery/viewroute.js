// Replace with your actual backend route API
const ROUTE_API = "http://localhost:3000/api/delivery/route";

document.addEventListener("DOMContentLoaded", () => {
  fetchRouteData();
});

let map;

function fetchRouteData() {
  fetch(ROUTE_API)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch route data");
      return res.json();
    })
    .then(data => {
      initMap(data.route);
      populateRouteTable(data.packages);
    })
    .catch(err => console.error("Error fetching route data:", err));
}

function initMap(routeCoordinates) {
  // Default map center
  const mapCenter = routeCoordinates.length > 0 ? routeCoordinates[0] : { lat: 14.5995, lng: 120.9842 };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: mapCenter
  });

  // Draw route polyline
  new google.maps.Polyline({
    path: routeCoordinates,
    geodesic: true,
    strokeColor: "#00a6a6",
    strokeOpacity: 1.0,
    strokeWeight: 4,
    map: map
  });

  // Add markers
  routeCoordinates.forEach(coord => {
    new google.maps.Marker({ position: coord, map: map });
  });
}

function populateRouteTable(packages) {
  const tbody = document.querySelector(".route-table tbody");
  tbody.innerHTML = "";

  if (packages.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 2;
    cell.textContent = "No packages assigned for this route.";
    cell.style.textAlign = "center";
    row.appendChild(cell);
    tbody.appendChild(row);
    return;
  }

  packages.forEach(pkg => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = pkg.id;

    const routeCell = document.createElement("td");
    routeCell.textContent = pkg.route;

    row.appendChild(idCell);
    row.appendChild(routeCell);

    tbody.appendChild(row);
  });
}
