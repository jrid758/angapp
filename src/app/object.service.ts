import { Injectable } from "@angular/core";
import { IObject } from "./obj";
import { IEffect } from "./effect";

@Injectable()
export class ObjectService {

    layerNumber: number;
    constructor() {
        this.layerNumber = 1;
    }
    objects: IObject[] = [
        {
            name: "Layer 3",
            objectType: "text",
            text: "placeholder",
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
            widthCurrent: 30,
            heightCurrent: 20,
            effect: [
                {
                    type: "moveIn",
                    direction: "right",
                    timeStart: 1,
                    timeEnd: 3,

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
            text: "placeholder",
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
            widthCurrent: 30,
            heightCurrent: 20,
            effect: [
                {
                    type: "fadeOut",
                    direction: "",
                    timeStart: 1,
                    timeEnd: 5,

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
                    alphaEnding: 0
                }
            ]
        },
        {
            name: "Layer 1",
            objectType: "text",
            text: "placeholder",
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
            widthCurrent: 30,
            heightCurrent: 20,
            effect: [
                {
                    type: "moveIn",
                    direction: "right",
                    timeStart: 1,
                    timeEnd: 3,

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
        }
    ];

    consoleAllObjects(): void {
        for(let i = 0; i < this.objects.length; i++) {
            if(this.objects[i].effect != null) {
            console.log("Did " + this.objects[i].name  + " change Start: " + this.objects[i].effect[0].timeStart);
            console.log("Did " + this.objects[i].name  + " change End: " + this.objects[i].effect[0].timeEnd);
            console.log("Did " + this.objects[i].name  + " direction change " + this.objects[i].effect[0].direction);
            }
        }
    }

    lengthObjects(): number {
        return this.objects.length;
    }

    setObjects(insert: IObject): void {
        this.objects.unshift(insert);
    }

    updateAllObjects(newArray: IObject[]): void {
        this.objects = newArray;
        console.log("finished updating all objects")
    }
 
    getObjectByLayerName(layerName: string): IObject {
        for(let i = 0; i < this.objects.length; i++) {
            if(this.objects[i].name === layerName) {
               return this.objects[i];
            }
        }
    }

    updateEffectObject(layerName: string, effect: IEffect) {
        for(let i = 0; i < this.objects.length; i++) {
            if(this.objects[i].name === layerName) {
                for(let k = 0; k < this.objects.length; k++) {
                  if(this.objects[i].effect[k].type === effect.type) {
                    this.objects[i].effect[k].timeStart = effect.timeStart;
                    this.objects[i].effect[k].timeStart = effect.timeEnd;
                  }
                }
            }
        }


    }

    getObjects(): IObject[] {
        
        console.log("finished getting objects");
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