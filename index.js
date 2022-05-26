
var sound = new Howl({
    src: ['assets/music/demonslayer (6).webm'],
    loop: true,
    volume: 1.0,
    onend: function () {
        console.log('Finished!');
    }
   
});
sound.play()

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);
//gravedad
const gravedad = 0.5;
//fondo de pantalla
const background = new Sprite({
    posicion: {
        x: 0,
        y: 0
    },
    imageSrc: './assets/fondo/GlicinasKimetsunoYaiba1.jpg',
});

//animacion
const shop = new Sprite({
    posicion: {
        x: 410,
        y: 100
    },
    imageSrc: './assets/fondo/shop.png',
    scale: 2,
    framesMax:6
});

//creamos el objeto jugador y luego lo dibujamos
const jugador = new Fighter({
    posicion: {
        x:150,
        y:0,
    },
    velocidad: {
        x:0,
        y:0,
    },
    offset: {
        x:0,
        y:0,
    },
    imageSrc: './assets/rengoku/Idle-Rk.png',
    framesMax: 8,
    scale: 3,
    offset: {
        x: 270,
        y: 250,
    },
    sprites: {
        idle:{
            imageSrc: './assets/rengoku/Idle-Rk.png',
            framesMax: 8
        },
        run:{
            imageSrc: './assets/rengoku/Run-Rk.png',
            framesMax: 8
        },
        jump:{
            imageSrc: './assets/rengoku/Jump-Rk.png',
            framesMax: 2
        },
        fall:{
            imageSrc: './assets/rengoku/Fall-Rk.png',
            framesMax: 2
        },
        attack1:{
            imageSrc: './assets/rengoku/Attack1-Rk.png',
            framesMax: 6
        },
        takeHit:{
            imageSrc: './assets/rengoku/Take-Hit-Rk-white.png',
            framesMax: 4
        },
        death:{
            imageSrc: './assets/rengoku/Death-Rk.png',
            framesMax: 6
        }
    },
    attackBox:{
        offset:{
            x:90,
            y:5,
        },
        width:135,
        height:30,
    }

});

//jugador.draw();
//creamos el objeto enemigos y luego lo dibujamos
const enemigo = new Fighter({
    posicion: {
        x:700,
        y:0,
    },
    velocidad: {
        x:0,
        y:0,
    },
    offset: {
        x:-50,
        y:0,
    },
    imageSrc: './assets/tanjiro/Idle-Tj.png',
    framesMax: 4,
    scale: 3,
    offset: {
        x: 270,
        y: 265,
    },
    sprites:{
        idle:{
            imageSrc: './assets/tanjiro/Idle-Tj.png',
            framesMax: 4
        },
        run:{
            imageSrc: './assets/tanjiro/Run-Tj.png',
            framesMax: 8
        },
        jump:{
            imageSrc: './assets/tanjiro/Jump-Tj.png',
            framesMax: 2
        },
        fall:{
            imageSrc: './assets/tanjiro/Fall-Tj.png',
            framesMax: 2
        },
        attack1:{
            imageSrc: './assets/tanjiro/Attack1-Tj.png',
            framesMax: 4
        },
        takeHit:{
            imageSrc: './assets/tanjiro/Take-hit-Tj.png',
            framesMax: 3
        },
        death:{
            imageSrc: './assets/tanjiro/Death-Tj.png',
            framesMax: 7
        },
    },
    attackBox:{
        offset:{
            x:-160,
            y: 15,
        },
        width:130,
        height:30,
    }

});

//enemigo.draw();
//solucinar problemas al mover jugador con el teclado precionado y teclas
const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
};

decrementoTemporizador();
//funcion para la animacion
function animacion(){
    window.requestAnimationFrame(animacion);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    //dibujamos el fondo
    background.update();
    //dibujamos la tienda
    shop.update();

    jugador.update();
    enemigo.update();

    //moverse si se preciona la tecla ->jugador
    jugador.velocidad.x=0;

    if(keys.a.pressed && jugador.lastKey === 'a'){
        jugador.velocidad.x = -5;
        jugador.switchSprite('run');
    }else if(keys.d.pressed && jugador.lastKey === 'd'){
        jugador.velocidad.x = 5;
        jugador.switchSprite('run');
    }else{
        jugador.switchSprite('idle');
    }
    //animacion saltar 
    if(jugador.velocidad.y < 0){
        jugador.switchSprite('jump');
    }else if(jugador.velocidad.y > 0){
        jugador.switchSprite('fall');
    }
    


    //moverse si se preciona la tecla ->enemigo
    enemigo.velocidad.x=0;

    if(keys.ArrowLeft.pressed && enemigo.lastKey === 'ArrowLeft'){
        enemigo.velocidad.x = -5;
        enemigo.switchSprite('run');
    }else if(keys.ArrowRight.pressed && enemigo.lastKey === 'ArrowRight'){
        enemigo.velocidad.x = 5;
        enemigo.switchSprite('run');
    }else{
        enemigo.switchSprite('idle');

    }
    //animacion saltar 
    if(enemigo.velocidad.y < 0){
        enemigo.switchSprite('jump');
    }else if(enemigo.velocidad.y > 0){
        enemigo.switchSprite('fall');
    }


    //detectamos colisiones jugador y ataques
    if (
        rectangularCollision({
            rectangulo1: jugador,
            rectangulo2: enemigo
        }) && jugador.isAttacking && jugador.framesCurrent === 4){
        enemigo.takeHit();
        jugador.isAttacking = false;
        //enemigo.vida -= 10;
        //document.querySelector('#vidaEnemigo').style.width = enemigo.vida + '%';
        gsap.to('#vidaEnemigo',{
            width: enemigo.vida + '%',
        })
        console.log('colision con enemigo');
    }
    //si el jugador falla:
    if(jugador.isAttacking && jugador.framesCurrent === 4){
        jugador.isAttacking = false
    }


    //detectamos colisiones enemigo y ataques
    if (
        rectangularCollision({
            rectangulo1: enemigo,
            rectangulo2: jugador
        }) && enemigo.isAttacking && enemigo.framesCurrent === 2){
        jugador.takeHit();
        enemigo.isAttacking = false;
        //jugador.vida -= 10;
        //document.querySelector('#vidaJugador').style.width = jugador.vida + '%';
        gsap.to('#vidaJugador',{
            width: jugador.vida + '%',
        })
        console.log('colision con jugador');
    }
    //si el enemigo falla:
    if(enemigo.isAttacking && enemigo.framesCurrent === 2){
        enemigo.isAttacking = false
    }

    //final del juego en base a la vida
    if(enemigo.vida <= 0 || jugador.vida <= 0){
        determinarGanador({jugador, enemigo, temporizadorId});
    }
}

animacion()

//detectamos eventos del teclado
window.addEventListener('keydown', (event)=>{
    if(!jugador.dead){
        switch(event.key){
            //detectar tecla d -> derecha
            case 'd':
                keys.d.pressed = true;
                jugador.lastKey = 'd';
                break;
            //detectar tecla a -> izquierda
            case 'a':
                keys.a.pressed = true;
                jugador.lastKey = 'a';
                break;
            //detectar tecla w -> saltar
            case 'w':
                jugador.velocidad.y = -15;
                break;
            //ataque
            case ' ':
                jugador.attack();
                break;
        }
    }

    if(!enemigo.dead){
        switch(event.key){
            //detectar movimientos de enemigo
            //detectar tecla ArrowRight -> derecha
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                enemigo.lastKey = 'ArrowRight';
                break;
            //detectar tecla ArrowLeft -> izquierda
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                enemigo.lastKey = 'ArrowLeft';
                break;
            //detectar tecla ArrowUp -> saltar
            case 'ArrowUp':
                enemigo.velocidad.y = -15;
                break;
            //ataque
            case 'ArrowDown':
                enemigo.attack();
                //enemigo.isAttacking = true;
                break;
        }
    }
})
//detectamos cuando soltamos la tecla
window.addEventListener('keyup', (event)=>{
    //detectar teclas jugador
    switch(event.key){
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }

    //detectar teclas enemigo
    switch(event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
})