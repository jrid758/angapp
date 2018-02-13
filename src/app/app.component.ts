import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { IObject } from './obj';
import { forEach } from '@angular/router/src/utils/collection';
import { ObjectService } from './object.service';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { CompService } from './comp.service';
import * as _ from 'underscore';
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
  myFile: File;
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


  fileChangeVideo(event: EventTarget,callback=this.createVideo.bind(this)){
    //console.log("Whats in:" + files[0].slice() );
    // let test = files[0].slice();
    // console.log("Blob: " + test + test.testgetAsText());



    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        let files: FileList = target.files;
        this.myFile = files[0];
        //console.log(files[0].slice());
        let reader = new FileReader();
        
        reader.readAsDataURL(files[0].slice());
        //let imageBlob;
        
        reader.onload = function() {
          let base64data = reader.result;                
          //console.log("Data: " + base64data);
          callback(base64data);
          //this.createImage(base64data);

      }
    }





  fileChange(event: EventTarget,callback=this.createImage.bind(this)){
    //console.log("Whats in:" + files[0].slice() );
    // let test = files[0].slice();
    // console.log("Blob: " + test + test.testgetAsText());



    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        let files: FileList = target.files;
        this.myFile = files[0];
        //console.log(files[0].slice());
        let reader = new FileReader();
        
        reader.readAsDataURL(files[0].slice());
        //let imageBlob;
        
        reader.onload = function() {
          let base64data = reader.result;                
          //console.log("Data: " + base64data);
          callback(base64data);
          //this.createImage(base64data);

      }
      //console.log("Data2: " + imageBlob);
  
        // console.log(this.myFile.slice());
        // let reader = new FileReader();
        // console.log(reader.readAsDataURL(this.myFile.slice()));

    //________________________________________

    // this.myFile = event[0];
    // let reader = new FileReader();
    // console.log(reader.readAsText(this.myFile));
    // reader.onload = function(e) {
    //   let src = e.target['result'];
    //         let image = src;
    // }


    //________________________________________
    
    // console.log("Whats in2:" + this.myFile);

    // if(this.myFile !== null && typeof this.myFile === 'object') {
    //   console.log("Whats in file(Inside): " + this.myFile);
    //   let textType = /image.*/;
     
    //   if (this.myFile.type.match(textType)) {
    //       let reader = new FileReader();
    //       console.log("inside fired2");
    //       reader.onload = function(e) {
    //              //console.log("inside fired3" + reader.result);
    //              let image = reader.result;
                 
    //              //console.log("GLOBAL test: " + GLOBAL.depthNumber);
                
    //               // create an off-screen canvas

    //               $('#imageShow').empty();
    //               $('#imageShow').append('<img id="getPic" src="' + image + '" />');

    //              let canvas = document.createElement('canvas');
    //              let ctx = canvas.getContext('2d');

    //              // set its dimension to target size
    //              canvas.width = 1024;
    //              canvas.height = 1024;

    //              let src2 = document.getElementById("getPic");
    //              console.log("YES: " + src2.width + "&" + src2.height)
    //              //console.log("Did src2 work: " + src2);
    //              // draw source image into the off-screen canvas:
    //              ctx.drawImage(src2, 0, 0, 1024, 1024);
    //              let finishedImage = canvas.toDataURL();
    //              console.log("Everything Done");

    //              // encode image to data-uri with base64 version of compressed image
                 

    //               document.getElementById("fileInput").value = "";
    //              callback(renderer, stage, GLOBAL, finishedImage, src2.width, src2.height);     
    //       }
    //       reader.readAsDataURL(file);
    //  } else {
    //       console.log("Not Supported");
    //   }
  // }


   
}

// addImage(renderer, stage, GLOBAL, image, preW, preH) {

//   //let randomName = "image" + GLOBAL.depthNumber;
//   console.log("RESSSSET Loader");
//   PIXI.loader.reset();
//   console.log("RESSSSET Loader");
//   PIXI.loader.add(image).load(this.setupImage.bind(this,renderer, stage, GLOBAL, image, preW, preH));
  

// }


  onclick() {

  }

  startPreview() {
    
  }

  onTextChange(text: string) {
    let updateObject = this._objectService.getObjectByLayerName(this._compservice.comp.selected.name);
    updateObject.text = text;
    this._objectService.objectsUpdated.next(this.objects);
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

    createVideo(videoLoad: any) {
      let obj: IObject = {
        style: null,
        name: this._objectService.newLayerName(),
        objectType: "video",
        text: null,
        image: null,
        video: videoLoad,
        xC: 10,
        yC: 10,
        scaleCurrent: 1,
        alphaCurrent: 1,
        widthCurrent: 40,
        heightCurrent: 40,
        effect: []
    };

    //console.log("Obj: " + obj.image);
    this._compservice.setSelectedNoEvent(obj);
    this._objectService.setObjects(obj);
    this._compservice.setSelected(obj);
    }

    createImage(imageLoad: any) {
      let obj: IObject = {
        style: null,
        name: this._objectService.newLayerName(),
        objectType: "image",
        text: null,
        video: null,
        image: imageLoad,
        xC: 50,
        yC: 50,
        scaleCurrent: 1,
        alphaCurrent: 1,
        widthCurrent: 170,
        heightCurrent: 40,
        effect: []
    };

    //console.log("Obj: " + obj.image);
    this._compservice.setSelectedNoEvent(obj);
    this._objectService.setObjects(obj);
    this._compservice.setSelected(obj);
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
          text: "place" + this._objectService.newLayerName(),
          image: null,
          video: null,
          xC: 200,
          yC: 50,
          scaleCurrent: 1,
          alphaCurrent: 1,
          widthCurrent: 170,
          heightCurrent: 40,
          effect: []
      };




      
      this._compservice.setSelectedNoEvent(obj);
      this._objectService.setObjects(obj);
      this._compservice.setSelected(obj);


      
    }

    updateObjects(message: IObject[]): void {
      this.objects = message.slice();
      for(let i = 0; i < this.objects.length; i++) {
      }
    }
    
}
