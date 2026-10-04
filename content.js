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
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Home",
  "End"
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

  // Ne rien bloquer lorsque l'utilisateur écrit
  if (isTypingElement(event.target)) {
    return;
  }

  // Ne pas interférer avec les raccourcis du navigateur
  if (event.ctrlKey || event.altKey || event.metaKey) {
    return;
  }

  if (blockedKeys.has(event.key)) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }

}, true);
