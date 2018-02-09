import { Injectable } from "@angular/core";
import { IObject } from "./obj";
import { IEffect } from "./effect";
import * as _ from 'underscore';
import { Subject } from "rxjs/Subject";
import { CompService } from "./comp.service";

@Injectable()
export class ObjectService {

    layerNumber: number;
    objectsUpdated = new Subject<any>(); //needs to be looked at "any"


    constructor() {
        this.layerNumber = 1;
    }
    objects: IObject[] = [
        {
            name: "Layer 3",
            objectType: "text",
            text: "placeholder3",
            image: null,
            style: {
                align: 'center',
                breakWords: 'false',
                fontFamily: 'Arial',
                fontSize: 30,
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontVariant: 'normal',
                fill: '#ffffff', // gradient
                stroke: '#000000',
                strokeThickness: 3,
                lineJoin: 'round',
                leading: 0,
                letterSpacing: 0,
                lineHeight: 0,
                dropShadow: true,
                dropShadowColor: '#000000',
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 3,
                dropShadowAlpha: 1,
                wordWrap: true,
                wordWrapWidth: 440
            },
            
            xC: 25,
            yC: 25,
            scaleCurrent: 1,
            alphaCurrent: 1,
            widthCurrent: 178,
            heightCurrent: 40,
            effect: [
                {
                    type: "moveIn",
                    direction: "right",
                    timeStart: 1,
                    timeEnd: 3,
                    xS: 400,
                    yS: 25,
                    xE: 25,
                    yE: 25,

                    scaleStarting: 1,
                    scaleEnding: 1,

                    widthStarting: 20,
                    heightStarting: 20,
                    widthEnding: 20,
                    heightEnding: 20,

                    alphaStarting: 1,
                    alphaEnding: 1
                },
                {
                    type: "moveOut",
                    direction: "top",
                    timeStart: 1,
                    timeEnd: 4,

                    xS: 0,
                    yS: 20,
                    xE: 30,
                    yE: 20,

                    scaleStarting: 1,
                    scaleEnding: 1,

                    widthStarting: 20,
                    heightStarting: 20,
                    widthEnding: 20,
                    heightEnding: 20,

                    alphaStarting: 1,
                    alphaEnding: 1
                }
            ]
        },
        {
            name: "Layer 2",
            objectType: "text",
            text: "place2",
            image: null,
            style: {
                align: 'center',
                breakWords: 'false',
                fontFamily: 'Arial',
                fontSize: 30,
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontVariant: 'normal',
                fill: '#ffffff', // gradient
                stroke: '#000000',
                strokeThickness: 3,
                lineJoin: 'round',
                leading: 0,
                letterSpacing: 0,
                lineHeight: 0,
                dropShadow: true,
                dropShadowColor: '#000000',
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 3,
                dropShadowAlpha: 1,
                wordWrap: true,
                wordWrapWidth: 440
            },
            xC: 40,
            yC: 120,
            scaleCurrent: 1,
            alphaCurrent: 1,
            widthCurrent: 95,
            heightCurrent: 40,
            effect: [
                {
                    type: "fadeOut",
                    direction: "",
                    timeStart: 1,
                    timeEnd: 5,

                    xS: 300,
                    yS: 120,
                    xE: 40,
                    yE: 120,

                    scaleStarting: 1,
                    scaleEnding: 1,

                    widthStarting: 20,
                    heightStarting: 20,
                    widthEnding: 20,
                    heightEnding: 20,

                    alphaStarting: 1,
                    alphaEnding: 0
                }
            ]
        },
        {
            name: "Layer 1",
            objectType: "text",
            text: "placehol1",
            image: null,
            style: {
                align: 'center',
                breakWords: 'false',
                fontFamily: 'Arial',
                fontSize: 30,
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontVariant: 'normal',
                fill: '#ffffff', // gradient
                stroke: '#000000',
                strokeThickness: 3,
                lineJoin: 'round',
                leading: 0,
                letterSpacing: 0,
                lineHeight: 0,
                dropShadow: true,
                dropShadowColor: '#000000',
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 3,
                dropShadowAlpha: 1,
                wordWrap: true,
                wordWrapWidth: 440
            },
            xC: 60,
            yC: 80,
            scaleCurrent: 1,
            alphaCurrent: 1,
            widthCurrent: 135,
            heightCurrent: 40,
            effect: [
                {
                    type: "moveIn",
                    direction: "right",
                    timeStart: 1,
                    timeEnd: 3,

                    xS: 350,
                    yS: 80,
                    xE: 60,
                    yE: 80,

                    scaleStarting: 1,
                    scaleEnding: 1,

                    widthStarting: 20,
                    heightStarting: 20,
                    widthEnding: 20,
                    heightEnding: 20,

                    alphaStarting: 1,
                    alphaEnding: 1
                }
            ]
        }
    ];

    consoleAllObjects(): void {

        for(let i = 0; i < this.objects.length; i++) {
            let output;
            if(!_.isEmpty(this.objects)) {
                output = this.objects[i].name;
                for (var property in this.objects[i]) {
                    output += property + ': ' + this.objects[i][property] + '; ';
                }
            }
                if(!_.isEmpty(this.objects[i].effect)) {
                    for(let k = 0; k < this.objects[i].effect.length; k++) {
                        
                        output += "EFFECTS" + this.objects[i].effect[k].type + ' ';
                        for (var property in this.objects[i].effect[k]) {
                        output += property + ': ' + this.objects[i].effect[k][property] + '; ';
                        }
                    
                    }
                }

  


                // for(let k = 0; k < this.objects[i].effect.length; k++) {
                // }
        }
        

        //JSON.stringify(this.objects, null, 4);

        

        // for(let i = 0; i < this.objects.length; i++) {
        //     if(this.objects[i].effect != null) {
            // console.log("Did " + this.objects[i].name  + " change Start: " + this.objects[i].effect[0].timeStart);
            // console.log("Did " + this.objects[i].name  + " change End: " + this.objects[i].effect[0].timeEnd);
            // console.log("Did " + this.objects[i].name  + " direction change " + this.objects[i].effect[0].direction);
            // }
        // }
    }

    newLayerName(): string {
        let numberCount = 1;
        let newName = "Layer " + numberCount;

        while(this.checkIfNameExists(newName)) {
            numberCount++;
            newName = "Layer " + numberCount;
        }

        return newName;
    }

    checkIfNameExists(name: string) {
        let boo: boolean;
        for(let i = 0; i < this.objects.length; i++) {
            if(this.objects[i].name === name) {
                return true;
            }
        }

        return false;
    }

    lengthObjects(): number {

        return this.objects.length;
    }

    setObjects(insert: IObject): void {
        this.objects.unshift(insert);
        this.objectsUpdated.next(this.objects);
    }

    updateAllObjects(newArray: IObject[]): void {
        this.objects = newArray;
     
    }
 
    getObjectByLayerName(layerName: string): IObject {
    
        for(let i = 0; i < this.objects.length; i++) {
            if(this.objects[i].name === layerName) {
               return this.objects[i];
            }
        }
    }

    printObject(o) {
        var out = '';
        for (var p in o) {
          out += p + ': ' + o[p] + '\n';
        }
        console.log(out);
      }



    updateObjectProperties(objectI: any, x, y): void {

        for(let i = 0; i < this.objects.length; i++) {
            if(this.objects[i].name === objectI.name) {
                //let sobj = this.getObjectByLayerName(object.name);
                this.objects[i].xC = objectI.x;
                this.objects[i].yC = objectI.y;
                this.objects[i].widthCurrent = objectI.width;
                this.objects[i].heightCurrent = objectI.height;
                this.objects[i].scaleCurrent = objectI.scale;
                console.log("UPDATING EFFECT OUTSIDE1: " + objectI.x + " " + objectI.y);
                
                if(!_.isEmpty(this.objects[i].effect)) {
                    for(let effect of this.objects[i].effect) {
                        if(effect.type === "moveIn") {
                            if(effect.direction === "right") {
                                //console.log("name of object: " +  object.name + " Parent width: " + object.parent.parent.r + " Parent Height: "  + object.parent.height);
                                //console.log(Object.values(object.parent));
                                effect.xS = x + 1;
                                effect.yS = objectI.y;
                                effect.xE = objectI.x;
                                effect.yE = objectI.y;
                                //console.log(effect.xS);
                            }
                            if(effect.direction === "left") {
                                effect.xS = this.objects[i].widthCurrent * -1;
                                effect.xE = objectI.x;
                                effect.yE = objectI.y;
                            }
                        }


                        if(effect.type === "fadeOut") {
                            effect.alphaStarting = 1;
                            effect.alphaEnding = 0;
                        }

                    }   
                    console.log("UPDATING EFFECT: " + this.objects[i].effect);
                }
            }
        }



        



        //this.consoleAllObjects();
        console.log("UPDATING EFFECT OUTSIDE2: " + this.objects[2].name +" " + this.objects[2].xC + " " + this.objects[2].xC);
        this.objectsUpdated.next(this.objects);
        
        // for(let i = 0; i < this.objects.length; i++) {
        //     if(this.objects[i].name === object.name) {
        //         this.objects[i] = sobj;
        //         console.log("OBJECT UPDATED: " + object.name + " " +  this.objects[i].name);
        //     }
        // }

    }

    // scaleCurrent: number;
    // alphaCurrent: number;
    // widthCurrent: number;
    // heightCurrent: number;
    // text: string;

    getLayerPositionInArray(layerName: string): number {
        for(let i = 0; i < this.objects.length; i++) {
            if(this.objects[i].name === layerName) {
                return i;
            }
        }
    
        return -1;
    }

    addEffectToLayer(layerName: string, newEffect: IEffect){
        this.objects[this.getLayerPositionInArray(layerName)].effect.push(newEffect);
        this.consoleAllObjects();
    }


    updateEffectObject(layerName: string, effect: IEffect) {
        for(let i = 0; i < this.objects.length; i++) {
            if(this.objects[i].name === layerName) {
                for(let k = 0; k < this.objects[i].effect.length; k++) {
                  if(this.objects[i].effect[k].type === effect.type) {
                    this.objects[i].effect[k].timeStart = effect.timeStart;
                    this.objects[i].effect[k].timeEnd = effect.timeEnd;
                    this.objects[i].effect[k].direction = effect.direction;
                    console.log("Update: " + effect.type + " " + effect.timeStart + " " + effect.direction);
                  }
                }
            }
        }
        //this.objectsUpdated.next(this.objects);

    }

    removeEffectObject(layerName: string, effect: IEffect): void {
        for(let i = 0; i < this.objects.length; i++) {
            
            if(this.objects[i].name === layerName) {
               
                for(let k = 0; k < this.objects[i].effect.length; k++) {
                  if(this.objects[i].effect[k].type === effect.type) {
                  

                    this.objects[i].effect.splice(k,1);
                    break;
                    // someArray = _.reject(this.objects[i].effect, function(el) { return el.Name === "Kristian"; });
                    // this.objects[i].effect[k] = null;
                    // break;
                    //console.log("Found3: " + this.objects[i].effect[k].type + " removed ");
                  }
                }
            }
        }
        this.consoleAllObjects();
    }

    removeLayerObject(layerName: string) {
        for(let i = 0; i < this.objects.length; i++) {
         
            if(this.objects[i].name === layerName) {
                this.objects.splice(i,1);
            }
        }
        this.consoleAllObjects();
        this.objectsUpdated.next(this.objects);


    }

    getObjects(): IObject[] {
        

        return this.objects;
        
    }

}

// export interface IObject {
//     name: string;
//     objectType: string;
//     xC: number;
//     yC: number;
    // scaleCurrent: number;
    // alphaCurrent: number;
    // widthCurrent: number;
    // heightCurrent: number;
//     text: string;
//     effect: IEffect[];
//   }

// export interface IEffect {
//     type: string;
//     direction: string;
//     timeStart: number;
//     timeEnd: number;

//     xS: number;
//     yS: number;
//     xE: number;
//     yE: number;

//     scaleStarting: number;
//     scaleEnding: number;

//     widthStarting: number;
//     heightStarting: number;

//     widthEnding: number;
//     heightEnding: number;

//     alphaStarting: number;
//     alphaEnding: number;
//   }






// export interface IEffect {
//     type: string;
//     direction: string;
//     start: number;
//     end: number;
//   }