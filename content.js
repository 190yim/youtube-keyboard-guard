const blockedKeys = new Set([
  " ",
  "k", "K",
  "j", "J",
  "l", "L",
  "m", "M",
  "f", "F",
  "c", "C",
  "i", "I",
  "t", "T",

  "&",
  "é",
  "\"",
  "'",
  "(",
  "-",
  "è",
  "_",
  "ç",
  "à",
  ")",
  "=",

  "0", "1", "2", "3", "4",
  "5", "6", "7", "8", "9",

  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Home",
  "End"
]);

const blockedCodes = new Set([
  "Digit0",
  "Digit1",
  "Digit2",
  "Digit3",
  "Digit4",
  "Digit5",
  "Digit6",
  "Digit7",
  "Digit8",
  "Digit9"
]);

let enabled = true;


// Récupérer l'état sauvegardé
chrome.storage.sync.get({ enabled: true }, (result) => {
  enabled = result.enabled;
});


// Recevoir les changements ON / OFF
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "toggleProtection") {
    enabled = message.enabled;
  }
});


// Continuer à écouter les changements de stockage
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.enabled) {
    enabled = changes.enabled.newValue;
  }
});


// Vérifier si l'utilisateur écrit dans un champ
function isTypingElement(element) {
  if (!element) return false;

  return (
    element.tagName === "INPUT" ||
    element.tagName === "TEXTAREA" ||
    element.tagName === "SELECT" ||
    element.isContentEditable
  );
}


// Bloquer les raccourcis YouTube
document.addEventListener("keydown", (event) => {

  // Protection désactivée
  if (!enabled) return;

  // Ne pas bloquer quand on écrit
  if (isTypingElement(event.target)) return;

  // Ne pas bloquer les raccourcis système
  if (event.ctrlKey || event.altKey || event.metaKey) return;

  const shouldBlock =
    blockedKeys.has(event.key) ||
    blockedCodes.has(event.code);

  if (shouldBlock) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }

}, true);
