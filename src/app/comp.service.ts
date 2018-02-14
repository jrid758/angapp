import { Injectable } from "@angular/core";
import { IObject } from "./obj";
import { IEffect } from "./effect";
import { ICompMain } from "./compMain";
import { Subject } from "rxjs/Subject";
import { ObjectService } from "./object.service";
import * as _ from 'underscore';

@Injectable()
export class CompService {
    public Observable = new Subject<IObject>();
    public OtimeChange = new Subject<number>();
    //public Oclicked = new Subject<string>();

    layerNumber: number;
    comp: ICompMain;

    constructor(private _objectservice: ObjectService) {
        this.layerNumber = 1;

        // this.Oclicked.subscribe((name: string) => {
            
        // }

        // );
        
        this.comp = {
            x: 300,
            y: 250,
            timeLength: 4,
            fps: 30,
            selected: null
        }

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
       
        this.OtimeChange.next(this.comp.timeLength);
    }

    setSelectedNoEvent(selected: IObject) {
        console.log("No Event select: " + selected.name);
        this.comp.selected = selected;
    }

    setSelected(selected: IObject) {
        if(!_.isNull(selected)) {
         this.comp.selected = selected;
        } else {
      
            this.comp.selected = null;
        }
        //console.log("setSelected name: " + this.comp.selected.name);
        this.Observable.next(this.comp.selected);
    }

    setSelectedByName(name: string) {
   
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
