//código do ator
let xAtor = 85;
let yAtor = 366;
let colisao = false;
let meusPontos = 0;

let botaoCima, botaoBaixo;
let movimentoCima = false;
let movimentoBaixo = false;

function mostraAtor(){
  image(imagemDoAtor, xAtor, yAtor, 30, 30);
}

function movimentaAtor() {
  if (typeof botaoCima === 'undefined' || typeof botaoBaixo === 'undefined') {
    botaoCima = createButton('↑');
    botaoCima.position(10, height - 60);
    botaoCima.mousePressed(() => movimentoCima = true);
    botaoCima.mouseReleased(() => movimentoCima = false);

    botaoBaixo = createButton('↓');
    botaoBaixo.position(10, height - 30);
    botaoBaixo.mousePressed(() => movimentoBaixo = true);
    botaoBaixo.mouseReleased(() => movimentoBaixo = false);
  }

  if (movimentoCima) {
    yAtor -= 1.3;
  }
  if (movimentoBaixo && podeSeMover()) {
    yAtor += 1.3;
  }
}


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
