const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0; 
let hue = 0;
let frame = 0; 
let score = 0;
let gameSpeed = 2;

const gradient = ctx.createLinearGradient(0,0,0,70);
gradient.addColorStop('0.4', '#fff')
gradient.addColorStop('0.5', '#000')
gradient.addColorStop('0.55', '#4040ff')
gradient.addColorStop('0.6', '#000')
gradient.addColorStop('0.9', '#fff')

const background = new Image();
background.src = './images/background.png';
const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width+2,
    height: canvas.height
}   

function handleBackground(){
    if (BG.x1 <= -BG.width + gameSpeed) BG.x1 = BG.width-5;
    else BG.x1 -= gameSpeed;
    //console.log ('hi')
    if(BG.x2 <= -BG.width + gameSpeed) BG.x2 = BG.width-5;
    else BG.x2 -= gameSpeed;
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height)
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height)
}


temp = canvas.height - 60;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    handleBackground();
    handleParticles();
    handleObstacles();
    bird.update();
    bird.draw();
    
    ctx.fillStyle = gradient;
    ctx.font= '90px Georgia'
    ctx.strokeText(score, 450, 70) 
    ctx.fillText(score, 450, 70)
    
    handleCollisions();

    if(handleCollisions()){
        //openForm();
        document.getElementById("scoreDisplay").innerHTML = score;
        document.getElementById("score").value = score;
        console.log(score)

        return;
    }

    requestAnimationFrame(animate);
    angle+= 0.12;
    hue++;
    frame++;
    
}

animate();

window.addEventListener('keydown', e => {
    console.log(e.code)
    if(e.code === 'Space') spacePressed = true;

})

window.addEventListener('keyup', e => {
    if(e.code === 'Space') spacePressed = false;
})


const bang = new Image();
bang.src = './images/bang.png'
function handleCollisions(){
    for (i=0;i<obstaclesArray.length; i++){
        if(bird.x < obstaclesArray[i].x + obstaclesArray[i].width && 
            bird.x + bird.width > obstaclesArray[i].x &&
            ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0 || bird.y > canvas.height - obstaclesArray[i].bottom &&
            bird.y + bird.height < canvas.height))){
            //collision
                ctx.drawImage(bang, bird.x, bird.y, 50, 50);
                ctx.font = '20px Georgia';
                ctx.fillStyle = 'white';
                ctx.fillText('Game Over you just shit all over yourself! Your score is ' + score, 30, canvas.height/2 - 0);
                return true;
            }
    }
}



// Form Javascript

function openForm() {
    document.getElementById("myForm").style.display = "block";
}
  
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function sendScore() {
    document.getElementById("scoreForm").style.display = "block";
}
  
function closeSendScore() {
    document.getElementById("scoreForm").style.display = "none";
}

var modal = document.getElementById("myModal");


//Modal Javascript
// Get the button that opens the modal 

fetch('https://secure-dawn-20819.herokuapp.com/scores2')
  .then(response => response.json())
  .then(highScores => {
      console.log(highScores)
      for(i=0; i<highScores.length; i++){

        let tableRef = document.getElementById('high-score-table');
        // Insert a row at the end of the table
        let newRow = tableRef.insertRow(-1);
        // Insert a cell in the row at index 0
        let newScore = newRow.insertCell(0);
        let newName = newRow.insertCell(1);

        // Append a text node to the cell
        let newScoreText = document.createTextNode(highScores[i].score);
        let newNameText = document.createTextNode(highScores[i].name);
        newScore.appendChild(newScoreText);
        newName.appendChild(newNameText);
        
      }

    })
  .catch(error => {
      hsError = error;  
      console.error('Error:', error);
    });


const submitScore = () => {

}

var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}