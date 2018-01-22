import { Component, Input, AfterViewInit } from "@angular/core";
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { IObject } from "../obj";
import { ObjectService } from "../object.service";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { ViewChild } from "@angular/core/src/metadata/di";
import { EffectComponent } from "./effect.component";


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
      ]
})

export class LayerComponent implements OnInit,AfterViewInit {
  
  
   
    state: string = 'small';
    @Input() layerName: string;
    // @Input() object: IObject;
    objects: IObject[] = [];
    //whatIn: number[] = [];

    //@ViewChild(EffectComponent) effect;

    constructor(private _objectservice: ObjectService) {
      
    }

    animateMe() {
        this.state = (this.state === 'small') ? 'large' : 'small';
      }

    select() {
      
    }

    ngOnInit(): void {
      this.objects = this._objectservice.getObjects();
    }

    ngAfterViewInit(): void {
      //this.whatIn = this.effect.someRange;
      //console.log("Whats in Effect: " + this.effect.someRange);
    }

}
