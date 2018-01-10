import { Component, Input } from "@angular/core";
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

import { DragulaService } from "ng2-dragula";

@Component({
    selector: 'timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.css'],

})

export class TimelineComponent {

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
}
