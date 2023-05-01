import { Component, OnInit, OnChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TemplateDto } from 'src/app/@core/dto/templateDto';
import { TemplateService } from 'src/app/@core/services/template.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit, OnChanges {
  template= new TemplateDto();
  templateForm: FormGroup;

  constructor(
    private templateService: TemplateService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // console.log('blabla');
    // this.initTemplateForm();
    // console.log('blabla');
  }
  ngOnChanges() {
    // this.initTemplateForm();
  }

  initTemplateForm() {
    console.log('blabla123');
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
        Validators.required,
        Validators.maxLength(50),
      ]),
      plzOrt: new FormControl(this.template.plzOrt, [
        Validators.required,
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
        Validators.required,
        Validators.maxLength(50),
      ]),
      passwort: new FormControl(this.template.passwort, [
        Validators.required,
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
        Validators.required,
        Validators.maxLength(50),
      ]),
      imei: new FormControl(this.template.imei, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      zubehor: new FormControl(this.template.zubehor, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      checkboxes: new FormGroup({
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
      }),
    });
    console.log('bla5');

    this.subscribeToChanges();
  }

  subscribeToChanges() {}

  isValidTemplate() {
    return true;
  }

  send() {
     this.templateService.send(this.templateForm.value)
     .subscribe((response: any) => {
      console.log("post subscribe");
      
     });
  }

  getControlStatus(form: FormGroup, controlName: string) {
    const control = form.get(controlName);
    if (control?.touched && control?.invalid) {
      return 'danger';
    }
    if (control?.touched && control?.valid) {
      return 'success';
    }

    return 'primary';
  }
}
