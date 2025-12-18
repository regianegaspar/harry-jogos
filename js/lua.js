let jogoAtivo = false;
let intervalo;

function toggleJogo() {
  const area = document.getElementById("area-jogo");

  if (jogoAtivo) {
    clearInterval(intervalo);
    area.innerHTML = "";
    jogoAtivo = false;
    return;
  }

  jogoAtivo = true;

  area.innerHTML = `
    <div class="jogo-lua">
      <h2>🌕 Ciclo da Lua</h2>
      <p>Clique somente quando a lua estiver cheia</p>

      <div id="lua" class="lua">🌑</div>

      <p>Pontos: <span id="pontos">0</span></p>
    </div>
  `;

  iniciarJogo();
}

function iniciarJogo() {
  const fases = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
  let atual = 0;
  let pontos = 0;

  const lua = document.getElementById("lua");
  const pontosEl = document.getElementById("pontos");

  function mudarLua() {
    lua.textContent = fases[atual];
    atual = (atual + 1) % fases.length;
  }

  lua.onclick = () => {
    if (lua.textContent === "🌕") {
      pontos++;
      pontosEl.textContent = pontos;
    } else {
      alert("❌ Não é lua cheia! Você perdeu o controle...");
      pontos = 0;
      pontosEl.textContent = pontos;
    }
  };

  intervalo = setInterval(mudarLua, 800);
}
