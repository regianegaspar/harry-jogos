const ordemCorreta = ["🔮", "📜", "🕯️", "🗝️"];

let ordemAtual = [];
let jogoAtivo = false;

function toggleJogo() {
  const area = document.getElementById("area-jogo");

  if (jogoAtivo) {
    area.innerHTML = "";
    jogoAtivo = false;
    return;
  }

  jogoAtivo = true;

  area.innerHTML = `
    <div class="jogo-pensadeira">
      <p>Reorganize as memórias na ordem correta</p>
      <div id="puzzle"></div>
      <p id="mensagem"></p>
    </div>
  `;

  criarPecas();
}

function criarPecas() {
  ordemAtual = [];

  const puzzle = document.getElementById("puzzle");
  const mensagem = document.getElementById("mensagem");

  mensagem.textContent = "";
  puzzle.innerHTML = "";

  const pecas = [...ordemCorreta].sort(() => Math.random() - 0.5);

  pecas.forEach(simbolo => {
    const div = document.createElement("div");
    div.className = "peca";
    div.textContent = simbolo;

    div.onclick = () => selecionar(simbolo, div);
    puzzle.appendChild(div);
  });
}

function selecionar(simbolo, div) {
  ordemAtual.push(simbolo);
  div.style.visibility = "hidden";

  if (ordemAtual.length === ordemCorreta.length) {
    verificar();
  }
}

function verificar() {
  const mensagem = document.getElementById("mensagem");

  if (JSON.stringify(ordemAtual) === JSON.stringify(ordemCorreta)) {
    mensagem.textContent = "✨ Memória correta! Dumbledore aprova.";
  } else {
    mensagem.textContent = "❌ Ordem incorreta. Reflita e tente novamente.";
    setTimeout(criarPecas, 1500);
  }
}
