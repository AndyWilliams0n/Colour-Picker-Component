import {Component, ViewChild, AfterViewInit, ElementRef, Input, Output, SimpleChanges, OnChanges, HostListener, EventEmitter} from '@angular/core';

@Component({
    selector: 'cp-colour-palette',
    templateUrl: './colour-palette.component.html',
    styleUrls: ['./colour-palette.component.css']
})

export class ColourPaletteComponent implements AfterViewInit, OnChanges {
    @Input() hue: string;
    @Input() width = 400;
    @Input() height = 400;

    @Output() colour: EventEmitter<string> = new EventEmitter(true);

    @ViewChild('colourPaletteCanvas') canvas: ElementRef<HTMLCanvasElement>;

    private ctx: CanvasRenderingContext2D;
    private mousedown = false;
    public selectedPosition: {
        x: number;
        y: number;
    };

    ngAfterViewInit() {
        this.draw();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['hue']) {
            this.draw();

            const position = this.selectedPosition;

            if (position) {
                this.colour.emit(this.getColorAtPosition(position.x, position.y));
            }
        }
    }

    draw() {
        if (!this.canvas) {
            return;
        }

        if (!this.ctx) {
            this.ctx = this.canvas.nativeElement.getContext('2d');
        }

        this.ctx.fillStyle = this.hue || 'rgba(255, 255, 255, 1)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        const lightGradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
        lightGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        lightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        this.ctx.fillStyle = lightGradient;
        this.ctx.fillRect(0, 0, this.width, this.height);

        const darkGradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        darkGradient.addColorStop(0, 'rgba(0,0,0,0)');
        darkGradient.addColorStop(1, 'rgba(0,0,0,1)');

        this.ctx.fillStyle = darkGradient;
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Pointer

        if (this.selectedPosition) {
            this.ctx.strokeStyle = 'white';
            this.ctx.fillStyle = 'white';
            this.ctx.beginPath();
            this.ctx.arc(this.selectedPosition.x - 2, this.selectedPosition.y + 1, 10, 0, 2 * Math.PI);
            this.ctx.lineWidth = 1;
            this.ctx.stroke();

            this.ctx.strokeStyle = 'black';
            this.ctx.fillStyle = 'black';
            this.ctx.beginPath();
            this.ctx.arc(this.selectedPosition.x - 2, this.selectedPosition.y + 1, 12, 0, 2 * Math.PI);
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }
    }

    //

    @HostListener('window:mouseup', ['$event']) onMouseUp(event: MouseEvent) {
        this.mousedown = false;
    }

    //

    onMouseDown(event: MouseEvent) {
        this.mousedown = true;
        this.selectedPosition = {
            x: event.offsetX,
            y: event.offsetY
        };

        this.draw();

        this.emitColor(event.offsetX, event.offsetY);
    }

    onMouseMove(event: MouseEvent) {
        if (this.mousedown) {
            this.selectedPosition = {
                x: event.offsetX,
                y: event.offsetY
            };

            this.draw();

            this.emitColor(event.offsetX, event.offsetY);
        }
    }

    //

    emitColor(x: number, y: number) {
        this.colour.emit(this.getColorAtPosition(x, y));
    }

    //

    getColorAtPosition(x: number, y: number) {
        const imageData = this.ctx.getImageData(x, y, 1, 1).data;

        return 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ', 1)';
    }
}
