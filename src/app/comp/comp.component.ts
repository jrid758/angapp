import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit,Renderer2 } from "@angular/core";
import { Text } from './text';
import * as PIXI from 'pixi.js';


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
    constructor(private renderer: Renderer2) {
    
       

    }

    ngOnInit() {
        //this.rendererPixi = PIXI.autoDetectRenderer(  {width: this.compLength, height: this.compHeight, antialias: true});
       this.app = new PIXI.Application({ 
        width: 256,         // default: 800
        height: 256,        // default: 600
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
        let newClass = new Text();
        
        console.log("Test Private x: " + newClass.x);
        this.app.stage.addChild(newClass);
    }

    ​ getAllMethods(object) {
        return Object.getOwnPropertyNames(object).filter(function(property) {
            return typeof object[property] == 'function';
        });
    }

     ngAfterViewInit(): void {
        // this.rendererPixi = PIXI.autoDetectRenderer(  {width: this.compLength, height: this.compHeight, antialias: true});
        // this.rendererPixi.backgroundColor = 0xFF0000;
        // this.rendererPixi.autoResize = true;
        // document.body.appendChild(this.rendererPixi.view);
        
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

}