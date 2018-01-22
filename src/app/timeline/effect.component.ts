import { Component, Input, OnChanges, Output, EventEmitter } from "@angular/core";
import { IEffect } from "../effect";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { ObjectService } from "../object.service";

@Component({
    selector: 'effect',
    templateUrl: './effect.component.html',
    styleUrls: ['./effect.component.css'],
})


export class EffectComponent implements OnChanges,OnInit {
   
  
   
    min: number = 0;
    max: number = 5;
    
    @Input() layerName: string;
    @Input() effect: IEffect;

    sliderStart: number;
    sliderEnd: number;
    someRange: number[] = [];
    optionSelect: string[] =  ["left","right","top","bottom"];
    directionSelected: string;

    constructor(private _objectservice: ObjectService) {

    }

    sliderNum() {
        //console.log("Bottom: " + this.someRange);
        console.log("BottomOnChanges: " + this.someRange + " " + this.someRange[0] + " " + this.someRange[1]);
        this.effect.timeStart = this.someRange[0];
        this.effect.timeEnd = this.someRange[1];
        this._objectservice.updateEffectObject(this.layerName, this.effect);
        this._objectservice.consoleAllObjects();
      }
    
      ngOnChanges(): void {
        //throw new Error("Method not implemented.");
        //console.log("BottomOnChanges: " + this.someRange + " " + this.someRange[0] + " " + this.someRange[1]);
    }


    ngOnInit(): void {
        this.sliderStart = this.effect.timeStart;
        this.sliderEnd = this.effect.timeEnd;
        this.someRange = [this.sliderStart, this.sliderEnd];
        if(this.effect.type === "moveIn" || this.effect.type === "moveOut") {
            this.directionSelected = this.effect.direction;
            console.log("DirectionSelected: " + this.directionSelected);
        }
    }

    updateSelect() {

        console.log("ChangedX" + this.directionSelected)
        this.effect.direction = this.directionSelected;
        this._objectservice.updateEffectObject(this.layerName, this.effect);
        this._objectservice.consoleAllObjects();
    }

    updateSelectedOption() {

    }
}




