document.addEventListener("DOMContentLoaded", () => {
  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal-on-scroll");

  if (!("IntersectionObserver" in window) || revealEls.length === 0) {
    revealEls.forEach((el) => el.classList.add("in-view"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  // Hero "live monitoring" animation status cycling
  const statusPill = document.querySelector(".live-status-pill");
  const appCard = document.querySelector(".live-app-card");
  const states = [
    {
      key: "ok",
      text: "Air Status: Clean",
      className: "status-ok",
      cardClass: "",
    },
    {
      key: "warn",
      text: "Air Status: Possible mold activity in Room 2",
      className: "status-warn",
      cardClass: "is-warning",
    },
    {
      key: "alert",
      text: "Air Status: Act now — check ventilation in Room 2",
      className: "status-alert",
      cardClass: "is-alert",
    },
  ];

  if (statusPill && appCard) {
    let index = 0;

    setInterval(() => {
      index = (index + 1) % states.length;
      const state = states[index];

      // reset classes
      statusPill.classList.remove("status-ok", "status-warn", "status-alert");
      appCard.classList.remove("is-warning", "is-alert");

      // apply new state
      statusPill.classList.add(state.className);
      if (state.cardClass) {
        appCard.classList.add(state.cardClass);
      }
      statusPill.textContent = state.text;
    }, 4000);
  }

  // Demo buttons: smooth scroll helpers
  const demoButton = document.getElementById("demo-button");
  const howItWorksButton = document.getElementById("how-it-works-button");
  const getStartedSection = document.getElementById("get-started");
  const howItWorksSection = document.getElementById("how-it-works");

  if (demoButton && getStartedSection) {
    demoButton.addEventListener("click", () => {
      getStartedSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (howItWorksButton && howItWorksSection) {
    howItWorksButton.addEventListener("click", () => {
      howItWorksSection.scrollIntoView({ behavior: "smooth" });
    });
  }
});
