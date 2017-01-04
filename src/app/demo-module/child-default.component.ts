import {
    Component,
    ChangeDetectionStrategy,
    Input,
    AfterViewChecked,
    Renderer,
    HostListener,
    ChangeDetectorRef
} from '@angular/core';

// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
    selector: 'as-child-default',
    template: `
    <div [style.color]="isColourRed ? 'red' : 'black'">
        This is child:
        <p> </p>
        <button (click)='onClick()' > Click me! </button>
        <p> </p>
        <span>My input value {{inputParam}} </span>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class ChildDefaultComponent implements AfterViewChecked {
    isColourRed = false;

    @Input()
    inputParam: number;

    constructor(public renderer: Renderer, public cd: ChangeDetectorRef) {
        // Observable.interval(60000).subscribe(() => {
        //     console.log('observable has happened!');
        // });
    }

    onClick() {
        console.log('I was clicked (default child)!');
    }

    ngAfterViewChecked() {
        console.log('View is being checked (default child)');
    }

    @HostListener('body:wheel', ['$event'])
    onScroll(event) {
        console.log('Body scroll just happened (default child)');
        this.isColourRed = ! this.isColourRed;
    }
}
