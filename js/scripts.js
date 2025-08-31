// 🌙 Dark Mode
document.getElementById("darkModeBtn").addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});

// 🔍 Busca
document.getElementById("searchBtn").addEventListener("click", () => {
  alert("Abrir campo de busca futuramente...");
});

// 🌙 Fase da Lua (exemplo simples)
function faseDaLua() {
  const fases = ["🌑 Nova", "🌓 Crescente", "🌕 Cheia", "🌗 Minguante"];
  const dia = new Date().getDate();
  return fases[dia % 4];
}
document.getElementById("faseLua").innerText = faseDaLua();
