import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from "../material-module";
import { PageComponent } from "./components/page/page.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const BASE_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  BrowserModule,
  BrowserAnimationsModule,
  MatTooltipModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatDividerModule,
  
];
@NgModule({
  imports: [MaterialModule,CommonModule],
  exports: [
    PageComponent,
  ],
  declarations: [
    PageComponent,
  ],
  entryComponents: [
    PageComponent,
  ],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [BASE_MODULES],
    };
  }
}
