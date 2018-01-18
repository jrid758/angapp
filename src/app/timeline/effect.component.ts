import { Component, Input, OnChanges, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'effect',
    templateUrl: './effect.component.html',
    styleUrls: ['./effect.component.css'],
})


export class EffectComponent {
    someRange: number[] = [1.5, 5];
    @Input() layerName: string;

    sliderNum() {
        console.log("Bottom: " + this.someRange);
      }
}




