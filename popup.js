const toggle = document.getElementById("toggle");
const status = document.getElementById("status");
const statusDot = document.getElementById("statusDot");

function updateStatus() {
  if (toggle.checked) {
    status.textContent = "Activée";
    statusDot.classList.add("active");
  } else {
    status.textContent = "Désactivée";
    statusDot.classList.remove("active");
  }
}

chrome.storage.sync.get(
  { enabled: true },
  (result) => {
    toggle.checked = result.enabled;
    updateStatus();
  }
);

toggle.addEventListener("change", () => {
  chrome.storage.sync.set({
    enabled: toggle.checked
  });

  updateStatus();
});
