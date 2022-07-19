const btnGame = document.getElementById("btnGame");
const btnNew = document.getElementById("btnNew");
const btnPalavra = document.getElementById("btnPalavra");
const btnSair = document.getElementById("btnSair");

const adicionaPalavra = document.querySelector(".adicionaPalavra");
const palavra = document.getElementById("palavra");
const jogo = document.querySelector(".jogo");
const letraIncorreta = document.querySelector(".letraIncorreta");

var palavraSorteada = [];
var letrasDigitadas= [];
var palavraCerta = [];
var letrasErradas = [];



const palavras = [
  "JAVA",
  "LINUX",
  "WINDOWS",
  "CHROME",
  "OPERA",
  "FIREFOX",
  "ORACLE",
  "ALURA",
  "GITHUB",
  "GIT",
];

btnNew.addEventListener("click", () => {
  novaPalavra(); 

});


btnPalavra.addEventListener("click", (e) => {    
  e.preventDefault(); 
    var nome = palavra.value;
    console.log(nome);
    if (nome.length > 0) {
      verificaPalavra(nome);
    }else{
      alert("Digite uma palavra válida!");
    }
  });                                                             

btnGame.addEventListener("click", () => {
  game();
});

function sorteiaPalavra() {
  palavraSorteada = palavras[Math.floor(Math.random() * palavras.length)].split("");
    return palavraSorteada;
}
function criaTracos(){
  let div = document.createElement("div");
  div.classList.add("letras");
  for (let i = 0; i < palavraSorteada.length; i++) {
    let letra = document.createElement("p");
    letra.classList.add("letra");
    letra.innerHTML = "_";
    div.appendChild(letra);
    jogo.appendChild(div);
  }
}
function adicionarLetraCorreta(i){
  palavraCerta.push(palavraSorteada[i]);
}

function iniciaJogo(){
  jogo.classList.remove("invisivel");
  btnGame.style.display = "none";
  btnNew.style.display = "none";
}

function game() {
  var chances = 8;
  var erros = 8;

  sorteiaPalavra();
  iniciaJogo();

  console.log(palavraSorteada);

  criaTracos();
  for (let i = 0; i < palavraSorteada.length; i++) {
    palavraCerta.push(" ");
  }  

  document.addEventListener("keydown", (e) => {
    let codigoLetra = e.keyCode;
    let letra = verificaLetra(codigoLetra);
    if (!letrasDigitadas.includes(letra)) { 
      letrasDigitadas.push(letra);
      if (palavraSorteada.includes(letra)) {
        for (let i = 0; i < palavraSorteada.length; i++) {
          if (letra == palavraSorteada[i]) {
            palavraCerta[i] = letra;
            document.querySelectorAll(".letras p")[i].innerHTML = letra;
          }}
        }else{
          document.querySelector(".letraIncorreta").innerHTML += letra;
          desenhaForca(erros);
          erros--;
          letrasErradas.push(letra);
          
        }chances--;
        console.log(erros);
        console.log(chances);
        console.log(letrasDigitadas);
        console.log(letrasErradas);
        console.log(palavraCerta);
      }

      if (!palavraCerta.includes(" ")) {
        mensagem("Parabéns, você ganhou!"); 
      }
      if (erros < 0 && palavraSorteada != palavraCerta) {
        mensagem("Você perdeu!");
      }
    })};
  

btnSair.addEventListener("click", () => {
  window.location.reload();
});

function verificaLetra(codigo) {
  if (codigo >= 65 && codigo <= 90) {
    return String.fromCharCode(codigo);
  }
}

function desenhaForca(erro) {
  var canvas = document.querySelector("#forca").getContext("2d");
  canvas.lineWidth = 6;
  canvas.lineCap = "round";
  canvas.LineJoin = "round";
  canvas.strokeStyle = "#0A3871";

  if (erro == 8) {
    // Base
    canvas.beginPath();
    canvas.moveTo(153, 390);
    canvas.lineTo(447, 390);
    canvas.stroke();

    // 1º Linha
    canvas.beginPath();
    canvas.moveTo(180, 390);
    canvas.lineTo(180, 10);
    canvas.stroke();
  }

  if (erro == 7) {
    // 2ª Linha
    canvas.beginPath();
    canvas.moveTo(175, 10);
    canvas.lineTo(363, 10);
    canvas.stroke();
  }

  if (erro == 6) {
    // 3ª Linha
    canvas.beginPath();
    canvas.moveTo(358, 10);
    canvas.lineTo(358, 65);
    canvas.stroke();
  }

  if (erro == 5) {
    // Cabeça
    canvas.beginPath();
    canvas.arc(358, 95, 32, 0, Math.PI * 2);
    canvas.stroke();
  }

  if (erro == 4) {
    // Corpo
    canvas.beginPath();
    canvas.moveTo(358, 130);
    canvas.lineTo(358, 265);
    canvas.stroke();
  }

  if (erro == 3) {
    // 1º Braço
    canvas.beginPath();
    canvas.moveTo(358, 130);
    canvas.lineTo(300, 202);
    canvas.stroke();
  }

  if (erro == 2) {
    // 2º Braço
    canvas.beginPath();
    canvas.moveTo(358, 130);
    canvas.lineTo(416, 202);
    canvas.stroke();
  }

  if (erro == 1) {
    // 1ª Perna
    canvas.beginPath();
    canvas.moveTo(358, 262);
    canvas.lineTo(300, 334);
    canvas.stroke();
  }

  if (erro == 0) {
    // 2ª Perna
    canvas.beginPath();
    canvas.moveTo(358, 262);
    canvas.lineTo(416, 334);
    canvas.stroke();
  }
}


function verificaCampo(campo) {
  if (campo.value == "") {
    alert("Digite uma palavra!");
  }
}

function mensagem(mensagem) {
  document.querySelector(".resposta").innerHTML = mensagem;
        setTimeout(() => {
          document.location.reload();
        }, 2000);
}

function novaPalavra(){
  adicionaPalavra.classList.remove("invisivel");
  btnGame.style.display = "none";
  btnNew.style.display = "none";
}

function verificaPalavra(nome){
  palavras.push(nome.toUpperCase());
  palavra.value = "";
  alert("Palavra adicionada com sucesso!");
  btnGame.style.display = "block";
  btnNew.style.display = "block";
  document.querySelector(".conteiner").style.display = "flex";
  adicionaPalavra.classList.add("invisivel");
}