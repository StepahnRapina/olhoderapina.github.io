async function carregarGrid() {
  try {
    const resposta = await fetch("./content/grid-data.json");
    const data = await resposta.json();

    const container = document.getElementById("grid-container");

    container.innerHTML = data.grid
      .map(
        (d) => `
      <div>
        <div class="relative w-full" style="aspect-ratio: 16/9">
          ${
            d.tipo === "imagem"
              ? `<a href="${d.link}#leitura"><img src="${d.imagem}" alt="${d.titulo}"></a>`
              : `<iframe class="absolute inset-0 w-full h-full rounded" src="${d.video}" title="${d.titulo}"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen loading="lazy"></iframe>`
          }
        </div>
        ${
          d.link
            ? `<a href="${d.link}#leitura"><h3 class="font-bold">${d.titulo}</h3><p class="text-base text-gray-600">${d.descricao}</p></a>`
            : `<h3 class="font-bold">${d.titulo}</h3><p class="text-base text-gray-600">${d.descricao}</p>`
        }
      </div>
    `
      )
      .join("");
  } catch (erro) {
    console.error("Erro ao carregar grid:", erro);
  }
}

document.addEventListener("DOMContentLoaded", carregarGrid);
