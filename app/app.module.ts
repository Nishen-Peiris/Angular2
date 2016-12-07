import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EditorComponent }  from './app.editorComponent';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ EditorComponent ],
  bootstrap:    [ EditorComponent ]
})
export class AppModule { }
