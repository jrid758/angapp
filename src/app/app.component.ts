import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ICars } from "./cars";
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';



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
export class AppComponent implements OnInit {
  title = 'app';
  cars:ICars[];
  test2: string = 'hello';
  disabled = true;
  // options: any = {
  //   ignoreInputTextSelection: true
  // }




  constructor() {

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

  ngOnInit() {
        this.cars = [{brand: "Happy", year: 1989, color:"Red"}, {brand: "Happy2", year: 19892, color:"Red2"}];
        console.log("Happy");
    }


}
