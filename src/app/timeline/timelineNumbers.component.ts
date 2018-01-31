import { Component, Input, OnChanges, Output, EventEmitter } from "@angular/core";
import { IEffect } from "../effect";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { ObjectService } from "../object.service";
import { CompService } from "../comp.service";

@Component({
    selector: 'timelineNumbers',
    templateUrl: './timelineNumbers.component.html',
    styleUrls: ['./timelineNumbers.component.css'],
})


export class TimelineNumbersComponent{

    
   
    @Input() number: number;
    notthisNumber: number;
    numberspace: string;
    blankspace: string;


    constructor(private _compservice: CompService) {
        this.timeLenght(this._compservice.comp.timeLength);

        this._compservice.OtimeChange.subscribe(value => {
            this.timeLenght(value);
          })
    }


    // ngOnInit() {
    //     this.timeLength(this._compservice.comp.timeLength);
    // }

    timeLenght(num: number) {
         this.notthisNumber = num;
         let minsone = (+num + 1) * 10;
         let firstpart = (num * 100) - minsone;
         let secondpart =  firstpart/num;
         this.blankspace = secondpart + "px";
     }
}

