import {Component, EventEmitter, Input, Output} from '@angular/core';

import {ColoursService} from '../services/colours.service';

import {SelectedColours} from '../models/colours.model';

@Component({
    selector: 'cp-colour-details',
    templateUrl: './colour-details.component.html',
    styleUrls: ['./colour-details.component.scss']
})

export class ColourDetailsComponent {
    @Input() width = 200;
    @Input() height = 400;
    @Output() colour: EventEmitter<string> = new EventEmitter(true);

    //

    constructor(
        public coloursService: ColoursService
    ) {}

    //

    setHex(hex: string) {
        this.coloursService.setPreselectedHex(hex);
        this.colour.next();
    }
}
