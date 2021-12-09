import {Component, ViewChild, SimpleChanges, OnChanges, AfterViewInit, ElementRef, Input, Output, HostListener, EventEmitter, ViewEncapsulation} from '@angular/core';
import {ColoursService} from '../services/colours.service';

@Component({
    selector: 'cp-colour-palette',
    templateUrl: './colour-palette.component.html',
    styleUrls: ['./colour-palette.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ColourPaletteComponent implements AfterViewInit, OnChanges {
    @Input() pickedColour: string;
    @Input() width = 380;
    @Input() height = 380;

    @Output() colour: EventEmitter<string> = new EventEmitter(true);

    @ViewChild('colourPaletteCanvas') canvas: ElementRef<HTMLCanvasElement>;

    private ctx: CanvasRenderingContext2D;
    private mousedown = false;

    public selectedPosition: {
        x: number;
        y: number;
    };

    //

    constructor(
        public coloursService: ColoursService
    ) {}

    //

    ngAfterViewInit() {
        this.draw();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.coloursService.hasBeenEntered) {
            this.selectedPosition = undefined;
            setTimeout(() => this.coloursService.hasBeenEntered = false, 100);
        }

        if (changes['pickedColour']) {
            this.draw();

            const position = this.selectedPosition;

            if (position) {
                this.colour.emit(this.getColourAtPosition(position.x, position.y));
            }
        }
    }

    //

    draw() {
        if (!this.canvas) {
            return;
        }

        if (!this.ctx) {
            this.ctx = this.canvas.nativeElement.getContext('2d');
        }

        this.ctx.fillStyle = this.pickedColour || 'rgba(255, 255, 255, 1)';
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

        this.emitColour(event.offsetX, event.offsetY);
    }

    onMouseMove(event: MouseEvent) {
        if (this.mousedown) {
            this.selectedPosition = {
                x: event.offsetX,
                y: event.offsetY
            };

            this.draw();

            this.emitColour(event.offsetX, event.offsetY);
        }
    }

    //

    emitColour(x: number, y: number) {
        this.colour.emit(this.getColourAtPosition(x, y));
    }

    getColourAtPosition(x: number, y: number) {
        const imageData = this.ctx.getImageData(x, y, 1, 1).data;

        return `rgba(${imageData[0]},${imageData[1]},${imageData[2]},1)`;
    }
}
