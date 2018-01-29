import { Injectable } from "@angular/core";
import { IObject } from "./obj";
import { IEffect } from "./effect";
import { ICompMain } from "./compMain";
import { Subject } from "rxjs/Subject";
import { ObjectService } from "./object.service";

@Injectable()
export class CompService {
    public Observable = new Subject<IObject>();
    public OtimeChange = new Subject<number>();
    //public Oclicked = new Subject<string>();

    layerNumber: number;

    constructor(private _objectservice: ObjectService) {
        this.layerNumber = 1;

        // this.Oclicked.subscribe((name: string) => {
            
        // }

        // );

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

    get x(): number {
        return this.comp.x;
    }

    get y(): number {
        return this.comp.y;
    }

    getObjects(): ICompMain {
        
        return this.comp;
    }

    getCompSelectedValues(): ICompMain {
        
        return this.comp;
    }

    setTimeLenght(num: number) {
        this.comp.timeLength = num;
        console.log("number: " + this.comp.timeLength);
        this.OtimeChange.next(this.comp.timeLength);
    }


    setSelected(selected: IObject) {
        this.comp.selected = selected;
        console.log("New selected Name: " + this.comp.selected.name);
        this.Observable.next(this.comp.selected);
    }

    setSelectedByName(name: string) {
        console.log("Setting setSelectedByName: " + name);
        this.comp.selected = this._objectservice.getObjectByLayerName(name);
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
