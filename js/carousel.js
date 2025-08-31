document.addEventListener("DOMContentLoaded", () => {
  const carouselImage = document.getElementById("carousel-image");
  const carouselTitle = document.getElementById("carousel-title");
  const carouselDescription = document.getElementById("carousel-description");

  if (carouselImage && carouselTitle && carouselDescription) {
    const carouselItems = [
      {
        src: "./image/carrossel/001.jpg",
        title: "Título 1",
        description: "Resumo breve da notícia 1.",
      },
      {
        src: "./image/carrossel/002.jpg",
        title: "Título 2",
        description: "Resumo breve da notícia 2.",
      },
      {
        src: "./image/carrossel/003.jpg",
        title: "Título 3",
        description: "Resumo breve da notícia 3.",
      },
      {
        src: "./image/carrossel/004.jpg",
        title: "Título 4",
        description: "Resumo breve da notícia 4.",
      },
      {
        src: "./image/carrossel/005.jpg",
        title: "Título 5",
        description: "Resumo breve da notícia 5.",
      },
    ];
    let currentIndex = 0;

    function updateCarouselContent() {
      const currentItem = carouselItems[currentIndex];
      carouselImage.src = currentItem.src;
      carouselImage.alt = `Imagem do Carrossel ${currentIndex + 1}`;
      carouselTitle.textContent = currentItem.title;
      carouselDescription.textContent = currentItem.description;
    }

    function changeImage() {
      currentIndex = (currentIndex + 1) % carouselItems.length;
      updateCarouselContent();
    }

    // Define o conteúdo inicial
    updateCarouselContent();

    // Muda a imagem e o conteúdo a cada 3 segundos (3000 milissegundos)
    setInterval(changeImage, 5000);
  } else {
    console.warn(
      "Um ou mais elementos do carrossel (imagem, título, descrição) não foram encontrados para inicializar."
    );
  }
});
