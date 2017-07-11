// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
var grilla2 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
// Ac&aacute; vamos a ir guardando la posición vacía
var posicionVacia = {
  fila:2,
  columna:2
};

// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
function chequearSiGano(){

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {

        if (grilla[i][j]==grilla2[i][j]) {
        }
        else {
          return false;
        }
    }
  }
  return true;
}



// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
function mostrarCartelGanador(){
  if(chequearSiGano()){
    alert("¡FELICITACIONES! GANASTE! Y ESO QUE TE LO HABIA PUESTO BIEN DIFICIL, VOS SI QUE SABES JUGAR  :)");
  }
}
// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2){
  console.log(fila1, columna1, fila2, columna2)
var a= grilla[fila1][columna1];
var b = grilla[fila2][columna2];
grilla[fila1][columna1]=b;
grilla[fila2][columna2]=a;
var fichas1 = document.getElementById(""+a);
var fichas2 = document.getElementById(""+b);
var clon = fichas1.cloneNode(true);
var clon2 = fichas2.cloneNode(true);
var juego = fichas2.parentNode;
juego.replaceChild(clon2, fichas1);
juego.replaceChild(clon, fichas2);
}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna){
//grilla[nuevaFila][nuevaColumna];
posicionVacia.fila=nuevaFila;
posicionVacia.columna=nuevaColumna;
  // juego.replaceChild(fichas1, fichas2);
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna){
  if(fila>2||fila<0){
    return false;
  }
  else if(columna>2|| columna<0){
    return false;
  }
  else{
    return true;
  }
}

// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
function moverEnDireccion(direccion){
// while (chequearSiGano()) {

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 40){
    nuevaFilaPiezaVacia = posicionVacia.fila-1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = posicionVacia.fila+1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;

  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 39) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna-1;
  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 37) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna+1;
  }

  // Se chequea si la nueva posición es válida, si lo es, se intercambia
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }
// }
}



// Extras, ya vienen dadas

function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    moverEnDireccion(evento.which);
    var cont=0;
    var gano = chequearSiGano();
    if(gano){
      setTimeout(function(){
        mostrarCartelGanador();
      },500);
    }
    evento.preventDefault();
  })
}

function iniciar(){
  mezclarPiezas(80);
  capturarTeclas();
}


iniciar();
