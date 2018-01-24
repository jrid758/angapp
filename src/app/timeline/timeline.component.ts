import { Component, Input, OnChanges, Output, EventEmitter, Pipe, PipeTransform } from "@angular/core";
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

import { DragulaService } from "ng2-dragula";
//import { EventEmitter } from "@angular/core/src/event_emitter";
import { IObject } from "../obj";
import { ObjectService } from "../object.service";
import { OnInit, AfterViewInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { CompService } from "../comp.service";

@Pipe({name: 'demoNumber'})
export class DemoNumber implements PipeTransform {
  transform(value, args:string[]) : any {
    let res = [];
    for (let i = 0; i < value; i++) {
        res.push(i);
      }
      return res;
  }
}



@Component({
    selector: 'timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.css'],

})

export class TimelineComponent implements OnChanges, OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    
  }
  

    // @Input() objects: IObject[];
    // @Output() updateObjects: EventEmitter<IObject[]> = new EventEmitter<IObject[]>();
    // @Input() num: number;
    objects: IObject[] = [];
    //test: IObject;
    //lineTimes: number[] = [0,1,2,3,4,5];
    timeLength: number;
    widthtimelineWrap: string;
    timelineNumbers: string;

    constructor(private dragulaService: DragulaService, private _objectservice: ObjectService, private _compservice: CompService) {

        this.objects = [];

        dragulaService.setOptions('first-bag', {
          moves: (el, source, handle, sibling) => !el.classList.contains('no-drag')
        });
        
         dragulaService.drop.subscribe((value) => {
          //console.log(`drag: ${value[0]}`);
          //console.log(`drag: ${value[1]}`);
          //console.log(`drag2: ${value.slice(1)}`);
          this.onDrop(value.slice(1));
          
          //this.whatsInObjects();
          
        });


        this._compservice.OtimeChange.subscribe(value => {
          console.log("What is numberX1: " + value);
          this.setTimeLength(value);
        })
      }

      deselectObjects() {
        console.log("FIREDED deselect");
        let newBlank: IObject = {
          name: null,
          objectType: null,
          xC: null,
          yC: null,
          scaleCurrent: null,
          alphaCurrent: null,
          widthCurrent: null,
          heightCurrent: null,
          text: null,
          style: null,
          effect: null,
        }
        this._compservice.setSelected(newBlank);
      }

      setTimeLength(num: number) {
        this.timeLength = +num + 1;
        this.widthtimelineWrap =  (+num + 1 ) * 100 + "px";
        this.timelineNumbers = +num * 100 + "px";
        console.log("What is numberX2: " + num);
      }


      whatsInObjects() {
        for(var i in this.objects) {
          console.log("B: "+ this.objects[i].name);
        }
      }

      ngOnInit(): void {
        this.objects = this._objectservice.getObjects();
        console.log("Init");
        this.setTimeLength(this._compservice.comp.timeLength);
        
      }

      ngOnChanges(): void {
        //console.log("NUMBER INSIDE: " + this.num);
        // console.log("What is this:" + this.objects.length);
        // if(this.objects.length != 0) {
        //   console.log("What is text in obj:" + this.objects[0].name);
        // }
        //console.log("Getting Update: " + this._compservice.getSelected());
        
      }

      private onDrop(args) {
        let [e,el,c] = args;
        //console.log(`drage1-------: ${e.innerHTML}`);
        //console.log(`drage2-------: ${e.id}`);
        //console.log(`drage3-------: ${el.innerHTML}`);
        //console.log(names[1].innerHTML);
        //console.log("***********************");
        //console.log(`drage4-------: ${c.innerHTML}`);
        this.orderofLayers();
      }

      orderofLayers() {
        let names = document.querySelectorAll('.layername');
        let layerOrder: any[] = [];
        console.log("***********************" + names.length + " " + names[3]);
        for(let i = 0; i < names.length - 1;i++) {
          //console.log("Num: " +i);
          //console.log(names[i].innerHTML.substr(0,names[i].innerHTML.lastIndexOf("<span")));
          layerOrder.push(names[i].innerHTML.substr(0,names[i].innerHTML.lastIndexOf("<span")).trim());
        }
        for(let i = 0; i < layerOrder.length;i++) {
          console.log("K: " + layerOrder[i]);
          if(layerOrder[i] === "Layer 1"){
            console.log("Matched");
          }
        }

        let newArray: IObject[] = [];
        for(let j = 0; j < this.objects.length ; j++) {
          for(let k = 0; k < this.objects.length ; k++) {
            if(layerOrder[j] === this.objects[k].name) {
              newArray.push(this.objects[k]);
            }
          }
        }
        console.log("Start");
        this._objectservice.updateAllObjects(newArray);
        this.objects = this._objectservice.getObjects();

        // newArray.push({name: "Layer 5",
        //   objectType: "text",
        //   effect: null,
        //   text: "placeholder"});
        //console.log(names[0].innerHTML.substr(0,names[0].innerHTML.lastIndexOf("<span")));
        console.log("***********************");
        //this.updateObjects.emit(newArray);
        for(let i = 0; i < this._objectservice.lengthObjects();i++) {
          console.log("N: " + newArray[i].name);
        }

        for(let i = 0; i < this._objectservice.lengthObjects();i++) {
          console.log("B: " + this.objects[i].name);
        }

        let test: IObject[] = [];
        test = this._objectservice.getObjects();
        for(let i = 0; i < this._objectservice.lengthObjects();i++) {
          console.log("M: " + test[i].name);
        }


        }
}