import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { ColourPickerModule } from './colour-picker/colour-picker.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ColourPickerModule
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}
