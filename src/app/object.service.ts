import { Injectable } from "@angular/core";
import { IObject } from "./obj";


@Injectable()
export class ObjectService {

    layerNumber: number;
    constructor() {
        this.layerNumber = 1;
        //name: "Layer " + (this.layerNumber + 1),
    }


    getObjects(): IObject[] {
        return [
            {
                name: "Layer 3",
                objectType: "text",
                text: "placeholder",
                effect: null
            },
            {
                name: "Layer 2",
                objectType: "text",
                text: "placeholder",
                effect: null
            },
            {
                name: "Layer 1",
                objectType: "text",
                text: "placeholder",
                effect: null
            }
        ]
    }

}

// export interface IEffect {
//     type: string;
//     direction: string;
//     start: number;
//     end: number;
//   }