import { Component, Input, OnInit } from "@angular/core";
import * as PIXI from 'pixi.js';

@Component({
    selector: 'comp',
    templateUrl: './comp.component.html',
    styleUrls: ['./comp.component.css'],

})

export class CompComponent implements OnInit{
    time: string = "hello";
    htmlToAdd;

    ngOnInit() {
        let type = "WebGL"
        if(!PIXI.utils.isWebGLSupported()){
          type = "canvas"
        }
    
        PIXI.utils.sayHello(type)

        let app = new PIXI.Application({width: 256, height: 256});
        //this.htmlToAdd = app.view;
        //this.htmlToAdd = '<div class="two">two</div>';
        //document.body.appendChild(app.view);
    }

}