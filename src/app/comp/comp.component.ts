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
    constructor(private renderer: Renderer2, private _compservice: CompService, private _objectservice: ObjectService) {
    
       //getObjects()
       this._compservice.Observable.subscribe(value => {
        
        // if(this.layerName === value.name){
        //   this.variableOutline = true;
        //   console.log("TRUE" + value.name);
        // } else {
        //   this.variableOutline = false;
        //   console.log("FALSE" + value.name);
        // }

        // let outlineFilterBlue = new PIXI.filters.OutlineFilter(5, 0x99ff99);
        let outlineFilterBlue = new PIXI.filters.BlurFilter();
        // selected.filters = [outlineFilterBlue];

        this.app.stage.children[this._objectservice.getLayerPositionInArray(value.name)].filters = [outlineFilterBlue];
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
        for(let i=0; i < objects.length; i++) {
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