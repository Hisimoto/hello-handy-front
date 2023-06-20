import { Component, OnInit, OnChanges, ViewChild, Inject, Optional } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { TemplateDto } from 'src/app/@core/dto/templateDto';
import { TemplateService } from 'src/app/@core/services/template.service';
import { ConfirmationComponent } from 'src/app/@theme/components/confirmation/confirmation.component';
import { Dot, LockScreenComponent } from 'src/app/@theme/components/lock-screen/lock-screen.component';
import { SignaturePadComponent } from 'src/app/@theme/components/signature-pad/signature-pad.component';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit, OnChanges {
  template= new TemplateDto();
  templateForm: FormGroup;
  lockScreen: string;
  padIn: string;
  
  @ViewChild(SignaturePadComponent) signPad: SignaturePadComponent;
  @ViewChild(LockScreenComponent) lockScreenComponent: LockScreenComponent;
  constructor(
    private templateService: TemplateService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private dialogService: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA)
    public injectData: {
      templateId:number;
      isView:boolean;
    }
  ) {}

  ngOnInit() {
    this.initTemplateForm();
  }
  ngOnChanges() {
    //this.initTemplateForm();
  }

  initTemplateForm() {
    
    this.templateForm = new FormGroup({
      name: new FormControl(this.template.name, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      vorname: new FormControl(this.template.vorname, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      strabe: new FormControl(this.template.strabe, [
        Validators.maxLength(50),
      ]),
      plzOrt: new FormControl(this.template.plzOrt, [
        Validators.maxLength(50),
      ]),
      email: new FormControl(this.template.email, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      telefon: new FormControl(this.template.telefon, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      mobil: new FormControl(this.template.mobil, [
        Validators.maxLength(50),
      ]),
      passwort: new FormControl(this.template.passwort, [
        Validators.maxLength(50),
      ]),
      hertseller: new FormControl(this.template.hertseller, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      modell: new FormControl(this.template.modell, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      seriennr: new FormControl(this.template.seriennr, [
        Validators.maxLength(50),
      ]),
      imei: new FormControl(this.template.imei, [
        Validators.maxLength(50),
      ]),
      zubehor: new FormControl(this.template.zubehor, [
        Validators.maxLength(50),
      ]),
      preis: new FormControl(this.template.preis, [
        Validators.required,
        Validators.maxLength(50),
      ]),
        fehferdiagnose: new FormControl(false),
        akku: new FormControl(false),
        annaherungssensor: new FormControl(false),
        backlight: new FormControl(false),
        board: new FormControl(false),
        datensicherung: new FormControl(false),
        wiederherstellung: new FormControl(false),
        display: new FormControl(false),
        frontkamera: new FormControl(false),
        hauptkamera: new FormControl(false),
        homebutton: new FormControl(false),
        hormuschel: new FormControl(false),
        kamera: new FormControl(false),
        kameragias: new FormControl(false),
        kopfhorereing: new FormControl(false),
        ladebuchse: new FormControl(false),
        lautsprecher: new FormControl(false),
        mikrofon: new FormControl(false),
        powerLLL: new FormControl(false),
        ruckseite: new FormControl(false),
        vibrationasalarm: new FormControl(false),
        wasserschaden: new FormControl(false),
        wifiAntenne: new FormControl(false),
        sonstigeFehler: new FormControl(false),
      
    });
    if(this.injectData){
      
        if(this.injectData.isView == true) {
          this.fetchTempalteData()
        }
    } else {
     this.signPad.clearSignPad();
    this.lockScreenComponent.reset();
    }
    this.subscribeToChanges();
  }

  fetchTempalteData(){
    
    this.templateService.getRequestById(this.injectData.templateId).subscribe(
      (response: TemplateDto) => {
        const templateData = response;
        if (templateData) {
          Object.keys(templateData).forEach((key: string) => {
            const control = this.templateForm.get(key);
            if (control) {
              control.setValue(templateData[key as keyof TemplateDto]);
              control.disable();
            }
          });
        }
        this.signPad.viewPad = this.decodeBase64Image(response.signature);
        

        this.setLockScreen(response.lockScreen);
      }
    );
    
  }

  subscribeToChanges() {}

  isValidTemplate() {
    return this.templateForm.valid;
  }

  send() {
    const dto = this.createTemplateDto();    
    const dialogRef = this.dialogService.open(ConfirmationComponent, {
      data: {
        viewText: "Are you sure you want to save selected request?",
      },
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.templateService.send(dto)
     .subscribe(() => {
      
     });
     this.initTemplateForm();
      }
    });
     
  }
  getLockScreen(){
    const lockScreeOut = this.lockScreenComponent.selectedDots;
    this.lockScreen = '';
    lockScreeOut.forEach(x => {
      this.lockScreen = this.lockScreen.concat(x.id.toString());
    });
    
  }
  setLockScreen(lockScreen: string){
    const numbersArray: number[] = lockScreen.split('').map(Number);
    numbersArray.forEach(x => {
      const y = this.findDotById(x);
      if(y !== undefined){
      this.lockScreenComponent.selectDot(y);
      }
    });
    this.lockScreenComponent.isView = true;
    
  }

   findDotById(id: number): Dot | undefined {
    return this.lockScreenComponent.dots.find(dot => dot.id === id);
  }

  createTemplateDto(){
    let tempalteDtoPost:TemplateDto;
    this.getLockScreen();
    tempalteDtoPost = this.templateForm.value;
    tempalteDtoPost.lockScreen = this.lockScreen;
    tempalteDtoPost.signature = this.signPad.signPad.toDataURL();
    return tempalteDtoPost;

  }
  savePdf(){
    window.print();
  }
  
  decodeBase64Image(base64ImageData: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64ImageData); // Decode the base64 string     
  }
  
}
