import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ParentDefaultComponent } from './parent-default.component';
import { ParentOnpushComponent } from './parent-onpush.component';
import { ChildOnpushComponent } from './child-onpush.component';
import { ChildDefaultComponent } from './child-default.component';

@NgModule({
    declarations: [
        ParentDefaultComponent,
        ParentOnpushComponent,
        ChildOnpushComponent,
        ChildDefaultComponent
     ],
     imports: [
         FormsModule
    ],
     exports: [
         ParentDefaultComponent,
         ParentOnpushComponent,
     ]
})
export class DemoModule { }
