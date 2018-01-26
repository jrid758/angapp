import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit,Renderer2 } from "@angular/core";
import { Text } from './text';
import * as PIXI from 'pixi.js';
import { CompService } from "../comp.service";
import { IObject } from "../obj";
import { ObjectService } from "../object.service";


@Component({
    selector: 'comp',
    templateUrl: './comp.component.html',
    styleUrls: ['./comp.component.css'],

})

export class CompComponent implements OnInit, AfterViewInit {


    @ViewChild('compView') compView: ElementRef;
    time: string = "hello";
    app: any;
    rendererPixi;
    stage;
    compLength: number = 256;
    compHeight: number = 256;
    container;
    objectTemp: IObject[] = [];
    selectedObject: any;


    constructor(private renderer: Renderer2, private _compservice: CompService, private _objectservice: ObjectService) {
    
        /////////////////////////
       //Crappy Reoder of objects
       /////////////////////////
       this._compservice.Observable.subscribe(value => {

            let position = this._objectservice.objects.length - 1;
            for(let i = 0; i < this._objectservice.objects.length; i++) {
                
                for(let currentChild of this.app.stage.children) {
                //console.log("This is the obj number: " + currentChild.objNum);
                    if(currentChild.name === this._objectservice.objects[i].name) {
                        //console.log("The reorder: " + currentChild.objNum + " and zorder " + zorder);
                        this.app.stage.setChildIndex(currentChild,position);
                        console.log("MOVED TO POSITION: " + position + " " + this._objectservice.objects[i].name + "ChildeName: " + currentChild.name);
                        position--;
                        break;
                    }
                }

            }



            /////////////////////////
            //Crappy Selection of Objects
            /////////////////////////

            for(let currentChild of this.app.stage.children) {
                currentChild.removeChild(currentChild.children[0]);
            }

            for(let currentChild of this.app.stage.children) {
                if(currentChild.name === value.name) {
                    this.selectedObject = currentChild;
                }
            }   

            //this.selectedObject = this.app.stage.children[this._objectservice.getLayerPositionInArray(value.name)];
            var graphics = new PIXI.Graphics();
            graphics.lineStyle(1, 0x0BFF70, 1);
            graphics.beginFill(0xFF700B, 0);
            graphics.drawRect(0, 0, this.selectedObject.width, this.selectedObject.height);
            graphics.endFill();    
    
            console.log("addingChild");
            this.selectedObject.addChild(graphics);
            console.log("FROM COMP: " + value.name + " " + value.text + " child height " + this.app.stage.children[this._objectservice.getLayerPositionInArray(value.name)].width + " width " + this.app.stage.children[this._objectservice.getLayerPositionInArray(value.name)].height);
      })

    }

    ngOnInit() {
        //this.rendererPixi = PIXI.autoDetectRenderer(  {width: this.compLength, height: this.compHeight, antialias: true});
       this.app = new PIXI.Application({ 
        width: this._compservice.x,         // default: 800
        height: this._compservice.y,        // default: 600
        antialias: true,    // default: false
        transparent: false, // default: false
        resolution: 1       // default: 1
      });
        console.log("test" + this.getAllMethods(this.app));
        this.app.renderer.backgroundColor =0xFF0000;
        this.app.renderer.autoResize = true;
 
        this.compView.nativeElement.appendChild(this.app.view);
        //PIXI.loader.add('/assets/images/cat.png').add('/testpic/icon.png').load(this.setup.bind(this));
        //this.test();
        //let newClass = new Text(this.app.renderer,this.app.stage);
        console.log("Running?1");
        this.objectTemp = this._objectservice.getObjects();
        console.log("Running?2");
        this.initObjects(this.app.renderer,this.app.stage, this.objectTemp);
        console.log("Running?3");
        //this.addText(this.app.renderer,this.app.stage);
        //console.log("Test Private x: " + newClass.x);
        //this.app.stage.addChild(newClass);
    }

    ​ getAllMethods(object) {
        return Object.getOwnPropertyNames(object).filter(function(property) {
            return typeof object[property] == 'function';
        });
    }

     ngAfterViewInit(): void {

        
     }

     test() {
        let textTex = PIXI.Texture.fromImage('/assets/images/cat.png');
        let textTex2 = new PIXI.Sprite(textTex);
        console.log("What in text2: " + textTex2.width);
        this.app.stage.addChild(textTex2);
     }

     setup() {
        let test = PIXI.loader.resources['/assets/images/cat.png'].texture;
        console.log(test);
        let cat2 = new PIXI.Sprite(test);
        console.log("What in cat: " + cat2.width);
        this.app.stage.addChild(cat2);
     }

     update() {
         this.app.renderer(this.app.stage);
     }

    initObjects(renderer, stage, objects: IObject[]) {
        
        console.log("Inside Check");
        for(let i = objects.length-1; i > -1; i--) {
            console.log("Check Type: " + objects[i].objectType);
            if(objects[i].objectType === "text"){
                let textObj = null;
                //setup text attributes
                let style = new PIXI.TextStyle(objects[i].style);
                    textObj = new Text(this._compservice.x, this._compservice.y, objects[i].xC , objects[i].yC, style, objects[i].text, objects[i].name);
                //have selected variable set to text object when clicked
                stage.addChild(textObj);
            }
        }

        





    }

}