import { Component, Input, AfterViewInit, ViewChild, OnChanges } from "@angular/core";
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { IObject } from "../obj";
import { ObjectService } from "../object.service";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
//import { ViewChild } from "@angular/core/src/metadata/di";
import { EffectComponent } from "./effect.component";
import { IEffect } from "../effect";
import { CompService } from "../comp.service";
import * as _ from 'underscore';

@Component({
    selector: 'time-layer',
    templateUrl: './layer.component.html',
    styleUrls: ['./layer.component.css'],
    animations: [
        trigger('myAnim',[
          state('small', style({
            display: 'none',
            opacity: 0
          })),
          state('large', style({
            display: 'block',
            opacity: 1
          })),
    
          transition('small <=> large', animate('300ms ease-in')),
    
        ]),

        trigger('rotateArrow',[
          state('right', style({
            transform: 'rotate(-90deg)' 
          })),
          state('down', style({
            transform: 'rotate(0deg)' 
          })),
    
          transition('right <=> down', animate('300ms ease-in')),
    
        ])


      ]
})

export class LayerComponent implements OnInit,AfterViewInit, OnChanges {
  
 
  
    widthlayer: string;
    widthlayernamespace: string;
   
    state: string = 'small';
    stateArrow: string = 'right';
    @Input() layerName: string;
    // @Input() object: IObject;
    objects: IObject[] = [];
    whatIn: number[] = [];
    variableOutline: boolean = false;
    @Input() effects: IEffect[] = [];

    @ViewChild(EffectComponent) effect2;


    constructor(private _objectservice: ObjectService, private _compservice: CompService) {

      this._compservice.Observable.subscribe(value => {
        if(this.layerName === value.name){
          this.variableOutline = true;
          console.log("TRUE" + value.name);
        } else {
          this.variableOutline = false;
          console.log("FALSE" + value.name);
        }
      })


      this._compservice.OtimeChange.subscribe(value => {
        console.log("What is number: " + value);
        this.setTimeLength(value);
      })
      
    }

    // selectedG(val) { // your value you want to emit
    //   this._compservice.emitConfig(val);
    // }

    // ngDoCheck(): void {
    //   var changes = this._compservice.getSelected();
    //   if(changes) {
    //     if(this.layerName === this._compservice.getSelectedName()) {
    //       this.variableOutline = true;
    //     }
    //     console.log('changes detected');
    //   } else {
    //     this.variableOutline = false;
    //     console.log('nothing changed');
    //   }
    // }

    isEffectEmpty(): boolean {
      //console.log("Is it empty: " + _.isEmpty(this.effects));
      return  !_.isEmpty(this.effects);
    }

    setTimeLength(num: number) {
      this.widthlayer = (+num +1 )*100 + "px";
      this.widthlayernamespace =  +num*100 + "px";
    }

    arrowRotate() {
      this.stateArrow = (this.stateArrow === 'right') ? 'down' : 'right';
    }

    animateMe() {
        this.state = (this.state === 'small') ? 'large' : 'small';
        this.arrowRotate();
        this.selected();
      }

    selected() {
      console.log("selected!!!");
      //console.log("Whats in object: " + this._objectservice.getObjectByLayerName(this.layerName));
      this._compservice.setSelected(this._objectservice.getObjectByLayerName(this.layerName));
      console.log(this._compservice.getSelectedName());
    }

  

    ngOnInit(): void {
      this.objects = this._objectservice.getObjects();
      this.setTimeLength(this._compservice.comp.timeLength);
      // if(this.effects[0] != null) {
      // console.log("Did objects load: " + this.effects[0].type);
      // }
    }

    ngAfterViewInit(): void {
      //this.whatIn = this.effect2.someRange;
      //console.log("Whats in Effect: " + this.effect2.someRange);
    }

    ngOnChanges(): void {
      //throw new Error("Method not implemented.");
      //console.log("Whats in Effect2: " + this.effect2.someRange);
    }

    removeLayer() {
      console.log("starting to remove layer " + this.layerName);
      this._objectservice.removeLayerObject(this.layerName);
  }

  addEffect() {
    let newEffect: IEffect = {

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
    
    };

    if(this.stateArrow != 'down') {
    this.animateMe();
    }
    this._objectservice.addEffectToLayer(this.layerName, newEffect);
  }

}
