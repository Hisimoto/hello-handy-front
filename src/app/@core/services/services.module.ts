import { NgModule, ModuleWithProviders } from "@angular/core";
import { ThemeModule } from "src/app/@theme/theme.module";
import { TemplateService } from "./template.service";

const SERVICES = [
  TemplateService
];

@NgModule({
  imports: [],
  providers: [SERVICES],
})
export class ServiceModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ServiceModule,
      providers: [SERVICES],
    };
  }
}
