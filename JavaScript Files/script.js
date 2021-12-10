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
        ball.update(delta,[playerBar.rect(),computerBar.rect()]);
        computerBar.update(delta,ball.y);

        if (isLose()) handleLose()
    }
    lastTime = time;
    window.requestAnimationFrame(update);


    document.addEventListener("mousemove", e=> {
        playerBar.position = (e.y / window.innerHeight) * 100;
    })

    function isLose(){
        const rect = ball.rect();
        return (rect.right >= innerWidth || rect.left <= 0)
    }

    function handleLose(){
        ball.reset();
        playerBar.reset();
        computerBar.reset();

        const rect = ball.rect();

        if(rect.right >= innerWidth){
            playerScore.textContent = parseInt(playerScore.textContent)+1;
        }
        else{
            computerScore.textContent = parseInt(computerScore.textContent)+1;
        }
    }
}

window.requestAnimationFrame(update);