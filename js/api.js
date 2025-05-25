// DOM - informa os objestos do HTML que serão manipulados

const inputCidade = document.querySelector(".input-cidade");
const botaoBusca = document.querySelector(".botao-busca");
const cidade = document.querySelector(".cidade");
const temp = document.querySelector(".temp");
const previsao = document.querySelector(".texto-previsao");
const icone = document.querySelector("#icone");
const umidade = document.querySelector(".umidade");
const vento = document.querySelector(".vento");
const sensacao = document.querySelector(".sensacao-terma");
const key = "32e1bb4723117b05d8438cd4f7abae7a";
const caixaMaior = document.querySelector(".caixa-maior");
// EVENTO

botaoBusca.addEventListener("click", buscar_cidade);

inputCidade.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      buscar_cidade();
    }
  });

// FUNÇÕES


function animarTexto(elemento, texto, delay = 40) {
  elemento.innerHTML = "";
  let i = 0;
  function escrever() {
    if (i < texto.length) {
      elemento.innerHTML += texto.charAt(i);
      i++;
      setTimeout(escrever, delay);
    }
  }
  escrever();
}


async function buscar_cidade(){
  const procura_cidade = inputCidade.value;
  
  const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${procura_cidade}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json());
  if (dados.cod === "404") {
    alert("Cidade não encontrada");
    return;
  }


  caixaMaior.classList.remove("caixa-animada");
  void caixaMaior.offsetWidth;
  caixaMaior.classList.add("caixa-animada");


  setTimeout(() => {
    animarTexto(cidade, `${dados.name}`);
    animarTexto(temp, `${dados.main.temp} °C`);
    animarTexto(previsao, `${dados.weather[0].description}`);
    animarTexto(umidade, `Umidade: ${dados.main.humidity} %`);
    animarTexto(vento, `Velocidade do vento: ${dados.wind.speed} m/s`);
    animarTexto(sensacao, `Sensação térmica: ${dados.main.feels_like} °C`);
    icone.setAttribute("src", `http://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`);
  }, 700);
}


