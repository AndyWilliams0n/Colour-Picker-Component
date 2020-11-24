import {Component, Input} from '@angular/core';

@Component({
    selector: 'cp-colour-details',
    templateUrl: './colour-details.component.html',
    styleUrls: ['./colour-details.component.css']
})

export class ColourDetailsComponent {
    @Input() hex: string;

    @Input() r: string;
    @Input() g: string;
    @Input() b: string;
    @Input() a: string;

    @Input() width = 200;
    @Input() height = 400;
}
