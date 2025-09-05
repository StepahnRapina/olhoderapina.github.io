async function carregarFase() {
  try {
    const resposta = await fetch("./data/phases.xml");
    const texto = await resposta.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(texto, "application/xml");

    const fases = xml.getElementsByTagName("phase");
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    let lista = [];
    for (let fase of fases) {
      let nome = fase.getAttribute("name");
      for (let data of fase.getElementsByTagName("date")) {
        lista.push({ nome: nome, data: parseDataLocal(data.textContent) });
      }
    }
    lista.sort((a, b) => a.data - b.data);

    let faseAtual = lista[0].nome,
      inicio = lista[0].data,
      fim = null;
    for (let i = 0; i < lista.length - 1; i++) {
      if (hoje >= lista[i].data && hoje < lista[i + 1].data) {
        faseAtual = lista[i].nome;
        inicio = lista[i].data;
        fim = new Date(lista[i + 1].data);
        fim.setDate(fim.getDate() - 1);
        break;
      }
    }

    const imagens = {
      "LUA NOVA": "./img/luafases/luaNova.png",
      "LUA CRESCENTE": "./img/luafases/luaCrescente.png",
      "LUA CHEIA": "./img/luafases/luaCheia.png",
      "LUA MINGUANTE": "./img/luafases/luaMinguante.png",
    };

    const div = document.getElementById("moon-phase");
    div.innerHTML = `
      <img src="${
        imagens[faseAtual]
      }" alt="${faseAtual}" class="mx-auto block w-32 h-auto">
      <p class="text-yellow-400 text-sm">De ${formatarData(inicio)} até ${
      fim ? formatarData(fim) : "..."
    }</p>
    `;
  } catch (e) {
    console.error("Erro ao carregar fases da lua", e);
  }
}

function parseDataLocal(str) {
  const [ano, mes, dia] = str.split("-").map(Number);
  return new Date(ano, mes - 1, dia);
}

function formatarData(d) {
  if (!d) return "";
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

document.addEventListener("DOMContentLoaded", carregarFase);
