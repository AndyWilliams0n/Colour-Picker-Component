import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

import {ColoursService} from '../services/colours.service';

@Component({
    selector: 'cp-colour-details',
    templateUrl: './colour-details.component.html',
    styleUrls: ['./colour-details.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ColourDetailsComponent {
    @Input() width = 200;
    @Input() height = 380;
    @Input() hasColourSelect = true;

    @Output() colour: EventEmitter<string> = new EventEmitter(true);

    //

    constructor(
        public coloursService: ColoursService
    ) {}

    //

    setHex(hex: string) {
        this.coloursService.hue = '';

        setTimeout(() => {
            this.coloursService.setPreselectedHex(hex);

            setTimeout(() => {
                this.colour.next();
            }, 10);
        }, 10);
    }
}
