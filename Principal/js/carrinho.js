document.addEventListener("DOMContentLoaded", () => {
  const botoesComprar = document.querySelectorAll(".btn-comprar");
  const contadorCarrinho = document.getElementById("contador-carrinho");

  // Atualiza o contador quando a página carrega
  atualizarContador();

  botoesComprar.forEach((botao) => {
    botao.addEventListener("click", (e) => {
      e.preventDefault();

      const nome = botao.dataset.nome;
      const preco = parseFloat(botao.dataset.preco);
      const img = botao.dataset.img;

      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

      const itemExistente = carrinho.find((item) => item.nome === nome);
      if (itemExistente) {
        itemExistente.quantidade += 1;
      } else {
        carrinho.push({
          nome,
          preco,
          img,
          quantidade: 1,
        });
      }

      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      atualizarContador();
    });
  });

  function atualizarContador() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    if (contadorCarrinho) {
      contadorCarrinho.textContent = totalItens;
    }
  }
});
