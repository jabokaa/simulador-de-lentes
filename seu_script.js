let go = false;
let dataraio1 = $('#raio1').val();
let dataraio2 = $('#raio2').val();
let datanLente = $('#nLente').val();
let datanMeio = $('#nMeio').val();
let datadistanciaObjeto = $('#distanciaObjeto').val();
let dataalrturaObjeto = $('#alrturaObjeto').val();
let larguraPagina = 1024;
let alturaPagina = 762;


let x0 = larguraPagina/2
let y0 = alturaPagina / 2;
let focox = 0;
let focoy = 0;
let focoiy = 0;
let focoix = 0;
let objetox = 0;
let objetoy = 0;
let objetoiy = 0;
let objetoix = 0;
let distanciaObjetoG = 0;
let alturaObjetoG = 0;
let distanciaImagemG = 0;
let alturaImagemG = 0;



function setup() {
  createCanvas(larguraPagina, alturaPagina);
}

function draw() {
    background(200);
    if(go) {
        dataraio1 = $('#raio1').val();
        dataraio2 = $('#raio2').val();
        datanLente = $('#nLente').val();
        datanMeio = $('#nMeio').val();
        datadistanciaObjeto = $('#distanciaObjeto').val();
        dataalrturaObjeto = $('#alturaObjeto').val();
        desenhar();
        desenhaRaiosNotaveis();
    }
}

function start(){
    if($('#raio1').val() == '' || $('#raio2').val() == '' || $('#nLente').val() == '' || $('#nMeio').val() == '' || $('#distanciaObjeto').val() == '' || $('#alturaObjeto').val() == ''){
        alert('Preencha todos os campos');
        return;
    }
    go = true
    dataraio1 = $('#raio1').val();
    dataraio2 = $('#raio2').val();
    datanLente = $('#nLente').val();
    datanMeio = $('#nMeio').val();
    datadistanciaObjeto = $('#distanciaObjeto').val();
    dataalrturaObjeto = $('#alturaObjeto').val();
}

function desenhar(){
    desenhaeixoXY()
    criaImagem(dataraio1, dataraio2, datanLente, datanMeio, datadistanciaObjeto, dataalrturaObjeto)
}

function desenhaeixoXY(){
    // Desenha o eixo X
    stroke(0); // Cor da linha branca
    strokeWeight(1); // Espessura da linha
    line(0, height / 2, width, height / 2); // Desenha a linha

    // Desenha o eixo Y
    stroke(0); // Cor da linha branca
    strokeWeight(1); // Espessura da linha
    line(width / 2, 0, width / 2, height); // Desenha a linha

}


function equacaoDoFabricante(raio1, raio2, nLente, nMeio){
    let foco = 1 / (((nLente / nMeio) -1) * ((1 / raio1) + (1 / raio2)))
    return foco;
}

function fdistanciaImagem(distanciaObjeto, foco){
    let distanciaImagem = 1 / ((1/foco) - (1/distanciaObjeto))
    return distanciaImagem;
}

function ampliacao(distanciaImagem, distanciaObjeto, alrturaObjeto){
    let tamanhoImagem = (-1 * distanciaImagem / distanciaObjeto) * alrturaObjeto;
    return tamanhoImagem;
}

function criaImagem(raio1, raio2, nLente, nMeio, distanciaObjeto, alrturaObjeto) {
    let foco = equacaoDoFabricante(raio1, raio2, nLente, nMeio);
    let distanciaImagem = fdistanciaImagem(distanciaObjeto, foco);

    let tamanhoImagem = ampliacao(distanciaImagem, distanciaObjeto, alrturaObjeto);
    escreveTexto(distanciaImagem, tamanhoImagem, foco);

    desenhaFoco(foco);
    alturaObjetoG = alrturaObjeto;
    distanciaObjetoG = distanciaObjeto;
    desenmhaObjeto(alrturaObjeto, distanciaObjeto)

    desenmhaObjeto(tamanhoImagem, -distanciaImagem, 'I')
    console.log(distanciaImagem)
    distanciaImagemG = distanciaImagem;
    alturaImagemG = tamanhoImagem;
    return foco;
}

function escreveTexto(distanciaImagem, tamanhoImagem, foco){
    textSize(20);
    textFont('Arial');  // Fonte do texto
    textStyle(NORMAL);  // Estilo do texto (NORMAL, BOLD, ITALIC, BOLDITALIC)
    fill(0); // Cor do texto (preto)

    if(foco > 0){
        if(foco == distanciaObjetoG){
            text('Imagem impropia', 10, 120);

            let pontaX = 100;
            let pontaY = 300;
        
            // Define o comprimento e largura da seta
            let comprimento = 50;
            let largura = 20;
        
            // Desenha a seta
            fill(0); // Cor de preenchimento preto
            noStroke(); // Sem contorno
            triangle(pontaX, pontaY - largura / 2, pontaX + comprimento, pontaY, pontaX, pontaY + largura / 2);
        
            // Adiciona o texto
            fill(0); // Cor do texto preto
            textSize(14);
            textStyle(NORMAL);
            text("Sentido da Luz", pontaX - 50, pontaY + 50)
            return;
        }
        text('Lente convergente', 10, 180);
    } else {
        text('Lente divergente', 10, 210);
    }

    text('Distancia da imagem: ' + Math.abs(distanciaImagem), 10, 30);
    text('Tamanho da imagem: ' + Math.abs(tamanhoImagem), 10, 60);
    text('Foco: ' + foco, 10, 90);
    if(distanciaImagem < 0){
        text('Imagem direita', 10, 120);
        text('Imagem virtual', 10, 150);
    } else {
        text('Imagem invertida', 10, 120);
        text('Imagem real', 10, 150);
    }


    let pontaX = 100;
    let pontaY = 300;

    // Define o comprimento e largura da seta
    let comprimento = 50;
    let largura = 20;

    // Desenha a seta
    fill(0); // Cor de preenchimento preto
    noStroke(); // Sem contorno
    triangle(pontaX, pontaY - largura / 2, pontaX + comprimento, pontaY, pontaX, pontaY + largura / 2);

    // Adiciona o texto
    fill(0); // Cor do texto preto
    textSize(14);
    textStyle(NORMAL);
    text("Sentido da Luz", pontaX - 50, pontaY + 50)


    stroke(0); // Cor da linha branca
    strokeWeight(5); // Espessura da linha
    line(pontaX, pontaY, pontaX - 50, pontaY); // Desenha a linha
}

function desenhaPonto(x, y, texto){
    // Desenha o ponto
    stroke(0,0,255);  // Cor da borda do ponto (preto)
    strokeWeight(5);  // Tamanho do ponto
    point(x, y);
    
    // Configura o estilo do texto
    strokeWeight(0.25);  // Tamanho do ponto
    textSize(15);
    textFont('Arial');
    textStyle(NORMAL);
    fill(0);

    // Ajusta as coordenadas do texto para centralizá-lo em relação ao ponto
    let textoX = x;
    let textoY = y + 15;

    // Desenha o texto
    text(texto, textoX, textoY);
}

function desenhaFoco(foco) {
    foco = foco * -1;
    let x = foco + x0;
    let y = y0;
    focox = x;
    focoy = y;
    desenhaPonto(x, y, 'f')
    x = x0 - foco;
    desenhaPonto(x, y, 'fi')
    focoix = x;
    focoiy = y;
}

function desenmhaObjeto(altura, distancia, texto = 'O'){
    distancia = distancia * -1;
    altura = altura * -1;
    let x = 1 * x0 + 1 * distancia;
    let y = 1 * y0 + 1 * altura;

    if(texto == 'I'){
        objetoiy = y;
        objetoix = x;
    } else {
        objetox = x;
        objetoy = y;
    }
    stroke(0,0,255);  // Cor da borda do ponto (preto)
    strokeWeight(10);  // Tamanho do ponto
    point(x, y);
    
    // Configura o estilo do texto
    strokeWeight(0.25);
    textSize(15);
    textFont('Arial');
    textStyle(NORMAL);
    fill(0);

    // Ajusta as coordenadas do texto para centralizá-lo em relação ao ponto
    let textoX = x - 15;
    let textoY = y;

    // Desenha o texto
    text(texto, textoX, textoY);

    let x2 = x;
    let y2 = y - altura;
    //desenha linha
    stroke(0, 255, 0); // Cor da linha branca
    strokeWeight(2); // Espessura da linha
    line(x, y, x2, y2); // Desenha a linha

}

function desenhaRaiosNotaveis(){
    let x = objetox;
    let y = objetoy;
    let x2 = x0;
    let y2 = 1 *  y0 - 1 * alturaObjetoG;    

    //desenha linha
    stroke(255, 0, 0); // Cor da linha branca
    strokeWeight(0.5); // Espessura da linha
    line(x, y, x2, y2); // Desenha a linha

    x = focoix;
    y = focoiy;

    stroke(255, 0, 0); // Cor da linha branca
    strokeWeight(0.5); // Espessura da linha
    line(x, y, x2, y2); // Desenha a linha
    x = objetoix;
    y = objetoiy;

    stroke(255, 0, 0); // Cor da linha branca
    strokeWeight(0.5); // Espessura da linha
    line(x, y, x2, y2); // Desenha a linha
    
    x2 = objetox;
    y2 = objetoy;

    let m = (y2 - y) / (x2 - x);
    let b = y - m * x;
    x = x0;
    y = m * x + b;

    stroke(255, 0, 0); // Cor da linha branca
    strokeWeight(0.5); // Espessura da linha
    line(x, y, x2, y2); // Desenha a linha

    x2 = objetoix;
    y2 = objetoiy;
    stroke(255, 0, 0); // Cor da linha branca
    strokeWeight(0.5); // Espessura da linha
    line(x, y, x2, y2); // Desenha a linha

    x = x0;
    y = y0;

    x2 = objetox;
    y2 = objetoy;
    stroke(255, 0, 0); // Cor da linha branca
    strokeWeight(0.5); // Espessura da linha
    line(x, y, x2, y2); // Desenha a linha

    
}