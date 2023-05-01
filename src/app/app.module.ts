import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';
import { TemplateComponent } from './pages/template/template.component';
import { MaterialModule } from './material-module';
import { ServiceModule } from './@core/services/services.module';
import { ThemeModule } from './@theme/theme.module';
import { TemplateService } from './@core/services/template.service';

import {HttpClientModule} from '@angular/common/http';

const MAT_MODULES =[

]

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    ServiceModule.forRoot(),
    ThemeModule.forRoot()
  ],
  providers: [],
  //bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {

    const templateComponent = createCustomElement(TemplateComponent, {
      injector: this.injector,
    });

    customElements.define('template-component', templateComponent);

  }
    ngDoBootstrap() {}
}

