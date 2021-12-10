const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.00005;
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
        
    }
    update(delta,barElements){
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        this.velocity += VELOCITY_INCREASE;
        const rect = this.rect();

        if(rect.bottom >= window.innerHeight || rect.top <= 0){
            this.direction.y *= -1;
        }
        if(barElements.some(r => isCollision(r,rect))){
            this.direction.x *= -1;
        }
    }
}

function getRandomNumberBetween(min , max){
    return Math.random() * (max-min) + min;
}

function isCollision(rect1, rect2){
    return (
        (rect2.left <= rect1.right) && 
        (rect1.left <= rect2.right) &&
        (rect1.top <= rect2.bottom) &&
        (rect1.bottom >= rect2.top)
        )
}