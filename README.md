Investigation onto how Angular 2 detects changes
===================

Material on the topic
-------------
> **Please get familiar with the following** (that covers this topic pretty well):

> - <a href="https://www.lucidchart.com/techblog/2016/05/04/angular-2-best-practices-change-detector-performance/"> Angular 2 performance problems in general </a> This alone might solve all your performance problems.

> - <a href="https://www.youtube.com/watch?v=8aGhZQkoFbQ">JS event loop talk</a>. This covers how async stuff works in JS. Async call examples:
>  - ```setTimeout()```
>  - ajax requests
>  - DOM event listeners ```onClick()``` and etc.

> - Read this <a href="http://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html">post </a>, or if you are lazy like me, go and watch <a href="https://www.youtube.com/watch?v=CUxD91DWkGM">this video</a> which explains the difference between two different strategies that angular 2 uses for detection of changes:
>  - ```changeDetection: ChangeDetectionStrategy.Default```
>  - ```changeDetection: ChangeDetectionStrategy.OnPush```

Quick Demo Overview
-----
This demo consists of 5 components:
> - ```AppComponent``` (Default)
> - ```ParentDefaultComponent``` (Default)
> - ```ParentOnpushComponent``` **(OnPush)**
> - ``` ChildDefaultComponent``` (Default)
> - ```ChildOnpushComponent``` (Default)

<img src="https://raw.githubusercontent.com/EddyP23/angular2-detectChanges-demo/master/readme-images/demo-components.png">

How ```OnPush``` vs ```Default``` works
-----
<i>Please note, that the following might be inaccurate due to lack of angular documentation and findings based on trial and error. Please report an issue if you spot any errors.</i>

Angular uses Zones (its own ngZone to be more precise) to override browser APIs (like ```setTimeout```, event handlers, etc.) so that it can tell when various async callbacks get called in the components. Whenever any async action happens Angular goes through all of the components (starting at the top and moving deeper in the component tree) and updates their templates one by one. If it meets a component going down a tree with ```OnPush``` detection strategy, it checks whether
> - any refs of any ```@Input``` properties on that component have changed

Or
> - the component was marked for check

and proceeds as follows:
> - If yes, then angular updates the template for that component and proceeds deeper into the tree,
> - If no, then it does NOT update the template for that component and STOPS, not trying to update any templates for deeper components.

You can mark a component for check manually by injecting ```cd: ChangeDetectorRef``` in the constructor and calling ```cd.markForCheck();```. Angular marks components for check whenever
a DOM event gets triggered in the component template (or using ```@HostListener``` and possibly other edge cases). In both cases, angular marks that component and all ancestors components for check and triggers template update action.

Examples of DOM events that trigger a marking for check:
```
1.
@HostListener('body:wheel', ['$event'])
onScroll(event) {
    console.log('Body scroll just happened');
}
2.
<button (click)='onClick()' > Click me! </button>
3.
setTimeout(() => {
    ...
    this.cd.markForCheck();
}, x);

```

Examples that don't mark for check any component (but do start angular update templates action):
```
1.
constructor(public renderer: Renderer) {
    this.renderer.listenGlobal('body', 'dblclick', (event) => {
            console.log('DbClicked in the body');
    });
}
2.
setTimeout(() => {...}, x);
```

When ref of @Input gets updated
===
When trying to implement a component with ```OnPush``` detection strategy, you need to be careful with ```@Input``` properties. Please make sure you do one of the following:
> 1.  Use primitives: ```string, number, boolean```
> 2. Use immutable objects (via e.g. ```immutablejs```)

