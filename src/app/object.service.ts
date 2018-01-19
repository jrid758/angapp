import { Injectable } from "@angular/core";
import { IObject } from "./obj";
import { IEffect } from "./effect";

@Injectable()
export class ObjectService {

    layerNumber: number;
    constructor() {
        this.layerNumber = 1;
    }
    objects: IObject[] = this.objects = [
        {
            name: "Layer 3",
            objectType: "text",
            text: "placeholder",
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
        },
        {
            name: "Layer 2",
            objectType: "text",
            text: "placeholder",
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
        },
        {
            name: "Layer 1",
            objectType: "text",
            text: "placeholder",
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