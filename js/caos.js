let ativo = false;
let intervalo;
let tempo = 20;
let timer;


function toggleJogo() {
  const area = document.getElementById("area-jogo");

  if (ativo) {
    area.innerHTML = "";
    clearInterval(intervalo);
    ativo = false;
    return;
  }

  ativo = true;
  area.innerHTML = `
  <h2>🔥 Caos Mágico 🔥</h2>
  <p>Tempo: <span id="tempo">20</span>s</p>
  <p>Pontos: <span id="pontos">0</span></p>
  <div id="campo"></div>
`;

tempo = 20;

  iniciarJogo();
}

function iniciarJogo() {
  const campo = document.getElementById("campo");
  const pontosEl = document.getElementById("pontos");
  const tempoEl = document.getElementById("tempo");

  let pontos = 0;

  timer = setInterval(() => {
    tempo--;
    tempoEl.textContent = tempo;

    if (tempo <= 0) {
      fimDeJogo(pontos);
    }
  }, 1000);

  intervalo = setInterval(() => {
    const alvo = document.createElement("div");
    alvo.className = "alvo";
    alvo.textContent = "💥";

    alvo.style.left = Math.random() * 360 + "px";
    alvo.style.top = Math.random() * 260 + "px";

    alvo.onclick = () => {
      pontos++;
      pontosEl.textContent = pontos;
      alvo.remove();
    };

    campo.appendChild(alvo);

    setTimeout(() => {
      if (alvo.parentElement) alvo.remove();
    }, 700);
  }, 500);
}

function fimDeJogo(pontos) {
  clearInterval(intervalo);
  clearInterval(timer);

  const area = document.getElementById("area-jogo");

  area.innerHTML += `
    <p>⏱️ Tempo esgotado!</p>
    <h3>Pontuação final: ${pontos}</h3>
  `;

  ativo = false;
}

