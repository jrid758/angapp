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

    constructor(private renderer: Renderer2) {

    }

    ngOnInit() {
        let type = "WebGL"
        if(!PIXI.utils.isWebGLSupported()){
          type = "canvas"
        }
    
        PIXI.utils.sayHello(type)

        let app = new PIXI.Application({width: 256, height: 256});
        console.log("whats in app:" + app.view);
        //this.renderer.appendChild(app.view);
        
        //this.htmlToAdd = app.view;
        //this.htmlToAdd = '<div class="two">two</div>';
        //document.body.appendChild(app.view);
        //this.compView.nativeElement.appendChild(app.view);
        //this.compView.nativeElement.appendChild(app.view);
    }

     ngAfterViewInit(): void {
            //throw new Error('Method not implemented.');
            //this.compView.nat = "hello2";
            
     }

}