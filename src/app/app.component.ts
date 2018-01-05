import { Component } from '@angular/core';
//import { SharedModule } from 'primeng/primeng';
import { OrderListModule } from 'primeng/primeng';
//import {ButtonModule} from 'primeng/primeng';
//import {InputTextModule} from 'primeng/primeng';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ICars } from "./cars";
import {DragulaService} from 'ng2-dragula';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NouisliderModule } from 'ng2-nouislider';


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
export class AppComponent {
  state: string = 'small';
  title = 'app';
  cars:ICars[];
  test2: string = 'hello';
  disabled = true;
  someRange: number[] = [0, 5];
  someRange2: number[] = [0, 5];
  // options: any = {
  //   ignoreInputTextSelection: true
  // }




  constructor(private dragulaService: DragulaService) {
    dragulaService.setOptions('first-bag', {
      moves: (el, source, handle, sibling) => !el.classList.contains('no-drag')
    });
    
     dragulaService.drop.subscribe((value) => {
      console.log(`drag: ${value[0]}`);
      console.log(`drag2: ${value.slice(1)}`);
      this.onDrop(value.slice(1));
    });



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
    }

    animateMe() {
      this.state = (this.state === 'small') ? 'large' : 'small';
    }

    sliderNum() {
      console.log("Top: " + this.someRange2);
      console.log("Bottom: " + this.someRange);
    }

}
