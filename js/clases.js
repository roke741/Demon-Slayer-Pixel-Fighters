//creamos clase para los jugadores
class Sprite{
    constructor({posicion, imageSrc, scale=1, framesMax=1, offset={ x:0, y:0 },}){
        this.posicion = posicion;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        //velocidad del frame
        this.framesElapsed = 0;
        this.framesHold = 5;//velocidad de la animacion
        this.offset = offset;
    }
    //dibujar
    draw(){
        //dibuja el sprite(animacion de un frame)
        c.drawImage(
            this.image,
            //animacion de un frame
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax, 
            this.image.height, 
            this.posicion.x - this.offset.x, 
            this.posicion.y - this.offset.y, 
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale
        );
    }
    //animacion de frames
    animateFrame(){
        this.framesElapsed++;
        if(this.framesElapsed % this.framesHold === 0){
            if(this.framesCurrent < this.framesMax-1){
                this.framesCurrent++;
            }else{
                this.framesCurrent = 0;
            }
        }
    }
    //moverse
    update(){
        this.draw();
        this.animateFrame();
    }
}
//creamos clase para los jugadores
class Fighter extends Sprite{
    constructor({posicion, velocidad, imageSrc, scale=1, framesMax=1, offset={ x:0, y:0 },sprites, attackBox = {offset:{}, width: undefined, height: undefined}}){
        super({posicion, imageSrc, scale, framesMax, offset});
        
        this.velocidad = velocidad;
        this.lastKey
        this.width = 50;
        this.height = 150;
        //ataque
        this.attackBox = {
            posicion:{
                x: this.posicion.x,
                y: this.posicion.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        //this.color = color;
        this.isAttacking
        this.vida = 100;
        //frames
        this.framesCurrent = 0;
        //velocidad del frame
        this.framesElapsed = 0;
        this.framesHold = 5;//velocidad de la animacion
        this.sprites = sprites;
        this.dead = false;

        for(const sprite in this.sprites){
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;
        }
    }
    //moverse
    update(){
        this.draw();
        if(!this.dead){
            this.animateFrame();
        }
        //caja de ataque
        this.attackBox.posicion.x = this.posicion.x + this.attackBox.offset.x;
        this.attackBox.posicion.y = this.posicion.y + this.attackBox.offset.y;

        //dibujamos la caja de ataque
        /*c.fillRect(
            this.attackBox.posicion.x,
            this.attackBox.posicion.y,
            this.attackBox.width,
            this.attackBox.height
        )*/

        this.posicion.x += this.velocidad.x;
        this.posicion.y += this.velocidad.y;
        //detectar colisiones con el suelo  y colocar jugares en el suelo(50 es la altura sobre el suelo)
        //funcion gravedad
        if(this.posicion.y + this.height + this.velocidad.y >= canvas.height - 50){
            this.velocidad.y = 0;
            this.posicion.y = 376;
        }else{
            this.velocidad.y += gravedad;
        }
    }

    //ataque
    attack(){
        this.switchSprite('attack1');
        this.isAttacking = true;
    }

    takeHit(){
        //this.switchSprite('takeHit');
        this.vida -= 10;

        if(this.vida <= 0){
            this.switchSprite('death');
        }else {
            this.switchSprite('takeHit');
           
        }
    }

    switchSprite(sprite){
        if(this.image === this.sprites.death.image) {
            if(this.framesCurrent === this.sprites.death.framesMax - 1)
                this.dead = true;
            return
        }
        // anulando todas las demás animaciones con la animación de ataque
        if(this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax -1) return
        
        // Anular cuando el luchador es golpeado
        if(this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax -1) return


        switch(sprite){
            case 'idle':
                if(this.image !== this.sprites.idle.image){
                    this.image = this.sprites.idle.image;
                    this.framesMax = this.sprites.idle.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'run':
                if(this.image !== this.sprites.run.image){
                    this.image = this.sprites.run.image;
                    this.framesMax = this.sprites.run.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'jump':
                if(this.image !== this.sprites.jump.image){
                    this.image = this.sprites.jump.image;
                    this.framesMax = this.sprites.jump.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'fall':
                if(this.image !== this.sprites.fall.image){
                    this.image = this.sprites.fall.image;
                    this.framesMax = this.sprites.fall.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'attack1':
                if(this.image !== this.sprites.attack1.image){
                    this.image = this.sprites.attack1.image;
                    this.framesMax = this.sprites.attack1.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'takeHit':
                if(this.image !== this.sprites.takeHit.image){
                    this.image = this.sprites.takeHit.image;
                    this.framesMax = this.sprites.takeHit.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'death':
                if(this.image !== this.sprites.death.image){
                    this.image = this.sprites.death.image;
                    this.framesMax = this.sprites.death.framesMax;
                    this.framesCurrent = 0;
                    console.log('f')
                }
                break;
        }
    }
}