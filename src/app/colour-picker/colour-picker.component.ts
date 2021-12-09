import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

import {RGBToHex} from './functions/conversion.functions';
import {ColoursService} from './services/colours.service';

import {ColourData} from './models/colours.model';

@Component({
    selector: 'cp-colour-picker',
    templateUrl: './colour-picker.component.html',
    styleUrls: ['./colour-picker.component.scss']
})

export class ColourPickerComponent implements OnChanges {
    @Input() width = 380;
    @Input() height = 380;
    @Input() selectWidth = 200;
    @Input() selectHeight = 380;
    @Input() selectMiniWidth = 640;
    @Input() hasColourSelect = true;
    @Input() isResponsive = true;

    @Input() hex = '';

    @Output() colour: EventEmitter<ColourData> = new EventEmitter(true);

    //

    constructor(
        public coloursService: ColoursService
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['hex']) {
            this.coloursService.setPreselectedHex(this.hex);
        }
    }

    //

    onChangesMadeToPalette(rgba: string) {
        this.coloursService.rgba = rgba;
        this.coloursService.splitRGB(rgba);
        this.coloursService.rgb = `rgb(${this.coloursService.r}, ${this.coloursService.g}, ${this.coloursService.b})`;
        this.coloursService.hex = RGBToHex(this.coloursService.r, this.coloursService.g, this.coloursService.b);

        this.emitColour(this.coloursService.hex, this.coloursService.rgb, this.coloursService.rgba);
    }

    onChangesMadeToSlider(pickedColour: string) {
        this.coloursService.pickedColour = pickedColour;
    }

    onChangesMadeToDetails() {
        this.emitColour(this.coloursService.hex, this.coloursService.rgb, this.coloursService.rgba);
    }

    emitColour(hex, rgb, rgba) {
        this.colour.emit({
            hex: `#${hex}`,
            rgb: rgb,
            rgba: rgba
        });
    }
}
