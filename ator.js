// Código do ator
let xAtor = 85;
let yAtor = 366;
let colisao = false;
let meusPontos = 0;

// Tamanho do ator
const tamanhoAtor = 30;

// Configura o toque na tela
function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop(); // Para evitar loop desnecessário
}

function draw() {
  background(200);
  mostraAtor();
  movimentaAtor();
  verificaColisao();
  incluiPontos();
  marcaPonto();
}

// Função para mostrar o ator
function mostraAtor() {
  image(imagemDoAtor, xAtor, yAtor, tamanhoAtor, tamanhoAtor);
}

// Função para movimentar o ator com base no toque
function movimentaAtor() {
  if (touches.length > 0) {
    let touch = touches[0];
    if (touch.y < height / 2) {
      yAtor -= 3; // Move para cima
    } else {
      if (podeSeMover()) {
        yAtor += 3; // Move para baixo
      }
    }
  }
}

// Função para verificar colisão
function verificaColisao() {
  // collideRectCircle(x1, y1, width1, height1, cx, cy, diameter)
  for (let i = 0; i < imagemCarros.length; i++) {
    colisao = collideRectCircle(xCarros[i], yCarros[i], comprimentoCarro, alturaCarro, xAtor, yAtor, 15);
    if (colisao) {
      voltaAtorParaPosicaoInicial();
      somDaColisao.play();
      if (pontosMaiorQueZero()) {
        meusPontos -= 1;
      }
    }
  }
}

// Função para voltar o ator à posição inicial
function voltaAtorParaPosicaoInicial() {
  yAtor = 366;
}

// Função para incluir pontos
function incluiPontos() {
  textAlign(CENTER);
  textSize(25);
  fill(color(255, 240, 60));
  text(meusPontos, width / 5, 27);
}

// Função para marcar ponto
function marcaPonto() {
  if (yAtor < 15) {
    meusPontos += 1;
    somDoPonto.play();
    voltaAtorParaPosicaoInicial();
  }
}

// Função para verificar se os pontos são maiores que zero
function pontosMaiorQueZero() {
  return meusPontos > 0;
}

// Função para verificar se o ator pode se mover
function podeSeMover() {
  return yAtor < 366;
}
