import {Component, AfterViewInit, ViewChild, ElementRef, Output, HostListener, EventEmitter, Input, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'cp-colour-slider',
    templateUrl: './colour-slider.component.html',
    styleUrls: ['./colour-slider.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ColourSliderComponent implements AfterViewInit {
    @Input() width = 40;
    @Input() height = 380;
    @Output() colour: EventEmitter<string> = new EventEmitter();
    @ViewChild('colourSliderCanvas') canvas: ElementRef<HTMLCanvasElement>;

    private ctx: CanvasRenderingContext2D;
    private mousedown = false;
    private selectedHeight: number;

    ngAfterViewInit() {
        this.draw();
    }

    //

    draw() {
        if (!this.canvas) {
            return;
        }

        if (!this.ctx) {
            this.ctx = this.canvas.nativeElement.getContext('2d');
        }

        this.ctx.clearRect(0, 0, this.width, this.height);

        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
        gradient.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
        gradient.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
        gradient.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
        gradient.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
        gradient.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');

        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.width, this.height);

        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        this.ctx.closePath();

        // Pointer

        if (this.selectedHeight) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = 'black';
            this.ctx.lineWidth = 1;
            this.ctx.rect(0, this.selectedHeight - 3, this.width, 5);
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }

    //

    @HostListener('window:mouseup', ['$event']) onMouseUp(event: MouseEvent) {
        this.mousedown = false;
    }

    //

    onMouseDown(event: MouseEvent) {
        this.mousedown = true;
        this.selectedHeight = event.offsetY;

        this.draw();

        this.emitColour(event.offsetX, event.offsetY);
    }

    onMouseMove(event: MouseEvent) {
        if (this.mousedown) {
            this.selectedHeight = event.offsetY;

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

        return 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
    }
}
