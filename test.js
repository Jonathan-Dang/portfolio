/* Obtain canvas objects #1 and #2*/

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

/**
 * Symbol object
 * PARAM X: x co-ordinate of symbol
 * PARAM Y: y co-ordinate of symbol
 * PARAM fontSize: font-size of symbol [Assumed to be char]
 * PARAM canvasHeight: Height of the given canvas [Assumed to be container]
 */
class Symbol {
    constructor(x, y, fontSize, canvasHeight){
        /* Characters to cover canvas*/
        this.characters = '01010101000111110001010101110001110000011000100001ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678900101010001110001000100111111000100001001abcdefghijklmnopqrstuvwxyz0123456789';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.canvasHeight = canvasHeight;
    }

    /**
     * DRAW : draws our symbol
     * @param {*} context 
     * @param {*} context2 
     */
    draw(context, context2){
        //Set random character to text
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        //NOTE: x needs to be added by a constant to center
        //Draws "context1"
        context.fillText(this.text, this.x * this.fontSize + 7, this.y * this.fontSize);
        //Draws "context2"
        context2.fillText(this.text, this.x * this.fontSize + 7, this.y * this.fontSize);
        //"falling" manager
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.97){
            //Start off screen
            this.y = -1;
        }
        else {
            this.y += 0.9;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight){
        this.fontSize = 16;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
    #initialize(){
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }
    //Resize used only in display changes
    resize(width, height){
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
}
const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 26;
const nextFrame = 1000/fps;
let timer = 0;

function animate(timeStamp){
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame){
        //CTX is the trail
        ctx.textAlign = "center";
        //why .fillstyle 3x?

        //This fillstyle contains alpha value of black.
        //Higher alpha value, more invisible the background is. 
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = effect.fontSize + 'px monospace';
        //This fillstyle contains the after glow stage 2.
        ctx.fillStyle = '#03A062';

        //This fillstyle contains the after glow stage 1.
        ctx.fillStyle = '#0aff0a';
        ctx.opacity = '0';

        //Leader symbol. CTX2 falls first
        ctx2.textAlign = "center";
        ctx2.clearRect(0, 0, canvas.width, canvas.height);
        ctx2.font = effect.fontSize + 'px monospace';
        ctx2.fillStyle = 'white';

        effect.symbols.forEach(symbol => symbol.draw(ctx, ctx2));
        timer = 0;
    } else {
        timer += deltaTime;
    }
    requestAnimationFrame(animate);
}
animate(0);

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
})