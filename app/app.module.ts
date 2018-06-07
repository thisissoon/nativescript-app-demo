import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from '~/app-routing.module';
import { AppComponent } from '~/app.component';

@NgModule({
  imports: [NativeScriptModule, AppRoutingModule],
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
