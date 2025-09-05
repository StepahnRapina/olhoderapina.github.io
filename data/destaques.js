async function carregarDestaques() {
  try {
    const resposta = await fetch("./content/destaques-data.json");
    const data = await resposta.json();

    const container = document.getElementById("destaques-container");

    container.innerHTML = data.destaques
      .map(
        (d) => `
      <div class="bg-blue-700 text-white rounded-t-2xl shadow-lg overflow-hidden flex flex-col">
        
        <div class="relative w-full" style="aspect-ratio: 16/9">
          ${
            d.tipo === "imagem"
              ? `<img src="${d.imagem}" alt="${d.titulo}">`
              : `<iframe class="absolute inset-0 w-full h-full rounded" src="${d.video}" title="${d.titulo}"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen loading="lazy"></iframe>`
          }
        </div>

        <h2 class="font-sans font-bold text-xl text-yellow-200 p-4 flex flex-col gap-3 text-center">${
          d.titulo
        }</h2>
        
        <p class="bg-blue-500 text-base text-justify text-white p-4 flex flex-col gap-3 hyphens-auto">${
          d.descricao
        }</p>

        <a href="${
          d.link
        }" target="" class="mt-auto inline-block bg-yellow-400 text-black text-center font-semibold py-2 px-4 hover:bg-yellow-300 hover:text-blue-700 transition transition-all duration-300 transform hover:scale-105">${
          d.linkTexto
        }</a>
      </div>
    `
      )
      .join("");
  } catch (erro) {
    console.error("Erro ao carregar destaques:", erro);
  }
}

document.addEventListener("DOMContentLoaded", carregarDestaques);
