import {
    Component,
    ChangeDetectionStrategy,
    AfterViewChecked
} from '@angular/core';
@Component({
    selector: 'as-parent-default',
    template: `
    <br />
    <br />
    <br />
    ------- This is parent Default-------
    <br/>
    {{inputParam}}
    <p> </p>
    <div>------ Child Starts Here ------ </div>
        <as-child-default
            [inputParam]='inputParam'
            ></as-child-default>
    <div>------ Child Ends Here ------ </div>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class ParentDefaultComponent implements AfterViewChecked {
    inputParam = 23;

    ngAfterViewChecked() {
        console.log('View is being checked (default parent)');
    }
}
