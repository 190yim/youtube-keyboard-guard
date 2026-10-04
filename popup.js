const toggle = document.getElementById("toggle");
const status = document.getElementById("status");

function updateStatus() {
  if (toggle.checked) {
    status.textContent = "Activée";
  } else {
    status.textContent = "Désactivée";
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
