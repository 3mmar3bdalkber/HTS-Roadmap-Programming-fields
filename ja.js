const stepElements = document.querySelectorAll(".number");
const stepCards = document.querySelectorAll(".step");

const totalSteps = stepElements.length;
const stepCountElement = document.getElementById("stepCount");
const trackFillElement = document.querySelector(".track-progress-fill");
const trackLabelElement = document.getElementById("trackLabel");

const pageName = location.pathname.split("/").pop() || "web.html";

let stepCount = Number(localStorage.getItem(`progress_${pageName}`)) || 0;
let hasScrolled = false;


function setProgressColor(percent) {
  if (percent <= 33) return "red";
  if (percent <= 66) return "yellow";
  return "green";
}

function updateProgressDisplay() {
  const percent = Math.round((stepCount / totalSteps) * 100);

  stepCountElement.textContent = `${stepCount} / ${totalSteps} steps`;
  trackLabelElement.textContent = `${percent}% Complete`;

  trackFillElement.style.width = `${percent}%`;
  trackFillElement.style.backgroundColor = setProgressColor(percent);
}

function enableSteps() {
  stepElements.forEach((step, i) => {
    const enabled =
      i === 0 || stepElements[i - 1].classList.contains("active");

    step.classList.toggle("disabled", !enabled);
    step.setAttribute("aria-disabled", !enabled);
  });
}

function updateCurrentStep() {
  stepElements.forEach(step => step.classList.remove("current"));

  const nextStep = [...stepElements].find(
    step => !step.classList.contains("active")
  );

  if (nextStep) {
    nextStep.classList.add("current");

    if (!hasScrolled) {
      nextStep.scrollIntoView({ behavior: "smooth", block: "center" });
      hasScrolled = true;
    }
  }
}


const savedSteps =
  JSON.parse(localStorage.getItem(`stepsState_${pageName}`)) || [];

stepElements.forEach((step, i) => {
  step.originalText = step.textContent;

  if (savedSteps[i]) {
    step.classList.add("active");
    step.textContent = "✔";
  }
});


stepElements.forEach((step, index) => {
  step.addEventListener("click", () => {
    if (step.classList.contains("disabled")) return;

    if (!step.classList.contains("active")) {
      step.classList.add("active");
      step.textContent = "✔";
      stepCount++;
    } else {
   
      if (next?.classList.contains("active")) return;
    }

    saveState();
    refreshUI();
  });
});

stepCards.forEach(card => {
  card.addEventListener("click", e => {
    if (!e.target.classList.contains("number")) {
      card.classList.toggle("open");
    }
  });
});


function saveState() {
  localStorage.setItem(`progress_${pageName}`, stepCount);
  localStorage.setItem(
    `stepsState_${pageName}`,
    JSON.stringify([...stepElements].map(s => s.classList.contains("active")))
  );
}

function refreshUI() {
  enableSteps();
  updateProgressDisplay();
  updateCurrentStep();
}
// localStorage.clear();
refreshUI();
