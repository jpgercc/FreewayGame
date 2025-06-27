//código do ator
let xAtor = 85;
let yAtor = 366;
let colisao = false;
let meusPontos = 0;

let botaoCima, botaoBaixo;
let movimentoCima = false;
let movimentoBaixo = false;

// Variáveis para controle de teclado
let teclas = {};

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
  // Cria botões apenas se não existirem
  if (typeof botaoCima === 'undefined' || typeof botaoBaixo === 'undefined') {
    criarBotoes();
  }

  // Movimento por botões
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

function criarBotoes() {
  // Detecta se é dispositivo móvel
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Posição dos botões ajustada para mobile
  const btnSpacing = isMobile ? 90 : 50;
  const btnOffset = isMobile ? 100 : 80;

  botaoCima = createButton('↑');
  botaoCima.position(20, height - btnOffset - btnSpacing);
  botaoCima.class('controle-btn btn-cima');
  
  // Eventos para desktop e mobile
  botaoCima.mousePressed(() => movimentoCima = true);
  botaoCima.mouseReleased(() => movimentoCima = false);
  botaoCima.touchStarted(() => {
    movimentoCima = true;
    return false; // Previne comportamento padrão
  });
  botaoCima.touchEnded(() => {
    movimentoCima = false;
    return false;
  });

  botaoBaixo = createButton('↓');
  botaoBaixo.position(20, height - btnOffset + 10);
  botaoBaixo.class('controle-btn btn-baixo');
  
  botaoBaixo.mousePressed(() => movimentoBaixo = true);
  botaoBaixo.mouseReleased(() => movimentoBaixo = false);
  botaoBaixo.touchStarted(() => {
    movimentoBaixo = true;
    return false;
  });
  botaoBaixo.touchEnded(() => {
    movimentoBaixo = false;
    return false;
  });
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