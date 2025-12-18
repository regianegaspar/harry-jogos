let voce = 0;
let draco = 0;
let jogoAtivo = false;

function toggleJogo() {
  const area = document.getElementById("area-jogo");

  if (jogoAtivo) {
    area.innerHTML = "";
    jogoAtivo = false;
    return;
  }

  jogoAtivo = true;
  voce = 0;
  draco = 0;

  area.innerHTML = `
    <div class="jogo-duelo">
      <p>Escolha sua jogada:</p>

      <div class="opcoes">
        <button onclick="jogar('pedra')">🪨 Pedra</button>
        <button onclick="jogar('varinha')">🪄 Varinha</button>
        <button onclick="jogar('feitico')">✨ Feitiço</button>
      </div>

      <p id="resultado"></p>
      <p id="placar">Você 0 x 0 Draco</p>
    </div>
  `;
}

function jogar(escolha) {
  if (!jogoAtivo) return;

  const opcoes = ["pedra", "varinha", "feitico"];
  const cpu = opcoes[Math.floor(Math.random() * 3)];

  let res = "";

  if (escolha === cpu) {
    res = "Empate!";
  } else if (
    (escolha === "pedra" && cpu === "feitico") ||
    (escolha === "varinha" && cpu === "pedra") ||
    (escolha === "feitico" && cpu === "varinha")
  ) {
    voce++;
    res = "Você venceu o duelo!";
  } else {
    draco++;
    res = "Draco venceu!";
  }

  document.getElementById("resultado").textContent =
    `Você escolheu ${escolha}, Draco escolheu ${cpu}. ${res}`;

  document.getElementById("placar").textContent =
    `Você ${voce} x ${draco} Draco`;
}
