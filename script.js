const coinButton = document.getElementById('coin');
const flipBtn    = document.getElementById('flipBtn');
const resultEl   = document.getElementById('result');

let busy = false;

function flipCoin(){
  if (busy) return;
  busy = true;

  // Resultado aleatório
  const isHeads = Math.random() < 0.5;

  // Parâmetros de rotação e inclinação
  const spinsY   = Math.floor(Math.random() * 3) + 5;  // 5..7 voltas
  const tiltX    = (Math.random() * 30) - 15;          // -15°..+15°
  const tiltZ    = (Math.random() * 10) - 5;           // -5°..+5°
  const finalY   = isHeads ? 0 : 180;
  const totalY   = spinsY * 360 + finalY;

  // Reinicia transição para permitir giros consecutivos iguais
  coinButton.classList.remove('is-animating');
  // Força reflow
  // eslint-disable-next-line no-unused-expressions
  coinButton.offsetWidth;
  coinButton.classList.add('is-animating');

  // Aplica a transformação
  coinButton.style.transform = `rotateX(${tiltX}deg) rotateZ(${tiltZ}deg) rotateY(${totalY}deg)`;

  // Desabilita interação durante a animação
  coinButton.disabled = true;
  flipBtn.disabled = true;

  // Mostra resultado ao final
  setTimeout(() => {
    resultEl.textContent = isHeads ? 'Cara' : 'Coroa';
    busy = false;
    coinButton.disabled = false;
    flipBtn.disabled = false;
  }, 1800);
}

// Clique na moeda, no botão e suporte a teclado
coinButton.addEventListener('click', flipCoin);
flipBtn.addEventListener('click', flipCoin);
coinButton.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    flipCoin();
  }
});
