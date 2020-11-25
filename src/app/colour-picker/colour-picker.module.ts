import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ColourPickerComponent} from './colour-picker.component';

import {ColourPaletteComponent} from './colour-palette/colour-palette.component';
import {ColourSliderComponent} from './colour-slider/colour-slider.component';
import {ColourDetailsComponent} from './colour-details/colour-details.component';

import {ColoursService} from './services/colours.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        ColourPickerComponent
    ],
    declarations: [
        ColourPickerComponent,

        ColourPaletteComponent,
        ColourSliderComponent,
        ColourDetailsComponent
    ],
    providers: [
        ColoursService
    ]
})

export class ColourPickerModule {}
