document.addEventListener("DOMContentLoaded", () => {
  setupCardHoverEffects();
  setupClickableCards();
});

function setupCardHoverEffects() {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
      card.style.boxShadow = "0 8px 16px rgba(0,0,0,0.3)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
    });
  });
}

function setupClickableCards() {
  const emailCard = document.querySelector(".card:nth-child(1)");
  const phoneCard = document.querySelector(".card:nth-child(2)");
  const locationCard = document.querySelector(".card:nth-child(3)");
  const facebookCard = document.querySelector(".card:nth-child(4)");

  emailCard.addEventListener("click", () => {
    window.location.href = "mailto:support@deliverithm.com";
  });

  phoneCard.addEventListener("click", () => {
    window.location.href = "tel:+639123456789";
  });

  locationCard.addEventListener("click", () => {
    window.open("https://www.google.com/maps/search/Sta.+Mesa,+Manila+City,+Philippines", "_blank");
  });

  facebookCard.addEventListener("click", () => {
    window.open("https://facebook.com/Deliverithm", "_blank");
  });
}
