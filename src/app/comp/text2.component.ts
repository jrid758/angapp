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
         .on('pointermove', this.onDragMove);

         this.data = new Observable(observer => {});

    }

    

    onPointerUpOutside(event) {
        console.log("**************Pointer UP outside***************");

    }


    onDragStart(event) {
        this.data = event.data;
        this.dragging = true;
        this.offsetStart = true;

        console.log("Whats Dragging: " + this.name);
        this._compService.setSelectedByName(this.name);
        //this.Oclicked.next(this.name);
    
    }

    onDragEnd() {
        this.dragging = false;
        this.data = null;

        this._objectservice.updateObjectProperties(this);

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