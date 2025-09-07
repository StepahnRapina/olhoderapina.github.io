async function carregarMaisLidas() {
  const container = document.getElementById("mais-lidas-container");

  try {
    const resposta = await fetch("content/mais-lidas.json");
    const dados = await resposta.json();

    if (!dados.maisLidas || dados.maisLidas.length === 0) {
      container.innerHTML = "<p>Nenhuma matéria popular encontrada.</p>";
      return;
    }

    let html = `
      <h3 class="font-bold mb-3 border-b pb-2">Mais Lidas</h3>
      <ul class="space-y-3 text-sm">
    `;

    dados.maisLidas.forEach((item) => {
      if (item.thumb) {
        // Com miniatura
        html += `
          <li>
            <a href="${item.link}#leitura" class="flex items-center space-x-3 group">
              <img src="${item.thumb}" alt="${item.titulo}" class="w-16 h-12 object-cover rounded shadow" />
              <span class="text-base group-hover:text-yellow-500">${item.titulo}</span>
            </a>
          </li>
        `;
      } else {
        // Só texto
        html += `
          <li>
            <a href="${item.link}#leitura" class="text-base hover:text-yellow-500">${item.titulo}</a>
          </li>
        `;
      }
    });

    html += "</ul>";

    container.innerHTML = html;
  } catch (erro) {
    console.error("Erro ao carregar as mais lidas:", erro);
    container.innerHTML = "<p>Erro ao carregar as matérias populares.</p>";
  }
}

carregarMaisLidas();
