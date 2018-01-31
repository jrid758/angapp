import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
    // console.log(`drage3: ${e.innerHTML}`);
    // console.log(`drage4id: ${e.id}`);
    // console.log(`dragel: ${el}`);
    // console.log(`dragelc: ${c.innerHTML}`);
  }

  onclick() {

  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }

  ngOnInit(): void {
        this.objects = this._objectService.getObjects();
        //this.objects = null;

    }

    ngOnChanges(): void {
      //doesn't work - only for INPUT STUFF
      //this.objects = this._objectService.getObjects();
      //this._objectService.setObjects(this.objects);
    }

    addText() {
      this.numberText++;
      this.createObj();
    }

    changeTime(num:number) {
      this._compservice.setTimeLenght(num);
    }

    createObj() {
      let obj: IObject = {


          style: {
            align: 'center',
            breakWords: 'false',
            fontFamily: 'Arial',
            fontSize: 30,
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontVariant: 'normal',
            fill: '#ffffff', // gradient
            stroke: '#000000',
            strokeThickness: 3,
            lineJoin: 'round',
            leading: 0,
            letterSpacing: 0,
            lineHeight: 0,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 3,
            dropShadowAlpha: 1,
            wordWrap: true,
            wordWrapWidth: 440
          },
          name: this._objectService.newLayerName(),
          objectType: "text",
          text: "placeLayer4",
          xC: 200,
          yC: 50,
          scaleCurrent: 1,
          alphaCurrent: 1,
          widthCurrent: 170,
          heightCurrent: 40,
          effect: []
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

      // export interface ITextStyle {
      //   align: string,
      //   breakWords: string,
      //   fontFamily: string,
      //   fontSize: number,
      //   fontStyle: string,
      //   fontWeight: string,
      //   fontVariant: string,
      //   fill: string, // gradient
      //   stroke: string,
      //   strokeThickness: number,
      //   lineJoin: string,
      //   leading: number,
      //   letterSpacing: number,
      //   lineHeight: number,
      //   dropShadow: true,
      //   dropShadowColor: string,
      //   dropShadowBlur: number,
      //   dropShadowAngle: number,
      //   dropShadowDistance: number,
      //   dropShadowAlpha: number,
      //   wordWrap: true,
      //   wordWrapWidth: number
      // }
      this._compservice.setSelectedNoEvent(obj);
      this._objectService.setObjects(obj);
      
      this._compservice.setSelected(obj);
      this._objectService.objectsUpdated.next(obj);
      
      //this.objects.unshift(obj);
      //this._objectService.
      // console.log(this.objects.length);
      // console.log(this.objects[0].text);
      //this._objectService.setObjects(obj);
      //console.log(this._objectService[0].text);

      
    }

    updateObjects(message: IObject[]): void {
      this.objects = message.slice();
      for(let i = 0; i < this.objects.length; i++) {
      }
    }
    
}
