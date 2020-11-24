import {Component, EventEmitter, Input, Output} from '@angular/core';

import {RGBToHex} from './functions/conversion.functions';

export interface ColourData {
    hex: string;
    rgba: string;
}

@Component({
    selector: 'cp-colour-picker',
    templateUrl: './colour-picker.component.html',
    styleUrls: ['./colour-picker.component.css']
})

export class ColourPickerComponent {
    @Input() width = 440;
    @Input() height = 440;

    @Output() colours: EventEmitter<ColourData> = new EventEmitter(true);

    public hue: string;

    public colour: string;
    public hex: string;

    public r: number;
    public g: number;
    public b: number;
    public a: number;

    //

    changesMadeToPalette(rgb) {
        this.splitRGB(rgb);

        this.colour = rgb;
        this.hex = RGBToHex(this.r, this.g, this.b);

        this.changesMade(this.hex, this.colour);
    }

    changesMadeToSlider(rgb) {
        this.hue = rgb;
    }

    changesMade(hex, rgba) {
        this.colours.emit({
            hex: hex,
            rgba: rgba
        });
    }

    //

    splitRGB(rgba: string = '') {
        rgba = rgba.replace('rgba', '');
        rgba = rgba.replace('rgb', '');
        rgba = rgba.replace('(', '');
        rgba = rgba.replace(')', '');

        const rgbSplit = rgba.split(',');

        this.r = parseInt(rgbSplit[0]);
        this.g = parseInt(rgbSplit[1]);
        this.b = parseInt(rgbSplit[2]);
        this.a = parseInt(rgbSplit[3]);
    }
}
