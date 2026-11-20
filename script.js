/* =================================
INTERAKTIV SVG
================================= */

const girls = document.querySelector("#girls-instance");
const accordionItems = document.querySelectorAll(".accordion-item");

// Pigerne flytter sig mellem de tre positioner
const positions = {
  karneval: { x: 0, y: 0 },
  modeshow: { x: -360, y: 113 },
  kobenhavn: { x: 395, y: 95 },
};

function moveGirls(position) {
  if (!girls) {
    return;
  }

  const selectedPosition = positions[position];

  if (!selectedPosition) {
    return;
  }

  const { x, y } = selectedPosition;

  girls.setAttribute("transform", `translate(${x} ${y})`);
}

// Lyt efter klik på accordion-knapperne
accordionItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      moveGirls(item.dataset.position);
    }
  });
});

// Start ved karneval
moveGirls("karneval");

/* =================================
INTERAKTIV SVG-SIDE
================================= */

const svgPlaceholder = document.querySelector(".svg-placeholder");

function updateSvgPosition() {
  const openDetails = document.querySelector(".accordion-item:open");

  if (openDetails && svgPlaceholder) {
    svgPlaceholder.dataset.position = openDetails.dataset.position;
  }
}

if (svgPlaceholder) {
  svgPlaceholder.addEventListener("toggle", updateSvgPosition);
}

/* =================================
OPSAMLINGSSIDE – PERSONLIG STILPROFIL
================================= */

const opsamlingPlaceholder = document.querySelector(".opsamling-placeholder");

if (opsamlingPlaceholder) {
  const params = new URLSearchParams(window.location.search);

  const colors = params.get("colors");
  const outfit = params.get("outfit");
  const values = params.get("values");
  const personality = params.get("personality");
  const hype = params.get("hype");

  // Start med 0 point til hver stiltype
  const scores = {
    sofistikeret: 0,
    modig: 0,
    afslappet: 0,
    kreativ: 0,
  };

  // Outfit
  if (outfit === "Elegant og sofistikeret") scores.sofistikeret++;
  if (outfit === "Farverigt og iøjnefaldende") scores.modig++;
  if (outfit === "Afslappet og moderne") scores.afslappet++;
  if (outfit === "Unikt og eksperimenterende") scores.kreativ++;

  // Værdier
  if (values === "At se elegant ud") scores.sofistikeret++;
  if (values === "At skille mig ud") scores.modig++;
  if (values === "At føle mig komfortabel") scores.afslappet++;
  if (values === "At være tro mod min personlighed") scores.kreativ++;

  // Personlighed
  if (personality === "Sofistikeret") scores.sofistikeret++;
  if (personality === "Modig") scores.modig++;
  if (personality === "Afslappet") scores.afslappet++;
  if (personality === "Kreativ") scores.kreativ++;

  // Farvevalg
  if (colors === "Sort, beige og brun") scores.sofistikeret++;
  if (colors === "Rød, pink og orange") scores.modig++;
  if (colors === "Hvid, grå og neutrale") scores.afslappet++;
  if (colors === "Forskellige farver") scores.kreativ++;

  // Forskellige stilprofiler
  const profiles = {
    sofistikeret: {
      title: "Den sofistikerede type",
      subtitle: "Elegant · Tidløs · Stilbevidst",
      description:
        "Du elsker et klassisk og elegant udtryk. Du foretrækker stilrene farver, smukke detaljer og outfits, der udstråler selvsikkerhed. Din stil er sofistikeret uden at være overdreven.",
    },

    modig: {
      title: "Den modige type",
      subtitle: "Farverig · Selvsikker · Iøjnefaldende",
      description:
        "Du elsker at skille dig ud og tør eksperimentere med farver og spændende outfits. Mode er for dig en måde at vise din personlighed på. Du er ikke bange for at tage chancer.",
    },

    afslappet: {
      title: "Den afslappede type",
      subtitle: "Komfortabel · Moderne · Naturlig",
      description:
        "Du foretrækker en stil, hvor komfort og personlighed går hånd i hånd. Du elsker moderne og enkle outfits, som du føler dig godt tilpas i, uden at gå på kompromis med udseendet.",
    },

    kreativ: {
      title: "Den kreative type",
      subtitle: "Unik · Eksperimenterende · Personlig",
      description:
        "Du elsker at udforske nye udtryk og sammensætte outfits på din egen måde. Du ser mode som en kreativ legeplads, hvor der er plads til individualitet og personlig stil.",
    },
  };

  // Find stiltypen med flest point
  let winningProfile = "sofistikeret";
  let highestScore = -1;

  for (const profile in scores) {
    if (scores[profile] > highestScore) {
      highestScore = scores[profile];
      winningProfile = profile;
    }
  }

  // Ved pointlighed bruges personlighed og derefter outfit
  const personalityProfiles = {
    Sofistikeret: "sofistikeret",
    Modig: "modig",
    Afslappet: "afslappet",
    Kreativ: "kreativ",
  };

  const outfitProfiles = {
    "Elegant og sofistikeret": "sofistikeret",
    "Farverigt og iøjnefaldende": "modig",
    "Afslappet og moderne": "afslappet",
    "Unikt og eksperimenterende": "kreativ",
  };

  const personalityChoice = personalityProfiles[personality];
  const outfitChoice = outfitProfiles[outfit];

  if (personalityChoice && scores[personalityChoice] === highestScore) {
    winningProfile = personalityChoice;
  } else if (outfitChoice && scores[outfitChoice] === highestScore) {
    winningProfile = outfitChoice;
  }

  const result = profiles[winningProfile];

  // Byg opsamlingskortet
  const card = document.createElement("div");
  card.className = "style-result-card";

  const heading = document.createElement("h2");
  heading.textContent = result.title;

  const subtitle = document.createElement("h3");
  subtitle.textContent = result.subtitle;

  const description = document.createElement("p");
  description.textContent = result.description;

  const mode = document.createElement("p");
  mode.textContent =
    "Din interesse for mode: " + (hype || "Ikke besvaret") + " ud af 10";

  card.append(heading, subtitle, description, mode);
  opsamlingPlaceholder.appendChild(card);
}

/* =================================
LIGHT MODE / DARK MODE
================================= */

// Hent det gemte tema
const savedTheme = localStorage.getItem("theme") || "light";

// Anvend temaet på alle sider
document.documentElement.setAttribute("data-theme", savedTheme);

// Find dark mode-knappen (findes kun på forsiden)
const themeToggle = document.getElementById("theme-toggle");

// Opdater knappens tekst
function updateThemeButton() {
  if (themeToggle) {
    themeToggle.textContent =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "☀ Light mode"
        : "☾ Dark mode";
  }
}

updateThemeButton();

// Skift tema ved klik
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    const newTheme = currentTheme === "dark" ? "light" : "dark";

    // Skift tema
    document.documentElement.setAttribute("data-theme", newTheme);

    // Gem temaet til alle undersider
    localStorage.setItem("theme", newTheme);

    // Opdater knappen
    updateThemeButton();
  });
}
