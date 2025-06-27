//código do ator
let xAtor = 85;
let yAtor = 366;
let colisao = false;
let meusPontos = 0;

let botaoCima, botaoBaixo;
let movimentoCima = false;
let movimentoBaixo = false;

// Variáveis para controle de teclado e swipe
let teclas = {};

// Variáveis para controle de swipe
let swipeArea;
let touchStartX = 0;
let touchStartY = 0;
let swipeThreshold = 30; // Distância mínima para registrar swipe
let isMobile = false;

// Adicionar estas funções globais no p5.js
function keyPressed() {
  teclas[key] = true;
  teclas[keyCode] = true;
}

function keyReleased() {
  teclas[key] = false;
  teclas[keyCode] = false;
}

function mostraAtor(){
  image(imagemDoAtor, xAtor, yAtor, 30, 30);
}

function movimentaAtor() {
  // Detecta se é dispositivo móvel
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Cria controles baseado no tipo de dispositivo
  if (isMobile) {
    criarAreaSwipe();
  } else {
    criarBotoes();
  }

  // Movimento por botões (desktop)
  if (movimentoCima) {
    yAtor -= 1.3;
  }
  if (movimentoBaixo && podeSeMover()) {
    yAtor += 1.3;
  }

  // Movimento por teclado - setas e WASD
  if (teclas['ArrowUp'] || teclas['w'] || teclas['W']) {
    yAtor -= 1.3;
  }
  if ((teclas['ArrowDown'] || teclas['s'] || teclas['S']) && podeSeMover()) {
    yAtor += 1.3;
  }

  // Limita o movimento do ator na tela
  yAtor = constrain(yAtor, 0, 366);
}

function criarAreaSwipe() {
  if (typeof swipeArea === 'undefined') {
    swipeArea = createDiv('');
    swipeArea.id('swipe-area');
    swipeArea.class('swipe-control');
    
    // Eventos de touch para a área de swipe
    swipeArea.elt.addEventListener('touchstart', handleTouchStart, { passive: false });
    swipeArea.elt.addEventListener('touchmove', handleTouchMove, { passive: false });
    swipeArea.elt.addEventListener('touchend', handleTouchEnd, { passive: false });
  }
}

function criarBotoes() {
  // Só cria botões se não existirem e não for mobile
  if (!isMobile && (typeof botaoCima === 'undefined' || typeof botaoBaixo === 'undefined')) {
    const btnSpacing = 15;
    const btnSize = 60;
    const btnOffset = 30;
    
    botaoCima = createButton('↑');
    botaoCima.position(20, height - btnOffset - btnSize - btnSpacing);
    botaoCima.class('controle-btn btn-cima');
    
    botaoCima.mousePressed(() => movimentoCima = true);
    botaoCima.mouseReleased(() => movimentoCima = false);

    botaoBaixo = createButton('↓');
    botaoBaixo.position(20, height - btnOffset);
    botaoBaixo.class('controle-btn btn-baixo');
    
    botaoBaixo.mousePressed(() => movimentoBaixo = true);
    botaoBaixo.mouseReleased(() => movimentoBaixo = false);
  }
}

// Funções para lidar com eventos de touch/swipe
function handleTouchStart(e) {
  e.preventDefault();
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}

function handleTouchMove(e) {
  e.preventDefault();
}

function handleTouchEnd(e) {
  e.preventDefault();
  
  if (!touchStartX || !touchStartY) {
    return;
  }
  
  const touch = e.changedTouches[0];
  const touchEndX = touch.clientX;
  const touchEndY = touch.clientY;
  
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;
  
  // Verifica se o movimento foi suficiente para ser considerado swipe
  if (Math.abs(deltaX) > swipeThreshold || Math.abs(deltaY) > swipeThreshold) {
    // Prioriza movimento horizontal sobre vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Swipe horizontal
      if (deltaX > 0) {
        // Swipe para direita = mover para cima
        yAtor -= 20; // Movimento mais rápido no swipe
      } else {
        // Swipe para esquerda = mover para baixo
        if (podeSeMover()) {
          yAtor += 20;
        }
      }
    } else {
      // Swipe vertical
      if (deltaY < 0) {
        // Swipe para cima = mover para cima
        yAtor -= 20;
      } else {
        // Swipe para baixo = mover para baixo
        if (podeSeMover()) {
          yAtor += 20;
        }
      }
    }
    
    // Limita o movimento
    yAtor = constrain(yAtor, 0, 366);
  }
  
  // Reset das posições
  touchStartX = 0;
  touchStartY = 0;
}

// Funções para detectar teclas pressionadas - já definidas acima

function verificaColisao(){
  //collideRectCircle(x1, y1, width1, height1, cx, cy, diameter)
  for (let i = 0; i < imagemCarros.length; i++){
    colisao = collideRectCircle(xCarros[i], yCarros[i], comprimentoCarro, alturaCarro, xAtor, yAtor, 15)
    if (colisao){
      voltaAtorParaPosicaoInicial();
      somDaColisao.play();
      if (pontosMaiorQueZero()){
        meusPontos -= 1;
      }
    }
  }
}

function voltaAtorParaPosicaoInicial(){
  yAtor = 366;
}

function incluiPontos(){
  textAlign(CENTER);
  textSize(25);
  fill(color(255, 240, 60))
  text(meusPontos, width / 5, 27);
}

function marcaPonto(){
  if (yAtor < 15){
    meusPontos += 1;
    somDoPonto.play();
    voltaAtorParaPosicaoInicial();
  }
}

function pontosMaiorQueZero(){
  return meusPontos > 0;
}

function podeSeMover(){
  return yAtor < 366;
}