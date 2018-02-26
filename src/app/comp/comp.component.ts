import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit,Renderer2 } from "@angular/core";
import { Text } from './text';
import * as PIXI from 'pixi.js';
import { CompService } from "../comp.service";
import { IObject } from "../obj";
import { ObjectService } from "../object.service";
import { Text2 } from "./text2.component";
import { ImageS } from "./image.component";
import { Subject } from "rxjs/Subject";
//import 'rxjs/add/operator/skip';
import * as _ from 'underscore';
//import * as ffmpeg from "ffmpeg.js/ffmpeg-mp4.js";
let worker = new Worker("node_modules/ffmpeg.js/ffmpeg-worker-mp4.js");
//import * as fs from "fs";

import { VideoS } from "./video.component";

@Component({
    selector: 'comp',
    templateUrl: './comp.component.html',
    styleUrls: ['./comp.component.css'],

})

export class CompComponent implements OnInit, AfterViewInit {


    @ViewChild('compView') compView: ElementRef;
    @ViewChild('compTest') compTest: ElementRef;
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
    renderRun: boolean = false;
   


    constructor(private renderer: Renderer2, private _compservice: CompService, private _objectservice: ObjectService) {
        
                    // this._objectservice.objectsUpdated.subscribe(value => {
                    //     console.log("Objects Refreshed Outside2");
                    //         this.refreshObjects();
                    // });


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
                this._objectservice.objectsUpdated.subscribe(value => {
                    //console.log("Objects Refreshed Outside" + value.name);
                    //if(!_.isEmpty(value.name)){
                        //this.initObjects(this.app.renderer,this.app.stage, this.objectTemp);
                        //console.log("Value" + value);
                        console.log("Objects Refreshed");
                        //this.refreshObjects(value);
                        this.refreshObjects2();

                    //}
                },
                error => {
                   console.log("had error: " + error);
                });


                this._objectservice.newObject.subscribe(value => {
        
                    this.refreshObjects(value);

                    //  for(let currentChild of this.app.stage.children) {
                    //     if(currentChild.name !== "stage" || currentChild.name !== value.name) {
                    //         currentChild.interactive = false;
                    //         currentChild.buttonMode = false;
                    //     }
                    // }  
                });



    }

    ngOnInit() {
        //this.rendererPixi = PIXI.autoDetectRenderer(  {width: this.compLength, height: this.compHeight, antialias: true});
        let myView = document.getElementById('canvas');
       this.app = new PIXI.Application({ 
        width: this._compservice.x,         // default: 800
        height: this._compservice.y,        // default: 600
        view: myView,
        antialias: true,    // default: false
        transparent: false, // default: false
        resolution: 1,       // default: 1
        preserveDrawingBuffer:true
      });
        this.app.renderer.backgroundColor =0xFF0000;
        this.app.renderer.autoResize = true;

        /////////////Was using this, but changed from div to canvas
        //this.compView.nativeElement.appendChild(this.app.view);

    



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
            //console.log("Frame");


            //TESTING PAUSED VIDEO
            // for(let currentChild of this.app.stage.children) {
            //     //console.log("Current Child Name: " + currentChild.name);
            //          //console.log("PAUSE " + currentChild.type);
            //         if(currentChild.type === "video") {
                        
            //             currentChild.texture.baseTexture.source.currentTime = 3;
            //             currentChild.texture.baseTexture.source.pause();
            //             console.log("PAUSE");
            //         }
            // }


            
            this.whatsSelected();
            this.app.renderer.render(this.app.stage);
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
            this.refreshObjects2();
            //this.refreshObjects(this._objectservice.objects);
            this.update();
        }
        
     }


     startRendering(then = Date.now(), startime = Date.now()){
        let now = startime;
        let start = true;
        let fixedStartTime = startime;
        let images = [];
        //this.updateRun = false;
        while(start) {
            
            
            
            this.runAnimationOnChildren(fixedStartTime, now);
            //this.app.renderer(this.app.stage);
            this.app.renderer.render(this.app.stage);
            //Take snap shot of canvas
            //let canvasPic = <HTMLCanvasElement> document.getElementById('canvas');
            //let canvasPic = this.compView.nativeElement.value;
            //let canvasPic = this.compView.nativeElement.element;
            //let canvasPic:HTMLCanvasElement = this.compView.nativeElement.value;
            let canvasPic = <HTMLCanvasElement> document.getElementById('canvas');
            let imgPic = canvasPic.toDataURL("image/jpg", 1);
            let convert = this.convertDataURIToBinary(imgPic);
            images.push(convert);
            //document.body.appendChild(imgPic); 
            let shouldStop = (now - fixedStartTime)/1000;
            console.log("shouldStop: " + shouldStop + "Timelenght: " + this._compservice.comp.timeLength);
            
            let adding = ((1/this._compservice.comp.fps)*1000);
            //now.setSeconds(now.getSeconds() + 10);
            now += adding;
            console.log("Adding: " + adding +" Startime: " + fixedStartTime + " Now: " + now);
            if(shouldStop > this._compservice.comp.timeLength) {
                start = false;
            }
            //this.sleep(100);

        }
            
    
        this.updateRun = true;
        this.refreshObjects2();
        //this.refreshObjects(this._objectservice.objects);
        this.update();
        console.log(")))))))))))))))))))))))))))) " + images.length);
        //document.body.appendChild(images[60]);
        //console.log(images[10]);

        /////////////////////
        ///Test for checking images
        /////////////////
        // let newImage = new Image();
        // newImage.src = images[100];
        // let imageOnPage = document.getElementById('test');
        // this.compTest.nativeElement.appendChild(newImage);


        //imageOnPage.innerHTML('<img src=' + images[60] + ' >');
        //this.compView.nativeElement.appendChild(newImage);
        //document.appendChild(newImage);



        worker.onmessage = function (e) {
            var msg = e.data;
        
            switch (msg.type) {
                case "ready":
                    console.log('mp4 worker ready');
                    break;
                case "stdout":
                    console.log(msg.data);
                    break;
                case "stderr":
                    console.log(msg.data);
                    break;
        
                case "done":
                    var blob = new Blob([msg.data.MEMFS[0].data], {
                        type: "video/mp4"
                    });
        
                    // ...
                    break;
        
                case "exit":
                    console.log("Process exited with code " + msg.data);
                    break;
            }
        };


        worker.postMessage(
            {
                type: "run",
                TOTAL_MEMORY: 268435456,
                MEMFS: [
                    {
                        name: "input.jpeg",
                        data: images
                    }
                ],
                arguments: ["-r", "60", "-i", "input.jpeg", "-aspect", "16/9", "-c:v", "libx264", "-crf", "1", "-vf", "scale=1280:720", "-pix_fmt", "yuv420p", "-vb", "20M", "out.mp4"]
            }
        );
        
     }

    //  startRendering(renderer, stage, timeLenofComp, goAni, go, FPS, GLOBAL) {
    //     goAni = true;
    //     go = false;
    //     let startTime = 0;
    //     let now = 0;
    //     let timeCode = 0;
    //     let howLongComp = this.timeLengthofComp();
    //     let moveon = true;
    //     this.saveChildrenCurrentState(stage.children);
    //     this.retrieveSliderStartEnds(stage);
    //     //this.highlightSquare.clear();
    //     this.removeHighlightSquare(GLOBAL.selected, stage);
    //     console.log("Time Length inside of function:--------------------------------------------- " + this.timeLengthofComp());
    //     //ipc.send('cleanTempFolder');
    //     while(goAni){
    //              console.log("What Time Now" + now);
    //             //run animation on children
    //             this.runAnimationOnChildren(renderer, stage, startTime, now);
    //             //update stage
    //             renderer.render(stage);
    //             now += 1000/FPS;

    //             //Take snap shot of canvas
    //             let canvasPic = $("#canvas2");
    //             let imgPic = canvasPic[0].toDataURL("image/png");
                

    //               if(moveon == true) {
    //                 ipc.send('cleanTempFolder', imgPic, this.timeCodePadWithZeros(timeCode));
    //                 this.sleep(2000);
    //                 moveon = false;
    //               } else {
    //                   ipc.send('frame-rendered', imgPic, this.timeCodePadWithZeros(timeCode));
    //               }
          
    //                 console.log("Time code before: " + timeCode);
    //                 timeCode++;
                    
    //                 console.log("Time code after: " + timeCode);
    //                 //ipc.send('frame-rendered', imgPic, this.timeCodePadWithZeros(timeCode));
              
    //         if(this.endAnimation(startTime, now, howLongComp)) {
    //             goAni = false;
    //             go = true;
    //             ipc.send('renderMovie');
    //             this.restStageElementsToOriginalState(stage);
    //          }
    //     }
    //     this.createHighlightSquare(GLOBAL.selected);
    //     this.update(go, renderer, stage, GLOBAL);
    //     return;
    // }

    convertDataURIToBinary(dataURI) {
        //var base64 = dataURI.substring(23);
        let remove = dataURI.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
        var raw = atob(remove);
        //var raw = atob(base64);
        var rawLength = raw.length;
    
        var array = new Uint8Array(new ArrayBuffer(rawLength));
        for (let i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
        }
        return array;
    };


     sleep(miliseconds) {
     var currentTime = new Date().getTime();

     while (currentTime + miliseconds >= new Date().getTime()) {
      }
    }


    timeCodePadWithZeros(timeCode) {
        let sendTimeCode = timeCode;
        if(timeCode < 10){
            sendTimeCode = "000" + timeCode;
        } else if(timeCode > 9 && timeCode < 100) {
            sendTimeCode = "00" + timeCode;
        } else if(timeCode > 99 && timeCode < 1000) {
            sendTimeCode = "0" + timeCode;
        } else {
                    //do nothing
        }
        return sendTimeCode;
    }




     runAnimationOnChildren(startTime, now){
        let current = this.currentAniTime(startTime, now);
         //renderer, stage, startTime, now
        //Loop through of the children 
         //console.log("Inside What Render Width(runAnimationOnChildren): " + renderer.width);
        for(let element of this.app.stage.children) {
            //console.log("Children Worked");
            //Animate Each Effect on each Element
            console.log("RUNNING ANIMATION***********************" + element.name);
            if(element.name !== "stage"){
              let currentObject = this._objectservice.getObjectByLayerName(element.name);
            
                if(element.type == "video") {
                    current = this.currentAniTime(startTime, now);
                    element.texture.baseTexture.source.pause();
                    element.texture.baseTexture.source.currentTime = current/1000;
                    element.texture.baseTexture.source.play();
                    // console.log("Video TIme: " + current/1000);
                }


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
                                console.log("TIME END***********************");
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
            console.log("$$$$$$$$$$$$$$$$-NOTHING SELECTED");   
        } else if (this.pointerOverSelected()) {
            //this._compservice.comp.selected.interactive = true;
            //this._compservice.comp.selected.buttonMode = true;
            for(let currentChild of this.app.stage.children) {
                if(currentChild.name !== "stage" && currentChild.name !== this._compservice.comp.selected.name) {
                    currentChild.interactive = false;
                    currentChild.buttonMode = false;
                }
            }   
            console.log("$$$$$$$$$$$$$$$$-OVER SELECTED");

        } else if (this.pointerOverNonSelected() && !this.pointerOverSelected()){
            for(let currentChild of this.app.stage.children) {
                if(currentChild.name !== "stage") {
                    currentChild.interactive = true;
                    currentChild.buttonMode = true;
                }
            }  
            console.log("$$$$$$$$$$$$$$$$-OVER NON SELECTD - NOT OVER SELECTED");  
        }

     }

     pointerOverSelected(): boolean {

        //let mouseXpos = this.data.getLocalPosition(this.parent).x;
        let mouseXpos = this.app.renderer.plugins.interaction.mouse.global.x;
        let mouseYpos = this.app.renderer.plugins.interaction.mouse.global.y;
        let selected = this._compservice.comp.selected;
        for(let currentChild of this.app.stage.children) {
            if(currentChild.name !== "stage" && currentChild.name === selected.name) {
                if(currentChild.x  <=  mouseXpos && mouseXpos <= (currentChild.x + currentChild.width) && currentChild.y  <=  mouseYpos && mouseYpos <= (currentChild.y + currentChild.height)) {
                    return true;
                }
            }
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


     refreshObjects2() {
        // for(let currentChild of this.app.stage.children) {
        //     currentChild.name
        // }   

        for(let obj of this._objectservice.objects) {
            let child = this.app.stage.getChildByName(obj.name);
                child.text = obj.text;
                child.x = obj.xC;
                child.y = obj.yC;
                //////Maybe shouldn't update these
                //child.width = obj.widthCurrent;
                //child.height = obj.heightCurrent;
                child.alpha = obj.alphaCurrent;
                if(child.children.length > 0) {
                    child.children[0].width =  child.width;
                    obj.widthCurrent = child.width;
                }
                //child.scale = obj.scaleCurrent;
                console.log(child.x + " " + child.y + " " + child.width + " " + child.height + " " + child.scale);
        }   


     }

    
    addNewObject(value: IObject[]) {
        this.refreshObjects(value);
    }


     refreshObjects(value: IObject[]) {
        
        // for(let currentChild of this.app.stage) {
        //     console.log("REMOVE CHILD");
        //     currentChild.removeChild(currentChild.children[0]);
        // }
        
        // let howManyChildren = this._objectservice.lengthObjects() - 1;
        // console.log("Remove Children " + howManyChildren);
        // this.app.stage.removeChildren(0, howManyChildren);

        //  let loader = PIXI.loader;
        //  loader.reset();
        //  loader.add('../assets/videos/video.mp4').load((loader,resources) => {
        //     console.log("Loading*************************");
        while(this.app.stage.children[0]) { this.app.stage.removeChild(this.app.stage.children[0]); }





        for(let i = this._objectservice.objects.length-1; i > -1; i--) {
            //console.log("Check Type: " + this._objectservice.objects[i].objectType);
            if(value[i].objectType === "text"){
                let textObj = null;
                //setup text attributes
                console.log("New x and y on refresh: " + value[i].xC + " " + value[i].yC);
                let style = new PIXI.TextStyle(value[i].style);
                    textObj = new Text2(this._compservice.x, this._compservice.y, value[i].xC , value[i].yC, style, value[i].text, value[i].name, this._compservice, this._objectservice);
                //have selected variable set to text object when clicked
                
                this.app.stage.addChild(textObj);
                console.log("TTTT: " + textObj.name);
            }

            if(value[i].objectType === "image"){
                
                console.log("IMAGE^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
                //setup text attributes
               //console.log("New x and y on refresh: " + value[i].xC + " " + value[i].yC);

                console.log("RESSSSET Loader");
                PIXI.loader.reset();
                console.log("RESSSSET Loader");

    
                var img = new Image();
                img.src = value[i].image;
                
                //setTimeout(function(){  },1000);
                

                //console.log(value[i].image);
                let base = new PIXI.BaseTexture(img);
                console.log("IMAGE X: " + base.height + " " + base.width);
                let texture = new PIXI.Texture(base);
                console.log("IMAGE X: " + texture.height + " " + texture.width);
                //PIXI.Texture.addTextureToCache(texture, "someId");
                let imageObj = new ImageS(this._compservice.x, this._compservice.y, value[i].xC , value[i].yC, texture, value[i].name, this._compservice, this._objectservice);
                console.log("IMAGE X: " + imageObj.height + " " + imageObj.width);
                //imageObj.height = 50;
                //imageObj.width = 100;
                this.app.stage.addChild(imageObj);
                //PIXI.loader.add(value[i].image).load(this.imageConfig.bind(this, this._compservice.x, this._compservice.y, value[i].xC , value[i].yC, value[i].image, value[i].name, this._compservice, this._objectservice));
              // PIXI.loader.add(value[i].image).load(console.log("loaded"));
                console.log("TTTT: " + value[i].name);

                //imageObj = new Image(this._compservice.x, this._compservice.y, value[i].xC , value[i].yC, value[i].image, value[i].name, this._compservice, this._objectservice);
                //have selected variable set to text object when clicked
 
                
            }

            if(value[i].objectType === "video"){
                console.log("Video^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
                //console.log("Did video work: " + value[i].video);

                // let video = document.createElement("video");
                // video.preload = "auto";
                // video.loop = true;              // enable looping
                // video.src = value[i].video;
            
                // PIXI.loader.reset();
                // PIXI.loader.add(value[i].video);
                //var texture = PIXI.Texture.fromVideoUrl(value[i].video);


                 //  let loader = PIXI.loader;
                 //  loader.reset();
                  //  loader.add('../assets/videos/video.mp4').load((loader,resources) => {

                // //********************************************** */
                let video = document.createElement("video");
                //video.src = '../assets/videos/video.mp4';
                video.src = value[i].video;
                // video.currentTime = 1;
                // video.pause();

                //  let loader = PIXI.loader;
                // loader.reset();
                // loader.add('vid',video).load((loader,resources) => {

                // PIXI.loader.resources[image].texture;

                let texture = PIXI.Texture.fromVideo(video);
                // let videoSprite = new VideoS(this._compservice.x, this._compservice.y, value[i].xC , value[i].yC, texture, value[i].name, this._compservice, this._objectservice);
                // this.app.stage.addChild(videoSprite);
                // // video.src = value[i].video;
                // //********************************************** */


                // let loader = PIXI.loader;
                // loader.add('ivid','../assets/videos/video.mp4').load((loader,resources) => {
               
                    console.log("Video Loaded");
                    //video.src = '../assets/videos/video.mp4';
                    //console.log("Video source: " + video.src);
                    // video.controls = false;
                    // video.autoplay = false;
                    // video.pause();
                    //document.body.appendChild(video);
                    //let texture = PIXI.Texture.fromVideo(value[i].video);
                    //let texture = PIXI.Texture.fromVideo('../assets/videos/video.mp4');
                    //let texture = PIXI.Texture.fromVideo(resources.ivid.texture);
                    //texture.baseTexture.source.pause();
                    //texture.baseTexture.source.loop = false;
                    //let videoSprite = new PIXI.Sprite(texture);

                    // texture.baseTexture.source.currentTime = 1;
                    // texture.baseTexture.source.pause();
                    // texture.baseTexture.on('loaded', function () {
                    //      texture.baseTexture.source.currentTime = 1;
                    //         texture.baseTexture.source.pause();
                    // });
                    let videoSprite = new VideoS(this._compservice.x, this._compservice.y, value[i].xC , value[i].yC, texture, value[i].name, this._compservice, this._objectservice);
                    
                    //videoSprite.width = 10;
                    //videoSprite.height = 10;
                    // videoSprite.name = "Layer 4";
              
                    //videoSprite.basetext = 10;
                    
                    let tempName = videoSprite.name;
                    //console.log("Whats Video Width: " + videoSprite.width);
                    console.log("temChild name&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& " + videoSprite.height);
                    //let temChild = this.app.stage.getChildByName(tempName);
                    //console.log("temChild name&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& " + temChild);
                    this.app.stage.addChild(videoSprite);

                    // //TESTING PAUSED VIDEO
                    // for(let currentChild of this.app.stage.children) {
                    //     //console.log("Current Child Name: " + currentChild.name);
                    //         //console.log("PAUSE " + currentChild.type);
                    //         if(currentChild.type === "video") {
                                
                    //             currentChild.texture.baseTexture.source.currentTime = 1;
                    //             currentChild.texture.baseTexture.source.pause();
                    //             console.log("PAUSE");
                    //         }
                    // }
                
    
                // } );


                
                
                //video.setAttribute("src", value[i].video);
                //console.log("Whats video: " + video.videoHeight);
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
            // var graphics = new PIXI.Graphics();
            // graphics.lineStyle(1, 0x0BFF70, 1);
            // graphics.beginFill(0xFF700B, 0);
           
            // graphics.drawRect(0, 0, this.selectedObject.width, this.selectedObject.height);
            // graphics.endFill();    
            this.selectedObject.addChild(this.createSquare());
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

    //   });        
     }
    
     imageConfig(x, y, xC, yC, image, name, oc, ob){
        let imageObj = null;
        imageObj = new ImageS(x, y, xC , yC, image, name,  oc, ob);
        this.app.stage.addChild(imageObj);

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
        console.log("WHAT THE LENGTH: " + position);
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

    pauseVideo() {
        // for(let currentChild of this.app.stage.children) {
        //     //console.log("Current Child Name: " + currentChild.name);
        //         currentChild.height = currentChild.height + 2;
        //         currentChild.width = currentChild.width + 2;
        //          console.log("PAUSE " + currentChild.type);
        //         if(currentChild.type === "video") {
                    
        //             currentChild.texture.baseTexture.source.currentTime = 1;
        //             currentChild.texture.baseTexture.source.pause();
        //             console.log("PAUSE");
        //         }
        //     }

        this.refreshObjects2();

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
                
                let w = 0;
                let h = 0;

                // let squares = [
                //     // this.createSquare(w-150, h-150),
                //     // this.createSquare(w+150, h-150),
                //     // this.createSquare(w+150, h+150),
                //     // this.createSquare(w-150, h+150)
                //     this.createSquare(w-10, h-10),
                //     this.createSquare(w+10, h-10),
                //     this.createSquare(w+10, h+10),
                //     this.createSquare(w-10, h+10)
                // ]; 
                
                //let quad = squares.map((s) => { return s.position });
                //squares.forEach((s)=>{ this.selectedObject.addChild(s); });


                //this.selectedObject = this.app.stage.children[this._objectservice.getLayerPositionInArray(value.name)];

                // var graphics = new PIXI.Graphics();
                // graphics.lineStyle(1, 0x0BFF70, 1);
                // graphics.beginFill(0xFF700B, 0);
                // console.log("GOT HERE " + this.selectedObject.width + " " + this.selectedObject.height);
                // graphics.drawRect(0, 0, this.selectedObject.width, this.selectedObject.height);
                // graphics.endFill();    
                this.selectedObject.addChild(this.createSquare());


                //console.log("FROM COMP: " + value.name + " " + value.text + " child height " + this.app.stage.children[this._objectservice.getLayerPositionInArray(value.name)].width + " width " + this.app.stage.children[this._objectservice.getLayerPositionInArray(value.name)].height);
                } else {
                     //Remove all green boxes
                    for(let currentChild of this.app.stage.children) {
                        currentChild.removeChild(currentChild.children[0]);
                    }
                }
    }


    // createSquare(x, y) {
    //     var square = new PIXI.Sprite(PIXI.Texture.WHITE);
    //     square.tint = 0xff0000;
    //     square.factor = 1;
    //     square.anchor.set(0.5);
    //     square.position.set(x, y);
    //     return square;
    // }

     createSquare() {
        var graphics = new PIXI.Graphics();
        graphics.lineStyle(1, 0x0BFF70, 1);
        graphics.beginFill(0xFF700B, 0);
        console.log("GOT HERE " + this.selectedObject.width + " " + this.selectedObject.height);
        graphics.drawRect(0, 0, this.selectedObject.width, this.selectedObject.height);
        graphics.endFill();    
        return graphics;
    }

   
}