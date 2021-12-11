import Ball from "./ball.js";
import Bar from "./bars.js";
const SPEED = 5;
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

        isLost();
    }
    lastTime = time;
    window.requestAnimationFrame(update);
    const rect = ball.rect();
    var windowHeight = window.innerHeight;
    document.addEventListener("mousemove", e=> {
        playerBar.position = (e.x / windowHeight) * 100;
    })

    function isLost(){
        const rect = ball.rect();
        if(rect.bottom >= innerHeight){
            computerScore.textContent = parseInt(computerScore.textContent)+1;
            ball.reset();
            playerBar.reset();
            computerBar.reset();
        }
        else if(rect.top <= 0){
            playerScore.textContent = parseInt(playerScore.textContent)+1;
            ball.reset();
            playerBar.reset();
            computerBar.reset();
        }
    }

}

window.requestAnimationFrame(update);