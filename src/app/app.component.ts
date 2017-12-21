import { Component } from '@angular/core';
import { OrderListModule } from 'primeng/primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  cars:ICars[];
  test2: string = 'hello';


  ngOnInit() {
        this.cars = [{brand: "Happy", year: 1989, color:"Red"}, {brand: "Happy2", year: 19892, color:"Red2"}];
    }


}

export interface ICars {
  brand: string;
  year: number;
  color: string;
}