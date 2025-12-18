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
    <h2>🧠 Jogo da Memória</h2>
    <div id="tabuleiro"></div>
  `;

  iniciarJogo();
}



// area.innerHTML = `
//   <h2>🧠 Jogo da Memória</h2>
//   <div id="tabuleiro"></div>
// `;
// iniciarMemoria();



const personagens = [
  "harry", "rony", "hermione", "draco", "luna",
  "snape", "voldemort", "sirius", "hagrid", "dumbledore"
];

function iniciarJogo() {
  const tabuleiro = document.getElementById("tabuleiro");
  if (!tabuleiro) return;
  tabuleiro.innerHTML = "";

  let cartas = [...personagens, ...personagens];
  cartas.sort(() => Math.random() - 0.5);

  let primeiraCarta = null;
  let bloqueio = false;
  let pares = 0;

  cartas.forEach(nome => {
    const carta = document.createElement("div");
    carta.classList.add("carta");
    carta.dataset.nome = nome;

    carta.innerHTML = `
      <div class="face frente"></div>
      <div class="face verso">
        <img src="../imagens/memoria/${nome}.png" alt="${nome}">
      </div>
    `;

    carta.addEventListener("click", () => virarCarta(carta));
    tabuleiro.appendChild(carta);
  });

  function virarCarta(carta) {
    if (bloqueio || carta.classList.contains("virada")) return;

    carta.classList.add("virada");

    if (!primeiraCarta) {
      primeiraCarta = carta;
    } else {
      verificarPar(carta);
    }
  }

  function verificarPar(carta) {
    if (primeiraCarta.dataset.nome === carta.dataset.nome) {
      pares++;
      primeiraCarta = null;

      if (pares === personagens.length) {
        setTimeout(() => {
          alert("🎉 Você venceu!");
        }, 500);
      }
    } else {
      bloqueio = true;
      setTimeout(() => {
        primeiraCarta.classList.remove("virada");
        carta.classList.remove("virada");
        primeiraCarta = null;
        bloqueio = false;
      }, 1000);
    }
  }

}