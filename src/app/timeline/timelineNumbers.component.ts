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
        console.log("TimeLength: " + this.notthisNumber );

        this._compservice.OtimeChange.subscribe(value => {
            console.log("What is number TimeNumers: " + value);
            this.timeLenght(value);
          })
    }


    // ngOnInit() {
    //     this.timeLength(this._compservice.comp.timeLength);
    // }

    timeLenght(num: number) {
         this.notthisNumber = num;
         let minsone = (+num + 1) * 10;
         console.log("mFirst part: " + minsone + " & " + num);
         let firstpart = (num * 100) - minsone;
         console.log("First part: " + firstpart);
         let secondpart =  firstpart/num;
         console.log("Second part: " + secondpart);
         this.blankspace = secondpart + "px";
         console.log("Blankspae: " + this.blankspace);
     }
}

