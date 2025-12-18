const receitas = [
  {
    nome: "Poção Calmante",
    ordem: ["🌿", "💧", "🕯️"]
  },
  {
    nome: "Poção do Sono",
    ordem: ["🍄", "🌿", "💧"]
  },
  {
    nome: "Poção Explosiva",
    ordem: ["🔥", "🍄", "🕯️"]
  }
];

const ingredientes = ["🌿", "💧", "🍄", "🔥", "🕯️"];

let receitaAtual;
let escolha = [];
let jogoAtivo = false;
let timerId = null;
let tempo = 30;

// BOTÃO JOGAR / PARAR
function toggleJogo() {
  const area = document.getElementById("area-jogo");

  if (jogoAtivo) {
    pararJogo();
    area.style.display = "none";
    return;
  }

  area.style.display = "block";
  iniciar();
}

// INICIAR JOGO
function iniciar() {
  const area = document.getElementById("area-jogo");

  area.innerHTML = `
    <p>⏱️ Tempo: <span id="tempo">30</span>s</p>
    <p id="receita"></p>
    <div id="ingredientes"></div>
    <p id="resultado"></p>
  `;

  escolha = [];
  tempo = 30;
  jogoAtivo = true;

  receitaAtual = receitas[Math.floor(Math.random() * receitas.length)];
  document.getElementById("receita").textContent = `Prepare: ${receitaAtual.nome}`;

  const ingDiv = document.getElementById("ingredientes");
  const resultadoEl = document.getElementById("resultado");

  ingDiv.innerHTML = "";
  resultadoEl.textContent = "";

  ingredientes.forEach(simbolo => {
    const div = document.createElement("div");
    div.className = "ing";
    div.textContent = simbolo;
    div.onclick = () => escolher(simbolo);
    ingDiv.appendChild(div);
  });

  iniciarTimer();
}

// TIMER
function iniciarTimer() {
  const tempoEl = document.getElementById("tempo");

  timerId = setInterval(() => {
    tempo--;
    tempoEl.textContent = tempo;

    if (tempo <= 0) {
      alert("⏱️ Tempo esgotado! Snape está furioso.");
      pararJogo();
      document.getElementById("area-jogo").style.display = "none";
    }
  }, 1000);
}

// ESCOLHER INGREDIENTE
function escolher(simbolo) {
  if (!jogoAtivo) return;

  escolha.push(simbolo);

  if (escolha.length === receitaAtual.ordem.length) {
    verificar();
  }
}

// VERIFICAR POÇÃO
function verificar() {
  const resultadoEl = document.getElementById("resultado");

  if (JSON.stringify(escolha) === JSON.stringify(receitaAtual.ordem)) {
    resultadoEl.textContent = "✔️ Poção perfeita. Snape aprova.";
  } else {
    resultadoEl.textContent = "❌ Poção errada. Snape está desapontado.";
  }

  setTimeout(iniciar, 2000);
}

// PARAR JOGO
function pararJogo() {
  jogoAtivo = false;

  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}
