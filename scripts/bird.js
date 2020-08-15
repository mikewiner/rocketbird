const sprite = new Image();
sprite.src = './images/bart-vector-nobg.png'
class Bird {
    constructor(){
        this.x = 150;
        this.y = 100;
        this.vy = 0;
        this.originalWidth = 331;
        this.originalHeight = 217;
        this.width = this.originalWidth/7;
        this.height = this.originalHeight/7;
        this.weight = 1;
    }
    update(){
        let curve = Math.sin(angle) * 20;
        if (this.y > canvas.height - this.height*2.3 + curve){
            //console.log(this.y)
            this.y =  canvas.height - this.height*2.3 + curve;
            this.vy = 0;
        } else {
            this.vy += this.weight*0.5;
            this.vy *= 0.83;
            this.y += this.vy;
        }
        if(this.y < 0 + this.height) {
            this.y = 0 + this.height;
            this.vy = 0;
        }

        if(spacePressed && this.y > this.height) this.flap();
        
        this.vy += this.weight;
        this.y += this.vy;
    }
    draw() {
        ctx.fillStyle = 'red';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(sprite, 0,0, this.originalWidth, this.originalHeight, this.x-20, this.y-7, this.width*1.7, this.height*1.7)
        //ctx.fillRect(30, 30, 60, 60);
    }
    flap() {
        this.vy -= 2;
    }
}

const bird = new Bird();