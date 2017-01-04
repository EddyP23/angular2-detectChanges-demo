import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { DemoModule } from './demo-module/demo.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        DemoModule
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
