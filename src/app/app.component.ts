import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ICars } from "./cars";
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { IObject } from './obj';
import { forEach } from '@angular/router/src/utils/collection';
import { ObjectService } from './object.service';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { CompService } from './comp.service';
// import { ADDRCONFIG } from 'dns';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ObjectService],
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
export class AppComponent implements OnInit, OnChanges {
 
  objects: IObject[] = [];
  numberText: number = 0;
  title = 'app';
  cars:ICars[];
  test2: string = 'hello';
  disabled = true;
  // options: any = {
  //   ignoreInputTextSelection: true
  // }
  private _objectService;


  constructor(objectService: ObjectService, private _compservice: CompService) {
    this._objectService = objectService;
    //this.objects = [];
  }

  private onDrop(args) {
    let [e,el,c] = args;
    console.log(`drage3: ${e.innerHTML}`);
    console.log(`drage4id: ${e.id}`);
    console.log(`dragel: ${el}`);
    console.log(`dragelc: ${c.innerHTML}`);
  }

  onclick() {
    console.log("PRESSED");
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }

  ngOnInit(): void {
        this.cars = [{brand: "Happy", year: 1989, color:"Red"}, {brand: "Happy2", year: 19892, color:"Red2"}];
        console.log("Happy");
        this.objects = this._objectService.getObjects();
        //this.objects = null;

    }

    ngOnChanges(): void {
      //doesn't work - only for INPUT STUFF
      //this.objects = this._objectService.getObjects();
      //this._objectService.setObjects(this.objects);
    }

    addText() {
      console.log("CLICK!!!");
      this.numberText++;
      this.createObj();
    }

    changeTime(num:number) {
      this._compservice.setTimeLenght(num);
    }

    createObj() {
      let obj: IObject = {


          style: null,
          name: this._objectService.newLayerName(),
          objectType: "text",
          text: "placeholder",
          xC: 25,
          yC: 25,
          scaleCurrent: 1,
          alphaCurrent: 1,
          widthCurrent: 30,
          heightCurrent: 20,
          effect: null
          // effect: [
          //     {
          //         type: "moveIn",
          //         direction: "right",
          //         timeStart: 1,
          //         timeEnd: 3,

          //         xS: 0,
          //         yS: 20,
          //         xE: 30,
          //         yE: 20,

          //         scaleStarting: 1,
          //         scaleEnding: 1,

          //         widthStarting: 20,
          //         heightStarting: 20,
          //         widthEnding: 20,
          //         heightEnding: 20,

          //         alphaStarting: 1,
          //         alphaEnding: 1
          //     }
          //   ]
      };

      this.objects.unshift(obj);
      // console.log(this.objects.length);
      // console.log(this.objects[0].text);
      //this._objectService.setObjects(obj);
      console.log("Service: " + this._objectService.lengthObjects());
      console.log("Internal Length: " + this.objects.length);
      //console.log(this._objectService[0].text);

      
    }

    updateObjects(message: IObject[]): void {
      this.objects = message.slice();
      for(let i = 0; i < this.objects.length; i++) {
        console.log("Main Prog Update: " + this.objects[i].name);
      }
    }
    
}
