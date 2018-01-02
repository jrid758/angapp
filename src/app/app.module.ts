import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {DragulaModule} from 'ng2-dragula';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NouisliderModule } from 'ng2-nouislider';




import { SharedModule, InputTextModule } from "primeng/primeng";
import { ButtonModule } from "primeng/primeng";
import {OrderListModule} from 'primeng/primeng';


@NgModule({
  declarations: [
    AppComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
