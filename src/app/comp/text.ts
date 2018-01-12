import * as PIXI from 'pixi.js';



export class Text extends PIXI.Text{
  

    public time: string = "hello";
    // app: any;
    // rendererPixi;
    // stage;
    // compLength: number = 256;
    // compHeight: number = 256;
    // container;
    dText: string = "Firefighter";

  
    constructor() {
        super();
        this.text = this.dText;
        this.x = 50;
        this.y = 50;

        this.interactive = true;
        this.buttonMode = true;

        this.on('pointerdown', this.onDragStart)
         .on('pointerup', this.onDragEnd)
         .on('pointerupoutside', this.onDragEnd)
         .on('pointertap', this.onPointerUpOutside)
         .on('pointermove', this.onDragMove);
    }

    onPointerUpOutside(event) {
        console.log("**************Pointer UP outside***************");

    }


    onDragStart(event) {
        this.data = event.data;
        this.dragging = true;
        this.offsetStart = true;
    }

    onDragEnd() {
        this.dragging = false;
        this.data = null;
    }

    onDragMove() {
    if (this.dragging) {
        
        if(this.offsetStart == true){
            this.xOffset = this.x - this.data.getLocalPosition(this.parent).x;
            this.yOffset = this.y - this.data.getLocalPosition(this.parent).y;
            this.offsetStart = false;
        }

        var newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x + this.xOffset;
        this.y = newPosition.y + this.yOffset;
    }
    }
}