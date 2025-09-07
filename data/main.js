async function carregarMain() {
  const container = document.getElementById("main-container");

  try {
    const resposta = await fetch("content/main-data.json");
    const dados = await resposta.json();

    if (!dados.principais || dados.principais.length === 0) {
      container.innerHTML = "<p>Nenhuma matéria disponível.</p>";
      return;
    }

    // A primeira matéria (destaque principal)
    const principal = dados.principais[0];
    let html = `
      <div class="mb-10">
        <a href="${principal.link}#leitura" class="hover:text-yellow-500 text-3xl font-bold mb-2 block">
          ${principal.titulo}
        </a>
        <a href="${principal.link}#leitura">
          <img
            src="${principal.imagem}"
            alt="${principal.titulo}"
            class="rounded-lg mb-3 w-full object-cover"
          />
        </a>
        <p class="text-gray-700 text-lg mb-3">
          ${principal.descricao}
        </p>
        <a href="${principal.link}#leitura" class="text-black hover:underline hover:text-yellow-500">
          <strong>${principal.linkTexto}</strong>
        </a>
      </div>
    `;

    // As demais matérias (cards em grid)
    if (dados.principais.length > 1) {
      html += `
        <div class="grid md:grid-cols-2 gap-6 border-t pt-6">
      `;
      dados.principais.slice(1).forEach((noticia) => {
        html += `
          <div class="bg-gray-50 rounded-lg shadow p-4 hover:shadow-lg transition">
            <a href="${noticia.link}#leitura">
              <img src="${noticia.imagem}" alt="${noticia.titulo}"
                class="w-full h-40 object-cover rounded-lg mb-3 hover:opacity-90 transition">
            </a>
            <a href="${noticia.link}#leitura" class="font-semibold text-lg hover:text-yellow-500 block mb-2">
              ${noticia.titulo}
            </a>
            <p class="text-gray-600 text-sm mb-2">
              ${noticia.descricao}
            </p>
            <a href="${noticia.link}#leitura" class="text-yellow-600 hover:underline">
              ${noticia.linkTexto}
            </a>
          </div>
        `;
      });
      html += `</div>`;
    }

    container.innerHTML = html;
  } catch (erro) {
    console.error("Erro ao carregar as matérias principais:", erro);
    container.innerHTML =
      "<p>Não foi possível carregar as matérias principais.</p>";
  }
}

carregarMain();
