import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';
import { TemplateComponent } from './pages/template/template.component';
import { MaterialModule } from './material-module';
import { ServiceModule } from './@core/services/services.module';
import { ThemeModule } from './@theme/theme.module';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { LockScreenComponent } from './@theme/components/lock-screen/lock-screen.component';
import { SignaturePadComponent } from './@theme/components/signature-pad/signature-pad.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';



@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    LockScreenComponent,
    SignaturePadComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ServiceModule.forRoot(),
    ThemeModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: 'template', component: TemplateComponent},
      {path: 'welcome', component: WelcomeComponent},
      {path: '**', redirectTo: 'welcome'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {

    const templateComponent = createCustomElement(TemplateComponent, {
      injector: this.injector,
    });
    customElements.define('template-component', templateComponent);

    const lockScreenComponent = createCustomElement(LockScreenComponent, {
      injector: this.injector,
    });
    customElements.define('lock-screen-component', lockScreenComponent);

    const signaturePadComponent = createCustomElement(SignaturePadComponent, {
      injector: this.injector,
    });
    customElements.define('signature-pad-component', signaturePadComponent);
    
  }
    ngDoBootstrap() {}
}

