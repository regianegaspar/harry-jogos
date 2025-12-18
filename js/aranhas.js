let jogoAtivo = false;
let jogoEl = null;
let ronyEl = null;
let pontosEl = null;

let posX = 180;
let pontos = 0;
let vivo = false;
let criarIntervalId = null;

function toggleJogo() {
  const area = document.getElementById("area-jogo");

  if (jogoAtivo) {
    stopGame();
    area.innerHTML = "";
    jogoAtivo = false;
    return;
  }

  jogoAtivo = true;
  area.innerHTML = `
    <div id="score">Pontos: <span id="pontos">0</span></div>
    <div id="jogo">
      <div id="rony">👨‍🦰</div>
    </div>
  `;

  iniciarJogo();
}

function iniciarJogo() {
  jogoEl = document.getElementById("jogo");
  ronyEl = document.getElementById("rony");
  pontosEl = document.getElementById("pontos");

  if (!jogoEl || !ronyEl || !pontosEl) return;

  posX = 180;
  pontos = 0;
  vivo = true;

  ronyEl.style.left = posX + "px";
  pontosEl.innerText = pontos;

  document.addEventListener("keydown", keyHandler);
  criarIntervalId = setInterval(criarAranha, 1000);
}

function stopGame() {
  vivo = false;

  if (criarIntervalId) {
    clearInterval(criarIntervalId);
    criarIntervalId = null;
  }

  document.removeEventListener("keydown", keyHandler);

  if (jogoEl) {
    jogoEl.querySelectorAll(".aranha").forEach(a => a.remove());
  }
}

function keyHandler(e) {
  if (!vivo) return;

  const jogoWidth = jogoEl.clientWidth;
  const step = 20;

  if (e.key === "ArrowLeft" && posX > 0) {
    posX = Math.max(0, posX - step);
  }

  if (e.key === "ArrowRight" && posX < jogoWidth - 40) {
    posX = Math.min(jogoWidth - 40, posX + step);
  }

  ronyEl.style.left = posX + "px";
}

function criarAranha() {
  if (!vivo || !jogoEl) return;

  const aranha = document.createElement("div");
  aranha.className = "aranha";
  aranha.innerText = "🕷️";

  const maxLeft = jogoEl.clientWidth - 30;
  aranha.style.left = Math.random() * maxLeft + "px";
  aranha.style.top = "0px";

  jogoEl.appendChild(aranha);

  let posY = 0;

  const queda = setInterval(() => {
    if (!vivo) {
      clearInterval(queda);
      aranha.remove();
      return;
    }

    posY += 5;
    aranha.style.top = posY + "px";

    const ronyRect = ronyEl.getBoundingClientRect();
    const aranhaRect = aranha.getBoundingClientRect();

    if (
      aranhaRect.bottom > ronyRect.top &&
      aranhaRect.left < ronyRect.right &&
      aranhaRect.right > ronyRect.left
    ) {
      clearInterval(queda);
      gameOver();
      return;
    }

    if (posY > jogoEl.clientHeight) {
      clearInterval(queda);
      aranha.remove();
      pontos++;
      pontosEl.innerText = pontos;
    }
  }, 30);
}

function gameOver() {
  stopGame();
  alert("🕷️ Game Over! Pontuação: " + pontos);
  jogoAtivo = false;

  const area = document.getElementById("area-jogo");
  if (area) area.innerHTML = "";
}

