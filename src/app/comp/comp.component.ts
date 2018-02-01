import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit,Renderer2 } from "@angular/core";
import { Text } from './text';
import * as PIXI from 'pixi.js';
import { CompService } from "../comp.service";
import { IObject } from "../obj";
import { ObjectService } from "../object.service";
import { Text2 } from "./text2.component";
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/skip';
import * as _ from 'underscore';

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
    bottom: any;
   


    constructor(private renderer: Renderer2, private _compservice: CompService, private _objectservice: ObjectService) {
        
                    this._objectservice.objectsUpdated.subscribe(value => {
                            this.refreshObjects();
                    });


                    /////////////////////////
                //Crappy Reoder of objects
                /////////////////////////
                this._compservice.Observable.subscribe(value => {
                        this.reorderofObjects();
                        this.selectObject(value);

                        //  for(let currentChild of this.app.stage.children) {
                        //     if(currentChild.name !== "stage" || currentChild.name !== value.name) {
                        //         currentChild.interactive = false;
                        //         currentChild.buttonMode = false;
                        //     }
                        // }  
                    });

                /////////////////
                ///Add New layer to comp - beta
                ////////////////////
                this._objectservice.objectsUpdated.skip(1).subscribe(value => {
                    if(!_.isEmpty(value.name)){
                        //this.initObjects(this.app.renderer,this.app.stage, this.objectTemp);
                        this.refreshObjects();
                    }
                });

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
        this.app.renderer.backgroundColor =0xFF0000;
        this.app.renderer.autoResize = true;


        this.compView.nativeElement.appendChild(this.app.view);

    



        //PIXI.loader.add('/assets/images/cat.png').add('/testpic/icon.png').load(this.setup.bind(this));
        //this.test();
        //let newClass = new Text(this.app.renderer,this.app.stage);

        this.objectTemp = this._objectservice.getObjects();
  
        this.initObjects(this.app.renderer,this.app.stage, this.objectTemp);
   
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
        this.app.stage.addChild(textTex2);
     }

     setup() {
        let test = PIXI.loader.resources['/assets/images/cat.png'].texture;
        let cat2 = new PIXI.Sprite(test);
        this.app.stage.addChild(cat2);
     }

     update() {
         this.app.renderer(this.app.stage);
     }

     deleteChild() {
         while(this.app.stage.children[0]) { this.app.stage.removeChild(this.app.stage.children[0]); }

     }

     refreshObjects() {
        
        // for(let currentChild of this.app.stage) {
        //     console.log("REMOVE CHILD");
        //     currentChild.removeChild(currentChild.children[0]);
        // }
        
        // let howManyChildren = this._objectservice.lengthObjects() - 1;
        // console.log("Remove Children " + howManyChildren);
        // this.app.stage.removeChildren(0, howManyChildren);

        while(this.app.stage.children[0]) { this.app.stage.removeChild(this.app.stage.children[0]); }





        for(let i = this._objectservice.objects.length-1; i > -1; i--) {
            //console.log("Check Type: " + this._objectservice.objects[i].objectType);
            if(this._objectservice.objects[i].objectType === "text"){
                let textObj = null;
                //setup text attributes
                let style = new PIXI.TextStyle(this._objectservice.objects[i].style);
                    textObj = new Text2(this._compservice.x, this._compservice.y, this._objectservice.objects[i].xC , this._objectservice.objects[i].yC, style, this._objectservice.objects[i].text, this._objectservice.objects[i].name, this._compservice, this._objectservice);
                //have selected variable set to text object when clicked
 
                this.app.stage.addChild(textObj);
            }
        }

      





        //////////////////////
        ///Need to reselect//
        //////////////////////


        for(let currentChild of this.app.stage.children) {

      
                if(currentChild.name === this._compservice.comp.selected.name) {
                    this.selectedObject = currentChild;
              
                }
           
        }   

        //this.selectedObject = this.app.stage.children[this._objectservice.getLayerPositionInArray(value.name)];
        var graphics = new PIXI.Graphics();
        graphics.lineStyle(1, 0x0BFF70, 1);
        graphics.beginFill(0xFF700B, 0);
        graphics.drawRect(0, 0, this.selectedObject.width, this.selectedObject.height);
        graphics.endFill();    

 
        this.selectedObject.addChild(graphics);


          //////////////////
        ////Re add bottom
        /////////////////////
        this.bottom = new PIXI.Sprite();
        this.bottom.hitArea = new PIXI.Rectangle(0, 0, 1000, 1000);
        this.bottom.name = "stage";
        this.bottom.interactive = true;
        
        this.bottom.on('pointerover', this.overStage.bind(this)),
        this.bottom.on('pointerdown', this.stageClick.bind(this));
        this.app.stage.addChild(this.bottom);
        this.app.stage.setChildIndex(this.bottom, 0);



        // for(let i = 0; i < this.app.stage.length; i++) {


        // }
     }

    

    initObjects(renderer, stage, objects: IObject[]) {

        
       
        // this.on('pointerdown', this.onDragStart)
        //  .on('pointerup', this.onDragEnd)
        //  .on('pointerupoutside', this.onDragEnd)
        //  .on('pointertap', this.onPointerUpOutside)
        //  .on('pointermove', this.onDragMove)
        //  .on('pointerover', this.onPointerOver);

        //  this.data = new Observable(observer => {});

  
        for(let i = objects.length-1; i > -1; i--) {
       
            if(objects[i].objectType === "text"){
                let textObj = null;
                //setup text attributes
                let style = new PIXI.TextStyle(objects[i].style);
                    textObj = new Text2(this._compservice.x, this._compservice.y, objects[i].xC , objects[i].yC, style, objects[i].text, objects[i].name, this._compservice, this._objectservice);
                //have selected variable set to text object when clicked
                stage.addChild(textObj);
            }
        }

        
        this.bottom = new PIXI.Sprite();
        this.bottom.hitArea = new PIXI.Rectangle(0, 0, 1000, 1000);
        this.bottom.name = "stage";
        this.bottom.interactive = true;
        
        this.bottom.on('pointerover', this.overStage.bind(this)),
        this.bottom.on('pointerdown', this.stageClick.bind(this));
        stage.addChild(this.bottom);
        stage.setChildIndex(this.bottom, 0);

    }


    overStage() {
        console.log("OVER: " + this.bottom.name);
        if(_.isNull(this._compservice.comp.selected)) {
            for(let currentChild of this.app.stage.children) {
                if(currentChild.name !== "stage") {
                    currentChild.interactive = true;
                    currentChild.buttonMode = true;
                } else {
                    currentChild.interactive = true;
                }
            }
        } else {
            for(let currentChild of this.app.stage.children) {
                if(currentChild.name !== this._compservice.comp.selected.name) {
                    if(currentChild.name !== "stage") {
                    currentChild.interactive = false;
                    currentChild.buttonMode = false;
                    }
                }
            }

        }

        if(_.isEmpty(this._compservice.comp.selected)) {
            for(let currentChild of this.app.stage.children) {
                if(currentChild.name !== "stage") {
                    currentChild.interactive = true;
                    currentChild.buttonMode = true;
                } else {
                    currentChild.interactive = true;
                }
            }

        }

      
    }

    stageClick() {
        // this._compservice.comp.selected = {
           
        //         name: '',
        //         objectType: '',
        //         xC: 0,
        //         yC: 0,
        //         scaleCurrent: 0,
        //         alphaCurrent: 0,
        //         widthCurrent: 0,
        //         heightCurrent: 0,
        //         text: '',
        //         style: null,
        //         effect: null;
            
        // }
       
        this._compservice.setSelected(null);
        this.removeAllChildrenFromChildren();

                //      name: '',
                // objectType: '',
                // xC: 0,
                // yC: 0,
                // scaleCurrent: 0,
                // alphaCurrent: 0,
                // widthCurrent: 0,
                // heightCurrent: 0,
                // text: '',
                // style: null,
                // effect: null

        console.log("Stage Click");
    }

    removeAllChildrenFromChildren(): void {
        for(let currentChild of this.app.stage.children) {
            currentChild.removeChild(currentChild.children[0]);
        }

    }

    reorderofObjects() {
        let position = this._objectservice.objects.length;
        for(let i = 0; i < this._objectservice.objects.length; i++) {
            
            for(let currentChild of this.app.stage.children) {
            //console.log("Current Child Name: " + currentChild.name);

                if(currentChild.name === this._objectservice.objects[i].name) {
                    //console.log("The reorder: " + currentChild.objNum + " and zorder " + zorder);
                    this.app.stage.setChildIndex(currentChild,position);
                    position--;
                    break;
                }
            }

        }

    }

    selectObject(value) {
               /////////////////////////
            //Crappy Selection of Objects
            /////////////////////////

            if(!_.isNull(value)) {
                ///Remove all green boxes
                    this.removeAllChildrenFromChildren();
    
             
    
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
    
                this.selectedObject.addChild(graphics);
                //console.log("FROM COMP: " + value.name + " " + value.text + " child height " + this.app.stage.children[this._objectservice.getLayerPositionInArray(value.name)].width + " width " + this.app.stage.children[this._objectservice.getLayerPositionInArray(value.name)].height);
                } else {
                     //Remove all green boxes
                    for(let currentChild of this.app.stage.children) {
                        currentChild.removeChild(currentChild.children[0]);
                    }
                }
    }

}