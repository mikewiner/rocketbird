const particleArray = [];

class Particle {
    constructor(){
        this.x = bird.x;
        this.y = bird.y+6;
        this.size = Math.random() * 7 + 3;
        this.speedY = (Math.random() * 1) - 0.5;
        this.color = 'hsla(' + hue + ', 100%, 50%, 0.8)';
        //this.color = "#654321"
    }
    update() {
        this.x -= gameSpeed;
        this.y += this.speedY;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

}

const handleParticles = () => {
    particleArray.unshift(new Particle)
    for(i=0; i<particleArray.length; i++){
        particleArray[i].update();
        particleArray[i].draw();
    }

    if (particleArray.length > 200){
        for(i=0; i<20;i++){
            particleArray.pop(particleArray[i]);
        }
    }
}
