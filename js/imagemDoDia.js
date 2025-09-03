// =========================
// CONFIGURAÇÕES INICIAIS
// =========================
const totalImagens = 100; // Total de imagens
const diasPorImagem = 1; // Dias entre mudanças
const dataBase = new Date("2025-08-18"); // Data base inicial

let indiceAtual = calcularIndiceAtual(); // Índice atual da imagem

// =========================
// FUNÇÃO: Calcular índice com base na data local
// =========================
function calcularIndiceAtual() {
  const hoje = new Date();
  const hojeLocal = new Date(
    hoje.getFullYear(),
    hoje.getMonth(),
    hoje.getDate()
  );
  const baseLocal = new Date(
    dataBase.getFullYear(),
    dataBase.getMonth(),
    dataBase.getDate()
  );

  const diferencaDias = Math.floor(
    (hojeLocal - baseLocal) / (1000 * 60 * 60 * 24)
  );

  return (Math.floor(diferencaDias / diasPorImagem) % totalImagens) + 1;
}

// =========================
// FUNÇÃO: Exibir imagem
// =========================
function exibirImagem(indice) {
  const caminhoImagem = `./image/imgs_dia/foto${String(indice).padStart(
    3,
    "0"
  )}.jpg`;
  document.getElementById("imagem").src = caminhoImagem;
}

// Exibe a imagem inicial
exibirImagem(indiceAtual);

// =========================
// FUNÇÃO: Mudar imagem manualmente
// =========================
function mudarImagem(delta) {
  indiceAtual += delta;
  if (indiceAtual < 1) {
    indiceAtual = totalImagens; // Volta para a última imagem
  } else if (indiceAtual > totalImagens) {
    indiceAtual = 1; // Volta para a primeira imagem
  }
  exibirImagem(indiceAtual);
}

// =========================
// EVENTOS: Botões anterior e próxima
// =========================
document
  .getElementById("anterior")
  .addEventListener("click", () => mudarImagem(-1));
document
  .getElementById("proxima")
  .addEventListener("click", () => mudarImagem(1));

// =========================
// MODAL DE IMAGEM AMPLIADA
// =========================
const modal = document.getElementById("modalImagem");
const imgAmpliada = document.getElementById("imagemAmpliada");
const imgThumb = document.getElementById("imagem");

const btnAnterior = document.getElementById("modalAnterior");
const btnProxima = document.getElementById("modalProxima");

// =========================
// FUNÇÃO: Abrir modal
// =========================
function abrirModal(indice) {
  exibirImagem(indice); // garante que a miniatura também troca
  imgAmpliada.src = document.getElementById("imagem").src;

  modal.classList.remove("hidden");

  setTimeout(() => {
    modal.classList.remove("opacity-0");
    imgAmpliada.classList.remove("opacity-0", "scale-95", "blur-sm");
  }, 10);
}

// =========================
// FUNÇÃO: Fechar modal
// =========================
function fecharModal() {
  modal.classList.add("opacity-0");
  imgAmpliada.classList.add("opacity-0", "scale-95", "blur-sm");

  setTimeout(() => {
    modal.classList.add("hidden");
  }, 500);
}

// =========================
// EVENTOS
// =========================

// Abrir modal ao clicar na imagem do dia
imgThumb.addEventListener("click", () => abrirModal(indiceAtual));

// Fechar ao clicar na imagem
imgAmpliada.addEventListener("click", fecharModal);

// Fechar ao clicar no fundo preto
modal.addEventListener("click", (event) => {
  if (event.target.id === "modalImagem") {
    fecharModal();
  }
});

// Fechar com tecla ESC
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    fecharModal();
  }
});

// Navegar dentro do modal
btnAnterior.addEventListener("click", (e) => {
  e.stopPropagation(); // impede fechar o modal ao clicar no botão
  mudarImagem(-1);
  imgAmpliada.src = document.getElementById("imagem").src;
});

btnProxima.addEventListener("click", (e) => {
  e.stopPropagation();
  mudarImagem(1);
  imgAmpliada.src = document.getElementById("imagem").src;
});
