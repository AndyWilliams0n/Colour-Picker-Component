import {Component, EventEmitter, Input, Output} from '@angular/core';

import {RGBToHex} from './functions/conversion.functions';
import {ColoursService} from './services/colours.service';

import {ColourData} from './models/colours.model';

@Component({
    selector: 'cp-colour-picker',
    templateUrl: './colour-picker.component.html',
    styleUrls: ['./colour-picker.component.scss']
})

export class ColourPickerComponent {
    @Input() width = 440;
    @Input() height = 440;
    @Output() colour: EventEmitter<ColourData> = new EventEmitter(true);

    //

    constructor(
        public coloursService: ColoursService
    ) {}

    //

    onChangesMadeToPalette(rgba: string) {
        this.coloursService.rgba = rgba;
        this.coloursService.splitRGB(rgba);
        this.coloursService.hex = RGBToHex(this.coloursService.r, this.coloursService.g, this.coloursService.b);

        this.emitColour(this.coloursService.hex, this.coloursService.rgba);
    }

    onChangesMadeToSlider(hue: string) {
        this.coloursService.hue = hue;
    }

    onChangesMadeToDetails() {
        this.emitColour(this.coloursService.hex, this.coloursService.rgba);
    }

    emitColour(hex, rgba) {
        this.colour.emit({
            hex: hex,
            rgba: rgba
        });

        // LOG
        console.log('COLOURS');
    }
}
