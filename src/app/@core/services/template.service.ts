import { TemplateDto } from "../dto/templateDto";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TemplateService{

    private apiUrl = 'http://localhost:8080/api/service/template';
    constructor (private http: HttpClient) {}

    public send(templateDto: TemplateDto){
        
       return this.http.post<TemplateDto>(
            `${this.apiUrl}/`,
            templateDto
        );
        
    }
}

