import { Component } from '@angular/core';
//import { SharedModule } from 'primeng/primeng';
import { OrderListModule } from 'primeng/primeng';
//import {ButtonModule} from 'primeng/primeng';
//import {InputTextModule} from 'primeng/primeng';
import { ICars } from "./cars";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  cars:ICars[];
  test2: string = 'hello';
  disabled = true;

  onclick() {
    console.log("PRESSED");
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }

  ngOnInit() {
        this.cars = [{brand: "Happy", year: 1989, color:"Red"}, {brand: "Happy2", year: 19892, color:"Red2"}];
    }



}
