let intentos = 6;
let diccionario = ['COCOS', 'PERRO', 'CIELO', 'MANGA', 'BOTON', 'TORTA', 'CASCO', 'CIEGA', 'CESTA', 'ROBLE'];
const button = document.getElementById("guess-button");
const input = document.getElementById("guess-input");
const GRID = document.getElementById("grid");
const ROW = document.createElement('div');
const palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
ROW.className = 'row';

button.addEventListener("click", intentar);

window.addEventListener('load', init);

function init(){
    console.log(palabra);
}

function intentar(){
    const INTENTO = leerIntento();
    const errorMensaje = document.getElementById('error-message');
    if (INTENTO.length !== 5) {
        errorMensaje.textContent = "La palabra introducida debe tener 5 letras.";
        return;
    }
    errorMensaje.textContent = "";
    if (INTENTO === palabra ) {
        terminar("<h1>¡GANASTE!😀</h1>");
        const nuevaFila = document.createElement('div');
        nuevaFila.className = 'row';
        for (let i = 0; i < palabra.length; i++){
            const SPAN = document.createElement('span');
            SPAN.className = 'letter';
            SPAN.innerHTML = palabra[i];
            SPAN.style.backgroundColor = "#79b851";
            nuevaFila.appendChild(SPAN);
        }
        GRID.appendChild(nuevaFila);
        return;
    }
    const nuevaFila = document.createElement('div');
    nuevaFila.className = 'row';
    const letrasCorrectas = new Set();
    const letrasEnPalabra = new Set();
    for (let i = 0; i < palabra.length; i++){
        if (INTENTO[i] === palabra[i]){
            letrasCorrectas.add(i);
        }
        letrasEnPalabra.add(palabra[i]);
    }
    for (let i = 0; i < palabra.length; i++){
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (letrasCorrectas.has(i)){
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "#79b851";
        } else if( letrasEnPalabra.has(INTENTO[i]) ) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "#f3c237";
        } else {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "#a4aec4";
        }
        nuevaFila.appendChild(SPAN);
    }
    GRID.appendChild(nuevaFila);
    intentos--;
    if (intentos === 0){
        console.log("PERDISTE!");
        terminar("<h1>¡PERDISTE!😖</h1>");
    }
}

function leerIntento(){
    let intento = input.value;
    intento = intento.toUpperCase(); 
    return intento;
}

function terminar(mensaje){
    input.disabled = true;
    button.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}
