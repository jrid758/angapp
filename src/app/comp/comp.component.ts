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
    updateRun: boolean;
    aniPreviewRun: boolean;
   


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
        // create the ticker
        // this._ticker = new PIXI.ticker.Ticker();
        // this._ticker.start();
        // this._ticker.add(this.update(),this);
        // console.log(this._ticker.delta)
        this.updateRun = true;
        this.update();
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
        // this.app.renderer(this.app.stage);
        if(this.updateRun) {
            // for(let currentChild of this.app.stage.children) {
            //     if(currentChild.name !== "stage") {
            //         console.log('Fire ' + currentChild.name + " *****************************************");
            //         currentChild.x++;
            //     }
            // }   
            console.log("Frame");
            
            this.whatsSelected();
            requestAnimationFrame(this.update.bind(this));
        }
        
     }

     animatePreview(then = Date.now(), startime = Date.now()){
        if(this.aniPreviewRun) {
                this.removeAllChildrenFromChildren();
                //console.log("Frame2");
                let fixedStartTime = startime;
                let fpsInterval = 1000/this._compservice.comp.fps;
                // calc elapsed time since last loop
                let now = Date.now();
                // console.log("Now: " + now);
                // console.log("Then: " + then);
                // console.log("Starttime: " + startime);
                // Get ready for next frame by setting then=now, but also adjust for your
                // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
                let elapsed = now - then;
                //console.log("Elapsed: " + elapsed);
                //console.log("FPS: " + fpsInterval);
                //let elapsed = now - then;
                // if enough time has elapsed, draw the next frame

                if (elapsed < fpsInterval) {
                    requestAnimationFrame(this.animatePreview.bind(this, then, fixedStartTime));
                    console.log("ELAPSED WAS SMALLER");
                }

                if (elapsed > fpsInterval) {
                    then = now - (elapsed % (fpsInterval));
                    console.log("ELAPSED WAS BIGGER");
                    //run animation on children----------------------

                    // for(let currentChild of this.app.stage.children) {
                    //     if(currentChild.name !== "stage") {
                    //         console.log('Fire ' + currentChild.name + " *****************************************");
                    //         currentChild.x++;
                    //     }
                    // }   

                    this.runAnimationOnChildren(fixedStartTime, now);


                    //////////////////////////////////--------------------

                    //this.app.renderer.render(this.app.stage);

                    if((now - startime) > this._compservice.comp.timeLength * 1000) {
                        this.updateRun = true;
                        this.aniPreviewRun = false;

                    }

                    requestAnimationFrame(this.animatePreview.bind(this, then, fixedStartTime));
                }
        } else {
            this.updateRun = true;
            this.aniPreviewRun = false;
            this.refreshObjects();
            this.update();
        }
        
     }


     runAnimationOnChildren(startTime, now){
         //renderer, stage, startTime, now
        //Loop through of the children 
         //console.log("Inside What Render Width(runAnimationOnChildren): " + renderer.width);
        for(let element of this.app.stage.children) {
            //console.log("Children Worked");
            //Animate Each Effect on each Element
            console.log("RUNNING ANIMATION***********************" + element.name);
            if(element.name !== "stage"){
              let currentObject = this._objectservice.getObjectByLayerName(element.name);
            
            for(let effect of currentObject.effect) {
                let timeStart = effect.timeStart * 1000;
                let timeEnd = effect.timeEnd * 1000;
                console.log("start: " + timeStart + "end: " + timeEnd);
                console.log("EFFECT ANIMATION***********************" + effect.type);
                        //--------------------
                        //Effect type MoveIn
                        //--------------------
                        if(effect.type === "moveIn"){
                            
                                    //set end of move in based on current location
                                    // effect.xE = element.xC;
                                    // effect.yE = element.yC;

                                    //calculate starting place off screen
                                    // if(effect.direction === "left"){  
                                    //     effect.xS = element.width * -1;
                                    //     effect.yS = element.yC;
                                    // }

                                    // if(effect.direction === "right"){  
                                    //     effect.xS = element.width + renderer.width;
                                    //     console.log("How Long: " + renderer.width);
                                    //     effect.yS = element.yC;
                                    // }

                                    // if(effect.direction === "top"){  
                                    //     effect.xS = element.xC;
                                    //     console.log("How Long: " + renderer.width);
                                    //     effect.yS = element.height * -1;
                                    // }

                                    // if(effect.direction === "bottom"){ 
                                    //     effect.xS = element.xC;
                                    //     console.log("How Long: " + renderer.width);
                                    //     effect.yS = element.height + renderer.width;
                                    // }

                                    

                            //Set beginning placement
                            console.log("-----------------------------------PlacementX: " + timeStart + " vs " + timeEnd + " vs " + this.currentAniTime(startTime, now));
                            if(timeStart > this.currentAniTime(startTime, now)){
                             element.x = effect.xS;
                             console.log("-----------------------------------PlacementX: " + element.x);
                             element.y = effect.yS;
                             console.log("-----------------------------------PlacementY: " + element.y);
                            }
                            //Start Moving  
                            if(timeStart < this.currentAniTime(startTime, now) && timeEnd > this.currentAniTime(startTime, now)){
                                console.log("Curr AniTime & Start: " + this.currentAniTime(startTime, now) + " " + timeStart);
                                let current = this.currentAniTime(startTime, now) - timeStart;
                                console.log("Current Done: " + current);
                                let aniPercentDone = current / (timeEnd - timeStart);
                                console.log("Percent Done: " + aniPercentDone);
                                let totalDistanceX = effect.xE - effect.xS;
                                let totalDistanceY = effect.yE - effect.yS;

                                console.log("Total Distance: " + totalDistanceX);
                                element.x = (totalDistanceX * aniPercentDone) + effect.xS;

                                console.log("What so farY: " + totalDistanceY * aniPercentDone);
                                element.y = (totalDistanceY * aniPercentDone) + effect.yS;
                            }
                            //Above if stops at 99%, this completes the last frame
                            if(timeEnd < this.currentAniTime(startTime, now)){
                                element.x = effect.xE;
                                element.y = effect.yE;
                            }

                        }


                        //--------------------
                        //Effect type fadeOut
                        //--------------------
                        if(effect.type === "fadeOut"){
                            //Start Moving  
                            if(timeStart < this.currentAniTime(startTime, now) && timeEnd > this.currentAniTime(startTime, now)){
                                let current = this.currentAniTime(startTime, now) - timeStart;
                                let aniPercentDone = current / (timeEnd - timeStart);
                                element.alpha = 1 - (1 * aniPercentDone);
                            }
                            //Above if stops at 99%, this completes the last frame
                            if(timeEnd < this.currentAniTime(startTime, now)){
                                element.alpha = 0;
                            }

                        }


                        //--------------------
                        //Effect type Zoom
                        //--------------------
                            //Set scale to 0 before it starts
                            if(effect.type === "zoomIn"){
                                if(timeStart > this.currentAniTime(startTime, now)){
                                element.scale.x = 0;
                                element.scale.y = 0;
                            }
                            //Start Moving  
                            if(timeStart < this.currentAniTime(startTime, now) && timeEnd > this.currentAniTime(startTime, now)){
                                let current = this.currentAniTime(startTime, now); - timeStart;
                                let aniPercentDone = current / (timeEnd - timeStart);
                                element.scale.x = (1 * aniPercentDone);
                                element.scale.y = (1 * aniPercentDone);
                            }
                            //Above if stops at 99%, this completes the last frame
                            if(timeEnd < this.currentAniTime(startTime, now)){
                                element.scale.x = 1;
                                element.scale.y = 1;
                            }

                        }

                        //Effect type MoveOut

                        //Effect type Zoom
                    }
                }
            }
    }

    currentAniTime(startTime, now) {
        return now - startTime;
    }

//      animate(go, goAni, renderer, stage, FPS, fpsInterval, then, timeLen, startTime, GLOBAL) {
//         console.log("Inside What Render Width(animate1): " + renderer.width);
//        //go goAni controls when to stop comp reveiw
//         if(goAni){
              
//                // calc elapsed time since last loop
//                let now = Date.now();
//                let elapsed = now - then;
//                // if enough time has elapsed, draw the next frame
//                if (elapsed > fpsInterval) {
//                    // Get ready for next frame by setting then=now, but also adjust for your
//                    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
//                    then = now - (elapsed % fpsInterval);
//                    //run animation on children
//                    console.log("Inside What Render Width(animate2): " + renderer.width);
//                    this.runAnimationOnChildren(renderer, stage, startTime, now);
//                    //update stage
//                    renderer.render(stage);
//                    //end animation if time is over 
//                    if(this.endAnimation(startTime, now, timeLen)) {
//                        go = true;
//                        goAni = false;
//                        this.restStageElementsToOriginalState(stage);
                       
//                    }
//                    requestAnimationFrame(
//                      this.animate.bind(this, go, goAni, renderer, stage, FPS, fpsInterval, then, timeLen, startTime, GLOBAL)
//                     );

//                  }
//         //if goAni is set to false, return to update() function      
//        } else {

//             this.update(go, renderer, stage, GLOBAL); //return to comp render updater
//             return; }
       
//    }


     whatsSelected(){
        if(_.isNull(this._compservice.comp.selected)) {
            for(let currentChild of this.app.stage.children) {
                if(currentChild.name !== "stage") {
                    currentChild.interactive = true;
                    currentChild.buttonMode = true;
                }
            }   
        } else if (this.pointerOverSelected()) {
            //this._compservice.comp.selected.interactive = true;
            //this._compservice.comp.selected.buttonMode = true;
            for(let currentChild of this.app.stage.children) {
                if(currentChild.name !== "stage" && currentChild.name !== this._compservice.comp.selected.name) {
                    currentChild.interactive = false;
                    currentChild.buttonMode = false;
                }
            }   
            console.log("OVER SELECTED");

        } else if (this.pointerOverNonSelected() && !this.pointerOverSelected()){
            for(let currentChild of this.app.stage.children) {
                if(currentChild.name !== "stage") {
                    currentChild.interactive = true;
                    currentChild.buttonMode = true;
                }
            }  

        }

     }

     pointerOverSelected(): boolean {

        //let mouseXpos = this.data.getLocalPosition(this.parent).x;
        let mouseXpos = this.app.renderer.plugins.interaction.mouse.global.x;
        let mouseYpos = this.app.renderer.plugins.interaction.mouse.global.y;
        let selected = this._compservice.comp.selected;
        if(selected.xC  <=  mouseXpos && mouseXpos <= (selected.xC + selected.widthCurrent) && selected.yC  <=  mouseYpos && mouseYpos <= (selected.yC + selected.heightCurrent)) {
            return true;
        }

        return false;
    }

    // isCurrentSelected() {
    //     if(this._compservice.comp.selected.name === this.name) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    pointerOverNonSelected() {
        let mouseXpos = this.app.renderer.plugins.interaction.mouse.global.x;
        let mouseYpos = this.app.renderer.plugins.interaction.mouse.global.y;

        for(let currentChild of this.app.stage.children) {
            if(currentChild.x  <=  mouseXpos && mouseXpos <= (currentChild.x + currentChild.width) && currentChild.y  <=  mouseYpos && mouseYpos <= (currentChild.y + currentChild.height)) {
                return true;
            }
         }   


   


        return false;
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

      if(!_.isNull(this._compservice.comp.selected)) {  //Thought about doing this because of selection problems
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





       }

       
            //////////////////
            ////Re add bottom
            /////////////////////
            this.bottom = new PIXI.Sprite();
            this.bottom.hitArea = new PIXI.Rectangle(0, 0, this._compservice.comp.x, this._compservice.comp.y);
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
        this.bottom.hitArea = new PIXI.Rectangle(0, 0, this._compservice.comp.x, this._compservice.comp.y);
        this.bottom.name = "stage";
        this.bottom.interactive = true;
        
        this.bottom.on('pointerover', this.overStage.bind(this)),
        this.bottom.on('pointerdown', this.stageClick.bind(this));
        stage.addChild(this.bottom);
        stage.setChildIndex(this.bottom, 0);

    }


    overStage() {
        console.log("OVER: " + this.bottom.name);
        // if(_.isNull(this._compservice.comp.selected)) {
        //     for(let currentChild of this.app.stage.children) {
        //         if(currentChild.name !== "stage") {
        //             currentChild.interactive = true;
        //             currentChild.buttonMode = true;
        //         } else {
        //             currentChild.interactive = true;
        //         }
        //     }
        // } else {
        //     for(let currentChild of this.app.stage.children) {
        //         if(currentChild.name !== this._compservice.comp.selected.name) {
        //             if(currentChild.name !== "stage") {
        //             currentChild.interactive = false;
        //             currentChild.buttonMode = false;
        //             }
        //         }
        //     }

        // }

        // if(_.isEmpty(this._compservice.comp.selected)) {
        //     for(let currentChild of this.app.stage.children) {
        //         if(currentChild.name !== "stage") {
        //             currentChild.interactive = true;
        //             currentChild.buttonMode = true;
        //         } else {
        //             currentChild.interactive = true;
        //         }
        //     }

        // }

      
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