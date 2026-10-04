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

  // Chiffres
  "0", "1", "2", "3", "4",
  "5", "6", "7", "8", "9",

  // Symboles AZERTY
  "&", "é", "\"", "'", "(",
  "-", "è", "_", "ç", "à",
  ")", "=", 

  // Navigation
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

function isTypingElement(element) {
  if (!element) return false;

  const tag = element.tagName;

  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    element.isContentEditable
  );
}

document.addEventListener("keydown", (event) => {

  if (isTypingElement(event.target)) {
    return;
  }

  if (event.ctrlKey || event.altKey || event.metaKey) {
    return;
  }

  if (
    blockedKeys.has(event.key) ||
    blockedCodes.has(event.code)
  ) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }

}, true);
