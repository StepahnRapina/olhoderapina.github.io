document.addEventListener("DOMContentLoaded", () => {
  // Função para buscar os dados do JSON
  async function carregarDestaque() {
    try {
      const resposta = await fetch("./content/destaque.json");
      if (!resposta.ok) {
        throw new Error(`Erro ao carregar o JSON: ${resposta.statusText}`);
      }
      const dadosDestaque = await resposta.json();

      // Chama a função para renderizar o HTML
      renderizarDestaque(dadosDestaque);
    } catch (erro) {
      console.error("Falha ao carregar o destaque:", erro);
    }
  }

  // Função para preencher o HTML com os dados do JSON
  function renderizarDestaque(dados) {
    const divDestaque = document.querySelector("[data-destaque]");
    if (!divDestaque) {
      console.error("Div de destaque não encontrada.");
      return;
    }

    const htmlDinamico = `
            <a href="${dados.link}#leitura" class="hover:text-yellow-500 text-2xl font-bold mb-2">
                ${dados.titulo}
            </a>
            <br>
            <a href="${dados.link}#leitura">
                <img
                    src="${dados.imagemSrc}"
                    alt="${dados.imagemAlt}"
                    class="rounded-lg mb-3 w-full object-cover"
                />
            </a>
            <p class="text-gray-700 text-base">
                ${dados.paragrafo}
                <a href="${dados.link}#leitura" class="text-black hover:underline-text-yellow-500">
                    <strong>Leia mais...</strong>
                </a>
            </p>
        `;

    divDestaque.innerHTML = htmlDinamico;
  }

  // Executa a função
  carregarDestaque();
});
