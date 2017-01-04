import {
    Component,
    ChangeDetectionStrategy,
    Input,
    AfterViewChecked,
    Renderer,
    AfterViewInit,
    Output,
    EventEmitter,
    HostListener,
    ChangeDetectorRef
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
    selector: 'as-child-onpush',
    template: `
    <div [style.color]="isColourRed ? 'red' : 'black'">
        This is child:.
        <p> </p>
        <button (click)='onClick()' > Click me! </button>
        <p> </p>
        <span>My input value {{inputParam}} </span>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class ChildOnpushComponent implements AfterViewChecked, AfterViewInit {

    isColourRed = false;

    @Input()
    inputParam: number;

    @Output()
    output: EventEmitter<any> = new EventEmitter();

    constructor(public renderer: Renderer, public cd: ChangeDetectorRef) {
        Observable.interval(60000).subscribe(() => {
            console.log('observable has happened (onpush child)');
        });
    }

    onClick() {
        console.log('I was clicked (onpush child)');
    }

    ngAfterViewChecked() {
        console.log('View is being checked (onpush child)');
    }

    ngAfterViewInit() {
        console.log('Gonna subscribe to listen to double clicks (onpush child)');

        this.renderer.listenGlobal('body', 'dblclick', (event) => {
                console.log('DbClicked in da body (onpush child). ');
            });
    }

    @HostListener('window:keydown', ['$event'])
    onkeydown(event) {
        console.log('window:keydown in da body (onpush child)');
        this.isColourRed = ! this.isColourRed;
    }
}
