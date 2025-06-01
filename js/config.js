function goHome() {
  showClickEmoji("🏠", event);
  setTimeout(() => {
    window.location.href = "inicio.html";
  }, 300);
}

function showClickEmoji(emoji, event) {
  const clickEmoji = document.createElement("div");
  clickEmoji.className = "click-emoji";
  clickEmoji.textContent = emoji;

  clickEmoji.style.left = event.clientX - 15 + "px";
  clickEmoji.style.top = event.clientY - 15 + "px";

  document.body.appendChild(clickEmoji);
  setTimeout(() => clickEmoji.remove(), 2000);
}

function updateLastUpdate() {
  const now = new Date();
  const formatted = now.toLocaleString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  const el = document.getElementById("lastUpdate");
  if (el) el.textContent = formatted;
}

document.addEventListener("DOMContentLoaded", () => {
  updateLastUpdate();
});
