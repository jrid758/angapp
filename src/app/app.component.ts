import { Component } from '@angular/core';
//import { SharedModule } from 'primeng/primeng';
import { OrderListModule } from 'primeng/primeng';
//import {ButtonModule} from 'primeng/primeng';
//import {InputTextModule} from 'primeng/primeng';
import { ICars } from "./cars";
import {DragulaService} from 'ng2-dragula';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('myAnim',[
      state('small', style({
        transform: 'scale(1)',
      })),
      state('large', style({
        transform: 'scale(1.2)',
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
  options: any = {
    ignoreInputTextSelection: true
  }

  constructor(private dragulaService: DragulaService) {
    dragulaService.setOptions('first-bag', {
      moves: (el, source, handle, sibling) => !el.classList.contains('no-drag')
    });
    
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

}
