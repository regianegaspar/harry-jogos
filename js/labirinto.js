// ===== LABIRINTOS POSSÍVEIS =====
const labirintos = [
  [
    "##########",
    "#S   #   #",
    "# ## # # #",
    "#    # # #",
    "#### # # E",
    "#      # #",
    "##########"
  ],
  [
    "##########",
    "#S #     #",
    "#  # ##  #",
    "##   #  # #",
    "# ### ## E",
    "#        #",
    "##########"
  ],
  [
    "##########",
    "#S   #   #",
    "### ## # #",
    "#      # E",
    "#  #### #",
    "#        #",
    "##########"
  ]
];

// ===== VARIÁVEIS =====
let mapa = [];
let pos = { x: 1, y: 1 };
let ativo = false;

// ===== ABRIR / FECHAR JOGO =====
function toggleLabirinto() {
  const area = document.getElementById("area-jogo");

  if (ativo) {
    ativo = false;
    area.innerHTML = "";
    return;
  }

  ativo = true;

  // sorteia um labirinto
  mapa = labirintos[Math.floor(Math.random() * labirintos.length)];

  // encontra posição inicial (S)
  for (let y = 0; y < mapa.length; y++) {
    for (let x = 0; x < mapa[y].length; x++) {
      if (mapa[y][x] === "S") {
        pos = { x, y };
      }
    }
  }

  area.innerHTML = `<div id="labirinto" tabindex="0"></div>`;

  const lab = document.getElementById("labirinto");
  lab.focus();
  lab.addEventListener("keydown", mover);

  desenhar();
}

// ===== DESENHAR LABIRINTO =====
function desenhar() {
  const lab = document.getElementById("labirinto");
  lab.innerHTML = "";

  for (let y = 0; y < mapa.length; y++) {
    for (let x = 0; x < mapa[y].length; x++) {
      const cel = document.createElement("div");
      cel.classList.add("celula");

      if (mapa[y][x] === "#") cel.classList.add("parede");
      if (mapa[y][x] === "E") cel.classList.add("saida");
      if (x === pos.x && y === pos.y) cel.classList.add("sirius");

      lab.appendChild(cel);
    }
  }
}

// ===== MOVIMENTO =====
function mover(e) {
  if (!ativo) return;

  e.preventDefault();

  let dx = 0;
  let dy = 0;

  switch (e.key) {
    case "ArrowUp":
      dy = -1;
      break;
    case "ArrowDown":
      dy = 1;
      break;
    case "ArrowLeft":
      dx = -1;
      break;
    case "ArrowRight":
      dx = 1;
      break;
    default:
      return;
  }

  const nx = pos.x + dx;
  const ny = pos.y + dy;

  if (mapa[ny][nx] === "#") return;

  pos = { x: nx, y: ny };
  desenhar();

  if (mapa[ny][nx] === "E") {
    setTimeout(() => {
      alert("🐺 Sirius escapou de Azkaban!");
      toggleLabirinto();
    }, 100);
  }
}
