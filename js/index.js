
// Botões - e +
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
        linha.querySelector(".quantity span").innerText = "0";
        atualizarTotais();
    });
});

// Atualizando o Resumo da compra
function atualizarTotais() {
    let totalGeral = 0;
    const linhas = document.querySelectorAll("tbody tr");

    linhas.forEach(linha => {
        const precoTexto = linha.querySelector(".preco").innerText;
        const quantidade = parseInt(linha.querySelector(".quantity span").innerText);
        const preco = parseFloat(precoTexto.replace("R$ ", "").replace(".", "").replace(",", "."));
        const total = preco * quantidade;
        linha.querySelector(".total").innerText = `R$ ${total.toFixed(2).replace(".", ",")}`;
        totalGeral += total;
    });

    document.querySelector(".sub-order").innerText = `R$ ${totalGeral.toFixed(2).replace(".", ",")}`;
    document.querySelector(".total-order").innerText = `R$ ${totalGeral.toFixed(2).replace(".", ",")}`;
}

// Cupom de Desconto
const botaoCupom = document.querySelector(".discount");

botaoCupom.addEventListener("click", () => {
    if (!document.querySelector("#campo-cupom")) {
        const input = document.createElement("input");
        input.id = "campo-cupom";
        input.placeholder = "Digite seu cupom";
        input.style.marginTop = "10px";
        input.style.marginLeft = "15px";
        input.style.width = "50%";
        input.style.padding = "12px";
        input.style.borderRadius = "6px";
        input.style.border = "none"
        botaoCupom.parentElement.appendChild(input);
    }
});

// Finalizar o número do pedido
let numeroAtual = localStorage.getItem("page-title") || 12345;

document.getElementById("order-number").innerText = numeroAtual;

document.getElementById("order-finalize").addEventListener("click", () => {
    numeroAtual++;
    document.getElementById("order-number").innerText = numeroAtual;
    localStorage.setItem("page-title", numeroAtual);
});
