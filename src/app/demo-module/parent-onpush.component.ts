import {
    Component,
    ChangeDetectionStrategy,
    AfterViewChecked
} from '@angular/core';
@Component({
    selector: 'as-parent-onpush',
    template: `
    <br />
    <br />
    <br />
    ------- This is parent Onpush -------
    <input [(ngModel)]='inputParam' />
    <br />
    {{lol}}
    <br />
    <div>------ Child Starts Here ------ </div>
        <as-child-onpush
            [inputParam]='inputParam'
            (output)='emitted()'

            ></as-child-onpush>
    <div>------ Child Ends Here ------ </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentOnpushComponent implements AfterViewChecked {
    inputParam = 23;
    lol = 12;

    emitted() {
        this.lol = this.lol++;
    }

    ngAfterViewChecked() {
        console.log('View is being checked (onpush parent)');
    }
}
