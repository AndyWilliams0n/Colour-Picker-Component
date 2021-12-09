import {Component} from '@angular/core';

@Component({
    selector: 'cp-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    public hex = 'cc0000';
    public colour = '';

    public setColours(colour: any) {
        this.colour = colour;
    }
}
