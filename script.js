//selecionando o elemento Dino
const dino = document.querySelector('.dino');
const fundo = document.querySelector('.fundo');

let isJumping = false;
let isGameOver = false;
let position = 0;

//keycode.info para descobrir o codigo da tecla digitada pelo usuario.
//Pegando o evento keyup da tecla espaço
function handleKeyUp(event) {
    if (event.keyCode === 32) {
      if (!isJumping) {
        jump();
      }
    }
  }

  function jump() {
    isJumping = true;
  
    let upInterval = setInterval(() => {
      if (position >= 150) {
        // Descendo
        clearInterval(upInterval);
  
        let downInterval = setInterval(() => {
          if (position <= 0) {
            clearInterval(downInterval);
            isJumping = false;
          } else {
            position -= 20;
            dino.style.bottom = position + 'px';
          }
        }, 20);
      } else {
        // Subindo
        position += 20;
        dino.style.bottom = position + 'px';
      }
    }, 20);
  }
  
  function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;
  
    if (isGameOver) return;
  
    cactus.classList.add('cactus');
    fundo.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';
  
    let leftTimer = setInterval(() => {
      if (cactusPosition < -60) {
        // Saiu da tela
        clearInterval(leftTimer);
        fundo.removeChild(cactus);
      } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
        // Game over
        clearInterval(leftTimer);
        isGameOver = true;
        document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
      } else {
        cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px';
      }
    }, 20);
  
    setTimeout(createCactus, randomTime);
  }
  
  createCactus();
  document.addEventListener('keyup', handleKeyUp);