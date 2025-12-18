// ===== BANCO DE PERGUNTAS =====
const bancoPerguntas = [
  {
    pergunta: "Qual feitiço abre portas?",
    opcoes: ["Expelliarmus", "Alohomora", "Lumos"],
    correta: 1
  },
  {
    pergunta: "Qual é a casa da Hermione?",
    opcoes: ["Corvinal", "Grifinória", "Lufa-Lufa"],
    correta: 1
  },
  {
    pergunta: "Quem ensina a matéria Poções?",
    opcoes: ["Snape", "Hagrid", "Dumbledore"],
    correta: 0
  },
  {
    pergunta: "Qual é o nome do banco dos bruxos?",
    opcoes: ["Hogwarts Bank", "Gringotes", "Azkaban"],
    correta: 1
  },
  {
    pergunta: "Qual criatura protege a Pedra Filosofal?",
    opcoes: ["Dragão", "Cérbero (Fofo)", "Dementador"],
    correta: 1
  },
  {
    pergunta: "Qual feitiço cria luz na ponta da varinha?",
    opcoes: ["Nox", "Alohomora", "Lumos"],
    correta: 2
  },
  {
    pergunta: "Quem é o diretor de Hogwarts?",
    opcoes: ["Snape", "Dumbledore", "McGonagall"],
    correta: 1
  },
  {
    pergunta: "Qual objeto guarda parte da alma de Voldemort?",
    opcoes: ["Varinha", "Horcrux", "Vira-tempo"],
    correta: 1
  },
  {
    pergunta: "Qual matéria Hermione mais gosta?",
    opcoes: ["Poções", "Aritmância", "Defesa Contra as Artes das Trevas"],
    correta: 1
  }
];

// ===== VARIÁVEIS =====
let perguntas = [];
let atual = 0;
let pontos = 0;
let jogoAtivo = false;

// ===== UTIL =====
function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

// ===== BOTÃO =====
function toggleJogo() {
  const area = document.getElementById("area-jogo");

  if (jogoAtivo) {
    area.innerHTML = "";
    jogoAtivo = false;
    return;
  }

  jogoAtivo = true;
  iniciarQuiz();
}

// ===== INICIAR QUIZ =====
function iniciarQuiz() {
  const area = document.getElementById("area-jogo");

  perguntas = embaralhar([...bancoPerguntas]).slice(0, 6);
  atual = 0;
  pontos = 0;

  area.innerHTML = `
    <div class="quiz">
      <p id="pergunta"></p>
      <div id="opcoes"></div>
      <p id="feedback"></p>
      <p>Pontos: <span id="pontos">0</span></p>
    </div>
  `;

  carregarPergunta();
}

// ===== CARREGAR PERGUNTA =====
function carregarPergunta() {
  const perguntaEl = document.getElementById("pergunta");
  const opcoesEl = document.getElementById("opcoes");
  const feedbackEl = document.getElementById("feedback");

  feedbackEl.textContent = "";
  perguntaEl.textContent = perguntas[atual].pergunta;
  opcoesEl.innerHTML = "";

  perguntas[atual].opcoes.forEach((opcao, i) => {
    const btn = document.createElement("button");
    btn.textContent = opcao;
    btn.onclick = () => responder(i);
    opcoesEl.appendChild(btn);
  });
}

// ===== RESPONDER =====
function responder(i) {
  const feedbackEl = document.getElementById("feedback");
  const pontosEl = document.getElementById("pontos");

  if (i === perguntas[atual].correta) {
    pontos++;
    feedbackEl.textContent = "✅ Correto!";
  } else {
    feedbackEl.textContent = "❌ Errado!";
  }

  pontosEl.textContent = pontos;
  atual++;

  if (atual < perguntas.length) {
    setTimeout(carregarPergunta, 1000);
  } else {
    setTimeout(finalizarQuiz, 1000);
  }
}

// ===== FIM =====
function finalizarQuiz() {
  const area = document.getElementById("area-jogo");

  area.innerHTML = `
    <p>📚 Fim do quiz!</p>
    <p>Você fez <strong>${pontos}</strong> de <strong>${perguntas.length}</strong> pontos ✨</p>
  `;
}
