import { Injectable } from "@angular/core";
import { IObject } from "./obj";
import { IEffect } from "./effect";
import { ICompMain } from "./compMain";

@Injectable()
export class CompService {

    layerNumber: number;
    constructor() {
        this.layerNumber = 1;
    }
    comp: ICompMain = {
        x: 320,
        y: 160,
        timeLength: 5,
        fps: 30,
        selected: null
    }

    getObjects(): ICompMain {
        
        return this.comp;
    }

    setSelected(selected: IObject) {
        this.comp.selected = selected;
    }

    getSelected(): IObject {
        return this.comp.selected;
    }

}
