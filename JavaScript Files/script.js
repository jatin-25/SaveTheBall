import Ball from "./ball.js";
import Bar from "./bars.js";

const ball = new Ball(document.getElementById("ball"));
const playerBar = new Bar(document.getElementById("player-bar"))
const computerBar = new Bar(document.getElementById("computer-bar"))
const playerScore = document.getElementById("player-score")
const computerScore = document.getElementById("computer-score")

let lastTime;
function update(time){
    if(lastTime != null){
        const delta = time-lastTime;
        ball.update(delta,[playerBar.rect(),computerBar.rect()],[playerScore,computerScore]);
        computerBar.update(ball.x);

        if (isLose()) handleLose()
    }
    lastTime = time;
    window.requestAnimationFrame(update);

    var windowHeight = window.innerHeight;
    document.addEventListener("mousemove", e=> {
        playerBar.position = (e.x / windowHeight) * 100;
    })

    function isLose(){
        const rect = ball.rect();
        return (rect.bottom >= innerHeight || rect.top <= 0)
    }

    function handleLose(){
       
        const rect = ball.rect();
        if(rect.bottom > window.innerHeight){
            computerScore.textContent = parseInt(computerScore.textContent)+1;
        }
        else{
            playerScore.textContent = parseInt(playerScore.textContent)+1;
        }
        ball.reset();
        playerBar.reset();
        computerBar.reset();

        

       
    }
}

window.requestAnimationFrame(update);