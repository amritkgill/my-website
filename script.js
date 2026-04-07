// ===== Project Data for Modals =====
const projects = [
  {
    title: "Tariffs & Corporate Profit Shifting",
    meta: "Capstone Research \u2022 May 2026 \u2022 In Progress",
    overview: "Investigating how Section 301 tariffs impact corporate profit-shifting behavior among publicly traded U.S. firms. Using Bloomberg panel data and advanced causal inference techniques to isolate the true effect of tariff policy on multinational financial decisions.",
    findings: [
      "Analyzing Bloomberg panel data on publicly traded U.S. firms to assess the impact of Section 301 tariffs on foreign profit shifting",
      "Applying a continuous difference-in-differences model with event study design to estimate causal effects and validate pre-trends",
      "Constructing industry-level tariff exposure measures using USITC trade data, merged with firm-level financials"
    ],
    tools: ["Python", "Panel Data", "Diff-in-Diff", "Event Study", "Bloomberg", "USITC Data"],
    vizData: [
      { height: 30, color: "var(--color-1)", label: "2017" },
      { height: 35, color: "var(--color-2)", label: "2018" },
      { height: 65, color: "var(--color-3)", label: "2019" },
      { height: 80, color: "var(--color-4)", label: "2020" },
      { height: 70, color: "var(--color-5)", label: "2021" },
      { height: 90, color: "var(--color-6)", label: "2022" },
      { height: 85, color: "var(--color-7)", label: "2023" },
    ],
    gradient: "linear-gradient(135deg, var(--color-1), var(--color-2))"
  },
  {
    title: "Market Reaction to Economic Announcements",
    meta: "Econometric Analysis \u2022 May 2025",
    overview: "Explored how macroeconomic news events move financial markets by quantifying the immediate impact of different announcement types on S&P 500 returns. Used econometric modeling to uncover that Fed announcements had the strongest and most statistically significant effect.",
    findings: [
      "Quantified the impact of macroeconomic announcements on S&P 500 returns using OLS regression in Python, finding Fed announcements drove a statistically significant 0.19% return increase (p < 0.01)",
      "Modeled how market uncertainty affects price sensitivity by incorporating VIX and realized volatility interaction terms",
      "Validated model reliability using robust standard errors and lagged controls to address autocorrelation"
    ],
    tools: ["Python", "OLS Regression", "statsmodels", "VIX Analysis", "Robust SE", "Time Series"],
    vizData: [
      { height: 45, color: "var(--color-4)", label: "CPI" },
      { height: 35, color: "var(--color-5)", label: "GDP" },
      { height: 90, color: "var(--color-1)", label: "Fed" },
      { height: 40, color: "var(--color-6)", label: "Jobs" },
      { height: 55, color: "var(--color-7)", label: "Trade" },
      { height: 30, color: "var(--color-8)", label: "PMI" },
    ],
    gradient: "linear-gradient(135deg, var(--color-4), var(--color-5))"
  },
  {
    title: "Predicting Solar Energy Production",
    meta: "Machine Learning \u2022 March 2025",
    overview: "Built predictive models to forecast solar energy output using weather and irradiance data. Compared Random Forest and Decision Tree approaches, achieving strong predictive performance while ensuring the models generalize well to new data through cross-validation.",
    findings: [
      "Built Random Forest and Decision Tree forecasting models to predict solar energy output trends using weather and irradiance data, achieving R\u00b2 of 0.87",
      "Evaluated model generalization using k-fold cross-validation to prevent overfitting on unseen data",
      "Engineered features from weather variables and solar irradiance measurements to maximize predictive power"
    ],
    tools: ["Python", "scikit-learn", "Random Forest", "Decision Tree", "Cross-Validation", "Feature Engineering"],
    vizData: [
      { height: 20, color: "var(--color-7)", label: "Jan" },
      { height: 35, color: "var(--color-7)", label: "Mar" },
      { height: 60, color: "var(--color-8)", label: "May" },
      { height: 85, color: "var(--color-6)", label: "Jul" },
      { height: 70, color: "var(--color-5)", label: "Sep" },
      { height: 30, color: "var(--color-7)", label: "Nov" },
    ],
    gradient: "linear-gradient(135deg, var(--color-7), var(--color-8))"
  }
];

// ===== Typed Text Effect =====
const phrases = [
  "Economist.",
  "Data Storyteller.",
  "Causal Inference Enthusiast.",
  "Python & R Developer.",
  "Aspiring Researcher."
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById("typedText");

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentPhrase.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

setTimeout(typeEffect, 1200);

// ===== Card Flip =====
function flipCard(card) {
  card.classList.toggle("flipped");
}

// ===== Modal =====
function openModal(index) {
  const p = projects[index];
  const overlay = document.getElementById("modalOverlay");

  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalMeta").textContent = p.meta;
  document.getElementById("modalOverview").textContent = p.overview;

  const modalIcon = document.getElementById("modalIcon");
  modalIcon.style.background = p.gradient;
  // Copy the SVG from the corresponding card
  const cardIcons = document.querySelectorAll(".project-card-wrapper .card-icon svg");
  modalIcon.innerHTML = cardIcons[index] ? cardIcons[index].outerHTML : "";

  const findingsList = document.getElementById("modalFindings");
  findingsList.innerHTML = p.findings.map(f => `<li>${f}</li>`).join("");

  const toolsDiv = document.getElementById("modalTools");
  toolsDiv.innerHTML = p.tools.map(t => `<span>${t}</span>`).join("");

  // Build viz
  const vizDiv = document.getElementById("modalViz");
  vizDiv.innerHTML = "";
  p.vizData.forEach((bar, i) => {
    const el = document.createElement("div");
    el.className = "viz-bar";
    el.style.background = bar.color;
    el.style.height = "0%";
    el.setAttribute("data-label", bar.label);
    vizDiv.appendChild(el);
    // Animate bars in
    setTimeout(() => {
      el.style.height = bar.height + "%";
    }, 100 + i * 80);
  });

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const overlay = document.getElementById("modalOverlay");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

// Close modal with Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ===== Scroll Animations (Intersection Observer) =====
const fadeEls = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

fadeEls.forEach((el) => observer.observe(el));

// ===== Nav scroll effect =====
const nav = document.getElementById("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// ===== Mobile menu toggle =====
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");

navToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

// Close mobile menu when clicking a link
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });
});

// ===== 3D Tilt on Project Cards =====
const tiltCards = document.querySelectorAll("[data-tilt]");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    const inner = card.querySelector(".project-card");
    if (!inner.classList.contains("flipped")) {
      inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  });

  card.addEventListener("mouseleave", () => {
    const inner = card.querySelector(".project-card");
    if (!inner.classList.contains("flipped")) {
      inner.style.transform = "";
    }
  });
});

// ===== Smooth scroll for nav links =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
