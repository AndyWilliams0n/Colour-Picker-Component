import {Component, EventEmitter, Input, Output} from '@angular/core';

import {ColoursService} from '../services/colours.service';

@Component({
    selector: 'cp-colour-details-mini',
    templateUrl: './colour-details-mini.component.html',
    styleUrls: ['./colour-details-mini.component.scss']
})

export class ColourDetailsMiniComponent {
    @Input() width = 200;
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
