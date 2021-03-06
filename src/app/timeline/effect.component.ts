import { Component, Input, OnChanges, Output, EventEmitter } from "@angular/core";
import { IEffect } from "../effect";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { ObjectService } from "../object.service";
import { CompService } from "../comp.service";

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
    effectLength: string;

    constructor(private _objectservice: ObjectService,private _compservice: CompService) {
        this._compservice.OtimeChange.subscribe(value => {
            console.log("What is number: " + value);
            this.changeLength(value);
          })
    }

    sliderNum() {
        //console.log("Bottom: " + this.someRange);
        let updateObject = this._objectservice.getObjectByLayerName(this.layerName);

        this.effect.timeStart = this.someRange[0];
        this.effect.timeEnd = this.someRange[1];

        if(this.effect.type === "moveIn") {
            if(this.effect.direction === "right") {
                 this.effect.xS = this._compservice.comp.x + 1;
            }
            if(this.effect.direction === "left") {
                this.effect.xS = updateObject.widthCurrent * -1;
           }
            this.effect.yS = updateObject.yC
            this.effect.xE = updateObject.xC
            this.effect.yE = updateObject.yC
        }

        if(this.effect.type === "fadeOut") {
        
            this.effect.alphaStarting = 1;
            this.effect.alphaEnding = 0;
        
        }

     


        console.log(this.effect.xS + "Y ends: " +  this.effect.yS);
        this._objectservice.updateEffectObject(this.layerName, this.effect);
        this._objectservice.consoleAllObjects();
      }
    
      ngOnChanges(): void {
        //throw new Error("Method not implemented.");
        //console.log("BottomOnChanges: " + this.someRange + " " + this.someRange[0] + " " + this.someRange[1]);
    }


    ngOnInit(): void {
        this.changeLength(this._compservice.comp.timeLength);
        this.sliderStart = this.effect.timeStart;
        this.sliderEnd = this.effect.timeEnd;
        this.someRange = [this.sliderStart, this.sliderEnd];
        if(this.effect.type === "moveIn" || this.effect.type === "moveOut") {
            this.directionSelected = this.effect.direction;
        }
    }

    changeLength(num: number) {
        this.effectLength = (+num * 100) + 'px';
        this.max = +num;
    }

    updateSelect(selected) {
        let updateObject = this._objectservice.getObjectByLayerName(this.layerName);
        console.log("SELECED: " + selected);
        let slicedSelected = selected.slice(3);
        console.log("SELECED: " + slicedSelected);
        this.effect.direction = slicedSelected;
        this._objectservice.updateEffectObject(this.layerName, this.effect);
        this._objectservice.consoleAllObjects();



        if(this.effect.direction === "right") {
            this.effect.xS = this._compservice.comp.x + 1;
       }
       if(this.effect.direction === "left") {
           this.effect.xS = updateObject.widthCurrent * -1;
      }
    }

    updateSelectedOption() {

    }

    removeEffect() {
        this._objectservice.removeEffectObject(this.layerName, this.effect);
    }
}




