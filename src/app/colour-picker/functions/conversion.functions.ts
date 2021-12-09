// Converts #000 to rgba(0,0,0,1)
export function HexToRGB(hex: string = '', alpha: boolean = false): string {
    const r = parseInt(hex.slice(0, 2), 16),
          g = parseInt(hex.slice(2, 4), 16),
          b = parseInt(hex.slice(4, 6), 16);

    if (alpha) {
        return 'rgba(' + r + ',' + g + ',' + b + ',' + (alpha ? 1 : 0) + ')';
    } else {
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
}

// Converts R, G, B to #000
export function RGBToHex(red: number = 0, green: number = 0, blue: number = 0): string {
    let r = red.toString(16),
        g = green.toString(16),
        b = blue.toString(16);

    if (r.length <= 1) {
        r = '0' + r;
    }

    if (g.length <= 1) {
        g = '0' + g;
    }

    if (b.length <= 1) {
        b = '0' + b;
    }

    return r + g + b;
}

// Converts R, G, B to [h,s,l]
export function RGBToHSL(red: number = 0, green: number = 0, blue: number = 0): number[] {
    red /= 255;
    green /= 255;
    blue /= 255;

    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);

    let   h = 0,
          s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const range = max - min;

        s = l > 0.5 ? range / (2 - max - min) : range / (max + min);

        switch (max) {
            case red: h = (green - blue) / range + (green < blue ? 6 : 0); break;
            case green: h = (blue - red) / range + 2; break;
            case blue: h = (red - green) / range + 4; break;
        }

        h /= 6;
    }

    return [h, s, l];
}

// Converts rgba(10,20,30,1) to [10,20,30]
export function RGBToArray(rgba: string = ''): string[] {
    rgba = rgba.replace('rgba', '');
    rgba = rgba.replace('rgb', '');
    rgba = rgba.replace('(', '');
    rgba = rgba.replace(')', '');

    return rgba.split(',');
}
