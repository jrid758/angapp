import * as PIXI from 'pixi.js';
import * as _ from 'underscore';
import { ObjectService } from '../object.service';
import {Observable} from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import { CompileStylesheetMetadata } from '@angular/compiler';
import { CompService } from '../comp.service';
import { Component } from '@angular/core';


@Component({
    providers: [CompService]
  })


export class Text2 extends PIXI.Text {
    height: number;
    width: number;
    parent: any;
    yOffset: number;
    xOffset: number;
    offsetStart: boolean;
    dragging: boolean;
    data: any;
    on: any;
    buttonMode: boolean;
    y: number;
    x: number;
    text: string;
    interactive: boolean;
    name: string;
    //private clickedOn: Observable<string>;
    //public Oclicked = new Subject<string>();


    public time: string = "hello";
    // app: any;
    // rendererPixi;
    // stage;
    // compLength: number = 256;
    // compHeight: number = 256;
    // container;
    //dText: string = "Firefighter";

//     private _objectService;


//   constructor(objectService: ObjectService, private _compservice: CompService) {
//     this._objectService = objectService;
//     //this.objects = [];
//   }

    //private _compservice;

    constructor(xHeight, yWidth, x, y, style, text, name, private _compService: CompService, private _objectservice: ObjectService) {
        super(text,style);
        console.log("&&&&&&&&&&&&&&&&&&&ServiceProp: " + _compService.comp.timeLength);
        this.name = name;
        //this.text = this.dText;
        console.log("Test is empty: " + x + _.isNumber(x) + " " + y + _.isNumber(y));
        if(!_.isNumber(x) && !_.isNumber(y)) {
            this.x = (xHeight/2) - (this.width/2);
            this.y = (yWidth/2) - (this.height/2);
        } else {
            this.x = x;
            this.y = y;
        }

        this.interactive = true;
        this.buttonMode = true;

        this.on('pointerdown', this.onDragStart)
         .on('pointerup', this.onDragEnd)
         .on('pointerupoutside', this.onDragEnd)
         .on('pointertap', this.onPointerUpOutside)
         .on('pointermove', this.onDragMove)
         .on('pointerover', this.onPointerOver);

         this.data = new Observable(observer => {});

    }

    onPointerOver(event) {
        this.data = event.data;
        console.log("OVER LAYER: " + this.name);
        // if(!_.isNull(this._compService.comp.selected)) {
        //     console.log("WHATS POINTER OVER: " + this.pointerOverSelected());
        //     console.log("Is Current Selected: " + this.isCurrentSelected());
        //     if(this.pointerOverSelected() && this.isCurrentSelected()) {
        //         console.log("***********First***********");
        //         this.interactive = true;
        //         this.buttonMode = true;
                
        //     } else if ( !this.pointerOverSelected() && this.pointerOverNonSelected()) {
        //         console.log("***********Second***********");
        //         this.interactive = true;
        //         this.buttonMode = true;
           
        //     } else if(_.isNull(this._compService.comp.selected)) {
        //         console.log("***********Third***********");
        //         this.interactive = true;
        //         this.buttonMode = true;
        //     } else {
        //         console.log("***********Forth***********");
        //         this.interactive = false;
        //         this.buttonMode = false;
        //     }

        // } else {
        //     console.log("***********Fith***********");
        //     //this._compService.setSelectedByName(this.name);
        // }
    }

    onPointerUpOutside(event) {
        console.log("**************Pointer UP outside***************");

    }


    onDragStart(event) {
        this.data = event.data;
        this._compService.setSelectedByName(this.name);
        // if(_.isNull(this._compService.comp.selected)) {
        //     this._compService.setSelectedByName(this.name);
        // }

        // if(!_.isNull(this._compService.comp.selected)) {
        //     console.log("WHATS POINTER OVER: " + this.pointerOverSelected());
        //     console.log("Is Current Selected: " + this.isCurrentSelected());
        //     if(this.pointerOverSelected() && this.isCurrentSelected()) {
        //         console.log("***********First***********");
        //         this.interactive = true;
        //         this.buttonMode = true;
        //         this._compService.setSelectedByName(this.name);
                
        //     } else if ( !this.pointerOverSelected() && this.pointerOverNonSelected()) {
        //         console.log("***********Second***********");
        //         this.interactive = true;
        //         this.buttonMode = true;
        //         this._compService.setSelectedByName(this.name);
        //     } else {
        //         console.log("***********Third***********");
        //         this.interactive = false;
        //         this.buttonMode = false;
        //     }

        // } else {
        //     this._compService.setSelectedByName(this.name);
        // }






        

        this.dragging = true;
        this.offsetStart = true;
            
        console.log("*********************************");
        console.log("MOUSEX: " + this.data.getLocalPosition(this.parent).x + "MOUSEY: " + this.data.getLocalPosition(this.parent).y);
        console.log("CURRENT: Xpos: " + this.x + " " + "Ypos: " + this.y + " " + "Width: " + this.width + " " + "Height: " + this.height);
        //this._compService.setSelectedByName(this.name);
        console.log("SELECTED:Xpos: " + this._compService.comp.selected.xC + " " + "Ypos: " + this._compService.comp.selected.yC + " " + "Width: " + this._compService.comp.selected.widthCurrent + " " + "Height: " + this._compService.comp.selected.heightCurrent);
        //this.interactive = true;
        
    }

    // pointerOverSelected(): boolean {

    //     let isOver = false;
    //     let mouseXpos = this.data.getLocalPosition(this.parent).x;
    //     let mouseYpos = this.data.getLocalPosition(this.parent).y;
    //     let selected = this._compService.comp.selected;
    //     if(selected.xC  <=  mouseXpos && mouseXpos <= (selected.xC + selected.widthCurrent) && selected.yC  <=  mouseYpos && mouseYpos <= (selected.yC + selected.heightCurrent)) {
    //         isOver = true;
    //     }

    //     return isOver;
    // }

    // isCurrentSelected() {
    //     if(this._compService.comp.selected.name === this.name) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // pointerOverNonSelected() {
    //     let mouseXpos = this.data.getLocalPosition(this.parent).x;
    //     let mouseYpos = this.data.getLocalPosition(this.parent).y;
    //     if(this.x  <=  mouseXpos && mouseXpos <= (this.x + this.width) && this.y  <=  mouseYpos && mouseYpos <= (this.y + this.height)) {
    //         return true;
    //     }
    //     // if(selected.xC  <=  mouseXpos && mouseXpos <= (selected.xC + selected.widthCurrent) && selected.yC  <=  mouseYpos && mouseYpos <= (selected.yC + selected.heightCurrent)) {
    //     //     isOver = true;
    //     // }

    //     return false;
    // }

    onDragEnd() {
        this.dragging = false;
        this.data = null;

        this._objectservice.updateObjectProperties(this, this._compService.comp.x, this._compService.comp.y);

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