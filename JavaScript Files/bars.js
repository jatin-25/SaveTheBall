export default class Bar{
    constructor(BarElem){
        this.BarElem = BarElem;
        this.reset();
    }

    rect(){
        return this.BarElem.getBoundingClientRect();
    }

    get position(){
        return parseFloat(getComputedStyle(this.BarElem).getPropertyValue("--position"));
    }

    set position(value){
        this.BarElem.style.setProperty("--position",value);
    }

    reset(){
        this.position = 50;
    }
    update(delta, ballHeight){
        this.position = ballHeight;
    }

}