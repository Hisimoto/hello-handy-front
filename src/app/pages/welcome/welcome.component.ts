import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TemplateService } from "src/app/@core/services/template.service";

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss'],
  })
  export class WelcomeComponent {

    constructor(private router: Router,
      private templateService: TemplateService){}

    template(){
        this.router.navigate(['/template']);
    }

    getEmails(){
        this.templateService.exportDefaultPriceNumbers().subscribe((filename) => {
        },
        err => {
          console.error(JSON.stringify(err));
          
        });
    }
    getRequests(){this.router.navigate(['/requests']);
    }
  }