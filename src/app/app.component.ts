import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ICars } from "./cars";
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { IObject } from './obj';
import { forEach } from '@angular/router/src/utils/collection';
import { ObjectService } from './object.service';




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
export class AppComponent implements OnInit {
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


  constructor(objectService: ObjectService) {
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

    addText() {
      console.log("CLICK!!!");
      this.numberText++;
      this.createObj();
    }

    createObj() {
      let obj: IObject = {
      name: "Layer " + (this.objects.length + 1),
      objectType: "text",
      text: "placeholder",
      effect: null
      };
      this.objects.unshift(obj);
      console.log(this.objects.length);
      console.log(this.objects[0].text);
    }

    updateObjects(message: IObject[]): void {
      this.objects = message.slice();
      for(let i = 0; i < this.objects.length; i++) {
        console.log("Main Prog Update: " + this.objects[i].name);
      }
    }
    
}
