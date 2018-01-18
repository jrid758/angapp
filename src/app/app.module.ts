import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {DragulaModule} from 'ng2-dragula';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NouisliderModule } from 'ng2-nouislider';
import { LayerComponent } from './timeline/layer.component';


import { SharedModule, InputTextModule } from "primeng/primeng";
import { ButtonModule } from "primeng/primeng";
import {OrderListModule} from 'primeng/primeng';
import { TimelineComponent } from './timeline/timeline.component';
import { CompComponent } from './comp/comp.component';
import { EffectComponent } from './timeline/effect.component';
import { ObjectService } from './object.service';


@NgModule({
  declarations: [
    AppComponent,
    LayerComponent,
    TimelineComponent,
    CompComponent,
    EffectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    OrderListModule,
    DragulaModule,
    NouisliderModule,

    

    ButtonModule,
    SharedModule,
    InputTextModule
  ],
  providers: [ObjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
