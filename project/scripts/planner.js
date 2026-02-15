const goals = [
  {
    id: "strength",
    title: "Build Strength",
    summary: "Three focused strength sessions with simple full-body movements.",
    sessions: [
      {
        day: "Day 1",
        focus: "Full-body strength",
        duration: "35-45 minutes",
        tasks: ["Goblet squats", "Incline push-ups", "Dumbbell rows", "Plank holds"],
      },
      {
        day: "Day 2",
        focus: "Lower body + core",
        duration: "30-40 minutes",
        tasks: ["Split squats", "Glute bridges", "Farmer carries", "Side planks"],
      },
      {
        day: "Day 3",
        focus: "Upper body + mobility",
        duration: "30-40 minutes",
        tasks: ["Overhead press", "Lat pulldowns", "Band pull-aparts", "Hip mobility"],
      },
    ],
  },
  {
    id: "fatloss",
    title: "Fat Loss",
    summary: "Blend short strength workouts with steady cardio and movement goals.",
    sessions: [
      {
        day: "Day 1",
        focus: "Circuit strength",
        duration: "30 minutes",
        tasks: ["Bodyweight squats", "Push-ups", "Step-ups", "Mountain climbers"],
      },
      {
        day: "Day 2",
        focus: "Low-impact cardio",
        duration: "30-45 minutes",
        tasks: ["Brisk walking", "Cycling", "Elliptical", "Cool-down stretch"],
      },
      {
        day: "Day 3",
        focus: "Intervals + core",
        duration: "25-35 minutes",
        tasks: ["Rowing intervals", "Glute bridges", "Dead bugs", "Breathing reset"],
      },
    ],
  },
  {
    id: "health",
    title: "General Health",
    summary: "Balanced mix of strength, mobility, and light cardio for overall wellness.",
    sessions: [
      {
        day: "Day 1",
        focus: "Full-body movement",
        duration: "25-35 minutes",
        tasks: ["Chair squats", "Wall push-ups", "Seated rows", "Stretching"],
      },
      {
        day: "Day 2",
        focus: "Mobility + balance",
        duration: "20-30 minutes",
        tasks: ["Hip circles", "Single-leg balance", "Band rows", "Breathing drills"],
      },
      {
        day: "Day 3",
        focus: "Cardio base",
        duration: "25-35 minutes",
        tasks: ["Easy walk", "Light cycling", "Gentle yoga", "Recovery walk"],
      },
    ],
  },
];

const goalButtons = document.querySelectorAll(".chip");
const planTitle = document.querySelector("#planTitle");
const planSummary = document.querySelector("#planSummary");
const planCards = document.querySelector("#planCards");
const savedGoal = document.querySelector("#savedGoal");

const formatTasks = (tasks) => {
  return tasks.map((task) => `<li>${task}</li>`).join("");
};

const buildCard = (session) => {
  return `
    <article class="plan-card">
      <h3>${session.day}</h3>
      <p><strong>Focus:</strong> ${session.focus}</p>
      <p><strong>Duration:</strong> ${session.duration}</p>
      <ul>${formatTasks(session.tasks)}</ul>
    </article>
  `;
};

const updateSavedGoal = (goalTitle) => {
  if (savedGoal) savedGoal.textContent = `${goalTitle}`;
};

const updatePlan = (goalId) => {
  const goalData = goals.find((goal) => goal.id === goalId);
  if (!goalData || !planCards || !planTitle || !planSummary) return;

  planTitle.textContent = `${goalData.title} Plan`;
  planSummary.textContent = `${goalData.summary}`;
  planCards.innerHTML = goalData.sessions.map((session) => buildCard(session)).join("");

  const message = goalId === "fatloss"
    ? "Prioritize daily steps and hydration for extra support."
    : "Keep workouts light enough to finish with good form.";

  const extraNote = document.createElement("p");
  extraNote.className = "tip-note";
  extraNote.textContent = `${message}`;
  planSummary.insertAdjacentElement("afterend", extraNote);
};

const setActiveButton = (goalId) => {
  goalButtons.forEach((button) => {
    const isActive = button.dataset.goal === goalId;
    button.classList.toggle("active", isActive);
  });
};

const handleGoalSelection = (goalId) => {
  const goalData = goals.find((goal) => goal.id === goalId);
  if (!goalData) return;

  localStorage.setItem("fitstart_goal", `${goalId}`);
  updateSavedGoal(goalData.title);
  setActiveButton(goalId);
  const existingNote = document.querySelector(".planner-output .tip-note");
  if (existingNote) existingNote.remove();
  updatePlan(goalId);
};

const loadSavedGoal = () => {
  const storedGoal = localStorage.getItem("fitstart_goal");
  if (storedGoal) {
    handleGoalSelection(storedGoal);
  }
};

goalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleGoalSelection(button.dataset.goal);
  });
});

loadSavedGoal();
