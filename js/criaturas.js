let jogoAtivo = false;
let intervaloId = null;

function toggleJogo() {
  const area = document.getElementById("area-jogo");

  if (jogoAtivo) {
    pararJogo();
    area.style.display = "none";
    return;
  }

  area.style.display = "block";
  iniciarJogo();
}

function iniciarJogo() {
  const campo = document.getElementById("campo");
  const pontosEl = document.getElementById("pontos");

  let pontos = 0;
  pontosEl.textContent = pontos;

  jogoAtivo = true;

  function criarCriatura() {
    if (!jogoAtivo) return;

    const criatura = document.createElement("div");
    criatura.className = "criatura";
    criatura.textContent = "✨";

    const maxX = campo.clientWidth - 30;
    const maxY = campo.clientHeight - 30;

    criatura.style.left = Math.random() * maxX + "px";
    criatura.style.top = Math.random() * maxY + "px";

    criatura.onclick = () => {
      pontos++;
      pontosEl.textContent = pontos;
      criatura.remove();
    };

    campo.appendChild(criatura);

    setTimeout(() => {
      if (criatura.parentElement) criatura.remove();
    }, 3000);
  }

  intervaloId = setInterval(criarCriatura, 1500);
}

function pararJogo() {
  jogoAtivo = false;

  if (intervaloId) {
    clearInterval(intervaloId);
    intervaloId = null;
  }

  document.querySelectorAll(".criatura").forEach(c => c.remove());
}
