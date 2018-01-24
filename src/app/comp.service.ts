import { Injectable } from "@angular/core";
import { IObject } from "./obj";
import { IEffect } from "./effect";
import { ICompMain } from "./compMain";
import { Subject } from "rxjs/Subject";

@Injectable()
export class CompService {
    public Observable = new Subject<IObject>();
    public OtimeChange = new Subject<number>();

    layerNumber: number;

    constructor() {
        this.layerNumber = 1;
    }

    comp: ICompMain = {
        x: 320,
        y: 160,
        timeLength: 4,
        fps: 30,
        selected: null
    }

    // selectedG(trueFalse: boolean) {
    //     this.Observable.next(trueFalse);
    //   }

    getObjects(): ICompMain {
        
        return this.comp;
    }

    setTimeLenght(num: number) {
        this.comp.timeLength = num;
        console.log("number: " + this.comp.timeLength);
        this.OtimeChange.next(this.comp.timeLength);
    }


    setSelected(selected: IObject) {
        this.comp.selected = selected;
        this.Observable.next(this.comp.selected);
    }

    getSelected(): IObject {
        return this.comp.selected;
        //return this.Observable.asObservable();
    }

    getSelectedName(): string {
        return this.comp.selected.name;
    }

}
