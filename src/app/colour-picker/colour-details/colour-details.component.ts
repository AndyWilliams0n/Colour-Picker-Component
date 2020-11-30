import {Component, EventEmitter, Input, Output} from '@angular/core';

import {ColoursService} from '../services/colours.service';

@Component({
    selector: 'cp-colour-details',
    templateUrl: './colour-details.component.html',
    styleUrls: ['./colour-details.component.scss']
})

export class ColourDetailsComponent {
    @Input() width = 200;
    @Input() height = 380;
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
