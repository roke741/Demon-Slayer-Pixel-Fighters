//let lastKey
//bloque de colisiones
function rectangularCollision({rectangulo1, rectangulo2}){
    return (
        rectangulo1.attackBox.posicion.x + rectangulo1.attackBox.width >= 
            rectangulo2.posicion.x && 
        rectangulo1.attackBox.posicion.x <= 
            rectangulo2.posicion.x + rectangulo2.width && 
        rectangulo1.attackBox.posicion.y + rectangulo1.attackBox.height >= 
            rectangulo2.posicion.y && 
        rectangulo1.attackBox.posicion.y <= rectangulo2.posicion.y + rectangulo2.height 
    )
}

function determinarGanador({jugador, enemigo, temporizadorId}){
    clearTimeout(temporizadorId);
    document.querySelector('#textoPantalla').style.display = 'flex';
    document.querySelector('#background').style.display = 'flex';
    if(jugador.vida === enemigo.vida){
        document.querySelector('#textoPantalla').innerHTML = 'EMPATE';
    } else if(jugador.vida > enemigo.vida){
        document.querySelector('#textoPantalla').innerHTML = 'GANASTE JUGADOR 1';
        //document.querySelector('#textoPantalla').style.display = 'flex'
    } else if(jugador.vida < enemigo.vida){
        document.querySelector('#textoPantalla').innerHTML = 'GANASTE JUGADOR 2';
        //document.querySelector('#textoPantalla').style.display = 'flex'
    }
}

//tiempo del temporizador
let temporizador = 90;
let temporizadorId
function decrementoTemporizador(){
    if(temporizador > 0){
        temporizadorId = setTimeout(decrementoTemporizador, 1000);
        temporizador--;
        document.querySelector('#temporizador').innerHTML = temporizador;
    }
    if(temporizador === 0){
        determinarGanador({jugador, enemigo});
    }
}