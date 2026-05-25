/* =========================
   CONTADOR ANIMADO
========================= */

let contador = document.getElementById("contador");

let numero = 0;

function aumentarContador() {

  if (numero < 1000) {

    numero += 10;

    contador.innerHTML = numero;

  }

}

setInterval(aumentarContador, 50);


/* =========================
   MAPA INTERATIVO
========================= */

const map = L.map('map').setView([-15.7801, -47.9292], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

  attribution: '&copy; OpenStreetMap contributors'

}).addTo(map);


/* LOCALIZAÇÕES */

const campo = L.marker([-15.7801, -47.9292]).addTo(map)

  .bindPopup('🌱 Produção agrícola');


const cidade = L.marker([-23.55052, -46.633308]).addTo(map)

  .bindPopup('🏙️ Centro urbano');


/* LINHA DE CONEXÃO */

const linha = L.polyline([

  [-15.7801, -47.9292],
  [-23.55052, -46.633308]

], {

  color: 'green',
  weight: 5

}).addTo(map);