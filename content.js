const blockedKeys = new Set([
  " ", "k", "K", "j", "J", "l", "L", "m", "M",
  "f", "F", "c", "C", "i", "I", "t", "T",
  "&", "é", "\"", "'", "(", "-", "è", "_", "ç", "à", ")", "=",
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
  "Home", "End"
]);

const blockedCodes = new Set([
  "Digit0", "Digit1", "Digit2", "Digit3", "Digit4",
  "Digit5", "Digit6", "Digit7", "Digit8", "Digit9"
]);

let enabled = true;

// Récupère l'état actuel
chrome.storage.sync.get({ enabled: true }, (result) => {
  enabled = result.enabled;
});

// Écoute les changements ON/OFF
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.enabled) {
    enabled = changes.enabled.newValue;
  }
});

function isTypingElement(element) {
  if (!element) return false;

  return (
    element.tagName === "INPUT" ||
    element.tagName === "TEXTAREA" ||
    element.tagName === "SELECT" ||
    element.isContentEditable
  );
}

document.addEventListener("keydown", (event) => {
  if (!enabled) return;

  if (isTypingElement(event.target)) return;

  if (event.ctrlKey || event.altKey || event.metaKey) return;

  if (
    blockedKeys.has(event.key) ||
    blockedCodes.has(event.code)
  ) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }
}, true);
