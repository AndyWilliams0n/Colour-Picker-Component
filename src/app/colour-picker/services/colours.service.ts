import {Injectable} from '@angular/core';
import {SelectedColours} from '../models/colours.model';
import {HexToRGB, RGBToArray, RGBToHSL} from '../functions/conversion.functions';

@Injectable()

export class ColoursService {
    public pickedColour = '';

    public rgb = '';
    public rgba = '';
    public hex = '';

    public r = 0;
    public g = 0;
    public b = 0;
    public a = 1;

    public h = 0;
    public s = 0;
    public l = 0;

    public preselectedColours: SelectedColours[] = [{
        name: 'pink',
        hex: 'ff9ff3',
        hasBorder: false
    }, {
        name: 'darker-pink',
        hex: 'f368e0',
        hasBorder: false
    }, {
        name: 'yellow',
        hex: 'feca57',
        hasBorder: false
    }, {
        name: 'darker-yellow',
        hex: 'ff9f43',
        hasBorder: false
    }, {
        name: 'red',
        hex: 'ff6b6b',
        hasBorder: false
    }, {
        name: 'darker-red',
        hex: 'ee5253',
        hasBorder: false
    }, {
        name: 'cyan',
        hex: '48dbfb',
        hasBorder: false
    }, {
        name: 'darker-cyan',
        hex: '0abde3',
        hasBorder: false
    }, {
        name: 'green',
        hex: '1dd1a1',
        hasBorder: false
    }, {
        name: 'darker-green',
        hex: '10ac84',
        hasBorder: false
    }, {

        name: 'jade',
        hex: '00d2d3',
        hasBorder: false
    }, {
        name: 'darker-jade',
        hex: '01a3a4',
        hasBorder: false
    }, {
        name: 'blue',
        hex: '54a0ff',
        hasBorder: false
    }, {
        name: 'darker-blue',
        hex: '2e86de',
        hasBorder: false
    }, {
        name: 'purple',
        hex: '5f27cd',
        hasBorder: false
    }, {
        name: 'darker-purple',
        hex: '341f97',
        hasBorder: false
    }, {
        name: 'light-grey',
        hex: 'c8d6e5',
        hasBorder: false
    }, {
        name: 'darker-light-grey',
        hex: '8395a7',
        hasBorder: false
    }, {
        name: 'dark-grey',
        hex: '576574',
        hasBorder: false
    }, {
        name: 'darker-dark-grey',
        hex: '222f3e',
        hasBorder: false
    }, {

        name: 'White',
        hex: 'FFFFFF',
        hasBorder: true
    }, {
        name: 'Black',
        hex: '000000',
        hasBorder: false
    }];

    public hasBeenEntered = false;

    setPreselectedHex(hex: string) {
        this.hex = hex;
        this.rgb = HexToRGB(hex, false);
        this.rgba = HexToRGB(hex, true);
        this.splitRGB(this.rgba);
        this.splitHSL(this.r, this.g, this.b);

        this.pickedColour = HexToRGB(hex, true);
    }

    splitRGB(rgba: string = '') {
        const split = RGBToArray(rgba);

        this.r = parseInt(split[0]) || 0;
        this.g = parseInt(split[1]) || 0;
        this.b = parseInt(split[2]) || 0;
        this.a = parseInt(split[3]) || 0;
    }

    splitHSL(r: number = 0, g: number = 0, b: number = 0) {
        const split = RGBToHSL(r, g, b);

        this.h = split[0] || 0;
        this.s = split[1] || 0;
        this.l = split[2] || 0;
    }
}
