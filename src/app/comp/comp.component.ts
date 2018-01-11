import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit,Renderer2 } from "@angular/core";
import * as PIXI from 'pixi.js';

@Component({
    selector: 'comp',
    templateUrl: './comp.component.html',
    styleUrls: ['./comp.component.css'],

})

export class CompComponent implements OnInit, AfterViewInit {


    @ViewChild('compView') compView: ElementRef;
    time: string = "hello";
    htmlToAdd;
    app;
    cat = '/assets/images/cat.png';
    constructor(private renderer: Renderer2) {

    }

    ngOnInit() {
        let type = "WebGL"
        if(!PIXI.utils.isWebGLSupported()){
          type = "canvas"
        }
    
        PIXI.utils.sayHello(type)

       
        this.app = new PIXI.Application({ 
            width: 256,         // default: 800
            height: 256,        // default: 600
            antialias: true,    // default: false
            transparent: false, // default: false
            resolution: 1       // default: 1
          }
        );
        this.app.renderer.backgroundColor =0xFF0000;
        this.app.renderer.autoResize = true;
        console.log("whats in app:" + this.app.view);

        document.body.appendChild(this.app.view);
        //this.compView.nativeElement.appendChild(this.app.view);
        let cat = new PIXI.Sprite(PIXI.Texture.fromImage('/assets/images/cat.png'));
        //this.app.renderer.backgroundColor =0xFF0000;
        //Add the cat to the stage
        this.app.stage.addChild(cat);
        //PIXI.loader.add('/assets/images/cat.png').load(this.setup);


        //this.htmlToAdd = app.view;
        //this.htmlToAdd = '<div class="two">two</div>';
        //document.body.appendChild(this.app.view);
        //this.htmlToAdd = this.app.view;
        //this.compView.nativeElement.appendChild(this.app.view);
        
       //this.renderer.appendChild(this.compView, this.app.view);
    }

     ngAfterViewInit(): void {
            //throw new Error('Method not implemented.');
            //this.compView.nat = "hello2";
            //this.renderer.appendChild(this.compView, this.app.view);
            
     }

     setup() {
                //Create the cat sprite
        //let cat = new PIXI.Sprite(PIXI.loader.resources['/assets/images/cat.png'].texture);
        let cat = new PIXI.Sprite(PIXI.Texture.fromImage('/assets/images/cat.png'));
        //this.app.renderer.backgroundColor =0xFF0000;
        //Add the cat to the stage
        this.app.stage.addChild(cat);
     }

}