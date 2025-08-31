const totalImagens = 100; // Total de imagens
const diasPorImagem = 1; // Dias entre mudanças
const dataBase = new Date("2025-08-18"); // Data base inicial

let indiceAtual = calcularIndiceAtual(); // Índice atual da imagem

// Função para calcular o índice com base na data
function calcularIndiceAtual() {
  const hoje = new Date();
  const diferencaDias = Math.floor((hoje - dataBase) / (1000 * 60 * 60 * 24));
  return (Math.floor(diferencaDias / diasPorImagem) % totalImagens) + 1;
}

// Função para exibir a imagem
function exibirImagem(indice) {
  const caminhoImagem = `./image/imgs_dia/foto${String(indice).padStart(
    3,
    "0"
  )}.jpg`;
  document.getElementById("imagem").src = caminhoImagem;
}

// Exibe a imagem inicial
exibirImagem(indiceAtual);

// Função para mudar a imagem
function mudarImagem(delta) {
  indiceAtual += delta;
  if (indiceAtual < 1) {
    indiceAtual = totalImagens; // Volta para a última imagem
  } else if (indiceAtual > totalImagens) {
    indiceAtual = 1; // Volta para a primeira imagem
  }
  exibirImagem(indiceAtual);
}

// Event Listeners para os ícones
document
  .getElementById("anterior")
  .addEventListener("click", () => mudarImagem(-1));
document
  .getElementById("proxima")
  .addEventListener("click", () => mudarImagem(1));

// Exibe o modal na página mãe
document.getElementById("imagem").addEventListener("click", () => {
  const caminhoImagem = document.getElementById("imagem").src;

  // Envia o comando para a página mãe criar o modal
  window.parent.postMessage(
    {
      type: "showModal",
      imageUrl: caminhoImagem,
    },
    "*"
  );
});
