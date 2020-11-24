export function hexToRGB(hex: string = '', alpha: boolean = false): string {
    const r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    } else {
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
}

export function RGBToHex(red: number = 0, green: number = 0, blue: number = 0) {
    let r = red.toString(16),
        g = green.toString(16),
        b = blue.toString(16);

    if (r.length === 1) {
        r = '0' + r;
    }

    if (g.length === 1) {
        g = '0' + g;
    }

    if (b.length === 1) {
        b = '0' + b;
    }

    return '#' + r + g + b;
}
