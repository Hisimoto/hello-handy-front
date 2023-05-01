import { TemplateCheckboxDto } from "./templateCheckboxDto";

export class TemplateDto {
    name: string;
    vorname: string;
    strabe: string;
    plzOrt: string;
    email: string;
    telefon: string;
    mobil: string;
    passwort: string;
    hertseller: string;
    modell: string;
    seriennr: string;
    imei: string;
    zubehor: string;
    
    checkboxes: TemplateCheckboxDto;
}