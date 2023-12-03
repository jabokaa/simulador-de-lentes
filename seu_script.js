let larguraPagina = 1024;
let alturaPagina = 762;
let dashbord = {}

function setDashbord() {
    dashbord = {
        nMeio: $('#nMeio').val(),
        centroOptico :{
            x: larguraPagina/2,
            y: alturaPagina / 2,
        },
        objeto: {
            x: 0,
            y: 0,
            distancia: $('#distanciaObjeto').val(),
            altura: $('#alturaObjeto').val(),
            foco: {
                distancia : 0,
                x: 0,
                y: 0,
            },
            ponto: {
                x: 0,
                y: 0,
            }
        },
        imagem: {
            x: 0,
            y: 0,
            distancia: 0,
            altura: 0,
            foco: {
                distancia : 0,
                x: 0,
                y: 0,
            },
            ponto: {
                x: 0,
                y: 0,
            }
        },
        lente: {
            raio1: $('#raio1').val(),
            raio2: $('#raio2').val(),
            tipo: '',
            n: $('#nLente').val(),
        },
    };
}


function setup() {
  createCanvas(larguraPagina, alturaPagina);
}

function draw() {
    setDashbord();
    if(!dashbord.nMeio || !dashbord.lente.raio1 || !dashbord.lente.raio2 || !dashbord.lente.n || !dashbord.objeto.distancia || !dashbord.objeto.altura){
        return false;
    }
    background(200);
    desenhar();
    desenhaRaiosNotaveis();
}

function start(){

}

function desenhar(){
    desenhaeixoXY()
    criaImagem(dashbord.lente.raio1, dashbord.lente.raio2, dashbord.lente.n, dashbord.nMeio, dashbord.objeto.distancia, dashbord.objeto.altura)
}

function desenhaeixoXY(){
    stroke(0); // Cor da linha branca
    strokeWeight(1); // Espessura da linha
    line(0, height / 2, width, height / 2); // Desenha a linha

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
    desenmhaObjeto(alrturaObjeto, distanciaObjeto)

    desenmhaObjeto(tamanhoImagem, -distanciaImagem, 'I')
    dashbord.imagem.distancia = distanciaImagem;
    dashbord.imagem.altura = tamanhoImagem;
    return foco;
}

function escreveTexto(distanciaImagem, tamanhoImagem, foco){
    textSize(20);
    textFont('Arial');  // Fonte do texto
    textStyle(NORMAL);  // Estilo do texto (NORMAL, BOLD, ITALIC, BOLDITALIC)
    fill(0); // Cor do texto (preto)

    if(foco > 0){
        if(foco == dashbord.objeto.distancia){
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
    let x = foco + dashbord.centroOptico.x;
    let y = dashbord.centroOptico.y;
    dashbord.objeto.foco.x = x;
    dashbord.objeto.foco.y = y;
    desenhaPonto(x, y, 'f')
    x = dashbord.centroOptico.x - foco;
    desenhaPonto(x, y, 'fi')
    dashbord.imagem.foco.x = x;
    dashbord.imagem.foco.y = y;
}

function desenmhaObjeto(altura, distancia, texto = 'O'){
    distancia = distancia * -1;
    altura = altura * -1;
    let x = 1 * dashbord.centroOptico.x + 1 * distancia;
    let y = 1 * dashbord.centroOptico.y + 1 * altura;

    if(texto == 'I'){
        dashbord.imagem.y = y;
        dashbord.imagem.x = x;
    } else {
        dashbord.objeto.x = x;
        dashbord.objeto.y = y;
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
    stroke(0, 255, 0); // Cor da linha branca
    strokeWeight(2); // Espessura da linha
    line(x, y, x2, y2); // Desenha a linha

}

function desenhaRaiosNotaveis(){
    let x = dashbord.objeto.x;
    let y = dashbord.objeto.y;
    let x2 = dashbord.centroOptico.x;
    let y2 = 1 *  dashbord.centroOptico.y - 1 * dashbord.objeto.altura;    

    //desenha linha
    stroke(255, 0, 0); // Cor da linha branca
    strokeWeight(0.5); // Espessura da linha
    line(x, y, x2, y2); // Desenha a linha

    x = dashbord.imagem.foco.x;
    y = dashbord.imagem.foco.y;

    stroke(255, 0, 0); // Cor da linha branca
    strokeWeight(0.5); // Espessura da linha
    line(x, y, x2, y2); // Desenha a linha
    x = dashbord.imagem.x;
    y = dashbord.imagem.y;

    stroke(255, 0, 0); // Cor da linha branca
    strokeWeight(0.5); // Espessura da linha
    line(x, y, x2, y2); // Desenha a linha
    
    x2 = dashbord.objeto.x;
    y2 = dashbord.objeto.y;

    let m = (y2 - y) / (x2 - x);
    let b = y - m * x;
    x = dashbord.centroOptico.x;
    y = m * x + b;

    stroke(255, 0, 0); // Cor da linha branca
    strokeWeight(0.5); // Espessura da linha
    line(x, y, x2, y2); // Desenha a linha

    x2 = dashbord.imagem.x;
    y2 = dashbord.imagem.y;
    stroke(255, 0, 0); // Cor da linha branca
    strokeWeight(0.5); // Espessura da linha
    line(x, y, x2, y2); // Desenha a linha

    x = dashbord.centroOptico.x;
    y = dashbord.centroOptico.y;

    x2 = dashbord.objeto.x;
    y2 = dashbord.objeto.y;
    stroke(255, 0, 0); // Cor da linha branca
    strokeWeight(0.5); // Espessura da linha
    line(x, y, x2, y2); // Desenha a linha
}