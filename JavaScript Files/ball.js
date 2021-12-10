const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.00007;
export default class Ball{
    constructor(ballElement){
        this.ballElement = ballElement;
        this.reset();
    }

    rect(){
        return this.ballElement.getBoundingClientRect();
    }

    get x(){
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--x"));
    }

    set x(value){
        this.ballElement.style.setProperty("--x",value);
    }
    get y(){
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--y"));
    }

    set y(value){
        this.ballElement.style.setProperty("--y",value);
    }

    reset(){
        this.x = 50;
        this.y = 50;
        this.direction = { x:0}
        while(Math.abs(this.direction.x <= 0.2) || Math.abs(this.direction.x >= 0.9)){
            const heading = getRandomNumberBetween(0, 2 * Math.PI);
            this.direction = { x: Math.cos(heading), y:Math.sin(heading)};
        }
        this.velocity = INITIAL_VELOCITY;
        this.lastIncreaseInX = 0;
        this.lastIncreaseInY = 0;
    }
    update(delta,barElements,scores){
        if(this.lastIncrease>this.direction.x * this.velocity * delta){
            this.x += this.lastIncreaseInX;
            this.y += this.lastIncreaseInY;
        }
        else{
            this.x += this.direction.x * this.velocity * delta;
            this.y += this.direction.y * this.velocity * delta;
        }
        this.velocity += VELOCITY_INCREASE;
        this.lastIncreaseInX =  this.direction.x * this.velocity * delta; 
        this.lastIncreaseInY =  this.direction.y * this.velocity * delta; 
        const rect = this.rect();
        var windowWidth = window.innerWidth;
        if(rect.right >= windowWidth || rect.left <= 0){
            this.direction.x *= -1;
        }
        if(barElements.some(r => isCollision(r,rect))){
            

            this.direction.y *= -1;
            if(barElements[0].top < rect.bottom){
                scores[0].textContent = parseInt(scores[0].textContent)+1;
            }
            else{
                scores[1].textContent = parseInt(scores[1].textContent)+1;
            }
        }
    }
}

function getRandomNumberBetween(min , max){
    return Math.random() * (max-min) + min;
}

function isCollision(rect1, rect2){
    return (
        (rect2.top < rect1.bottom) && 
        (rect1.top < rect2.bottom) &&
        (rect1.left < rect2.left) &&
        (rect1.right > rect2.left)
        )
}