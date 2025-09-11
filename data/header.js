async function carregarHeader() {
  try {
    const resposta = await fetch("./content/header-data.json");
    const data = await resposta.json();

    const container = document.getElementById("site-header");

    container.innerHTML = `
      <header class="py-8" style="background: radial-gradient(circle, #1e3a8a 0%, #2563eb 50%, #93c5fd 100%);">
        <div class="container mx-auto flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          
          <!-- Logo -->
          <div class="md:w-1/4 text-center">
            <a href="${data.logo.href}">
              <img src="${data.logo.src}" alt="Logo"
                class="mx-auto h-28 w-auto transition-all duration-300 transform hover:scale-105"/>
            </a>
            <a href="${data.logo.href}">
              <h1 class="text-3xl text-yellow-400 text-center text-bold mt-6 hover:text-yellow-200 transition-colors duration-300">
                <strong>${data.logo.title}</strong>
              </h1>
            </a>
          </div>

          <!-- Destaques -->
          ${data.destaques
            .map(
              (d) => `
            <div class="md:w-1/4 text-center">
              <h2 class="text-2xl text-yellow-400"><strong>${d.titulo}</strong></h2>
              <a href="${d.link}#leitura">
                <img src="${d.imagem}" alt="${d.titulo}" class="mt-2 rounded mx-auto"/>
              </a>
              <p class="text-yellow-400 text-sm">${d.descricao}</p>
            </div>
          `
            )
            .join("")}

          <!-- Fase da Lua -->
            <div class="md:w-1/4 text-center">
              <a href="./faselua2025.html#leitura"><h2 class="text-2xl text-yellow-400"><strong>Fase da Lua Hoje</strong></h2>
              <div id="moon-phase"></div>
              <p class="text-yellow-400 text-sm"><strong>leia mais...</strong></p>
          </div>

        </div>
      </header>
    `;
  } catch (erro) {
    console.error("Erro ao carregar o header:", erro);
  }
}

document.addEventListener("DOMContentLoaded", carregarHeader);
