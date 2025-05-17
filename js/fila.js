document.addEventListener("DOMContentLoaded", () => {
  const botaoCupom = document.querySelector(".info button");

  botaoCupom.addEventListener("click", () => {
    if (!document.querySelector("#campo-cupom")) {
      const input = document.createElement("input");
      input.id = "campo-cupom";
      input.placeholder = "Digite seu cupom";
      input.style.display = "block";
      input.style.marginTop = "10px";
      input.style.width = "100%";
      botaoCupom.parentElement.appendChild(input);
    }
  });

  function atualizarTotais() {
    let totalGeral = 0;
    const linhas = document.querySelectorAll("tbody tr");

    linhas.forEach(linha => {
      const precoTexto = linha.querySelector("td:nth-child(2)").innerText;
      const preco = parseFloat(precoTexto.replace("R$ ", "").replace(".", "").replace(",", "."));
      const quantidade = parseInt(linha.querySelector(".quantity span").innerText);
      const total = preco * quantidade;
      linha.querySelector("td:nth-child(4)").innerText = `R$ ${total.toFixed(2).replace(".", ",")}`;
      totalGeral += total;
    });

    document.querySelector("aside footer span:last-child").innerText = `R$ ${totalGeral.toFixed(2).replace(".", ",")}`;
    document.querySelector(".info div:first-child span:last-child").innerText = `R$ ${totalGeral.toFixed(2).replace(".", ",")}`;
  }

  // Botões + e -
  document.querySelectorAll(".quantity").forEach(qtd => {
    const menos = qtd.querySelector(".bx-minus").parentElement;
    const mais = qtd.querySelector(".bx-plus").parentElement;
    const valor = qtd.querySelector("span");

    menos.addEventListener("click", () => {
      let num = parseInt(valor.innerText);
      if (num > 1) {
        valor.innerText = num - 1;
        atualizarTotais();
      }
    });

    mais.addEventListener("click", () => {
      let num = parseInt(valor.innerText);
      valor.innerText = num + 1;
      atualizarTotais();
    });
  });

  // Botão remover redefine quantidade para 1
  document.querySelectorAll(".remove").forEach(botao => {
    botao.addEventListener("click", () => {
      const linha = botao.closest("tr");
      linha.querySelector(".quantity span").innerText = "1";
      atualizarTotais();
    });
  });

  atualizarTotais();
});
