import { TemplateDto } from "../dto/templateDto";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs";

import { saveAs } from 'file-saver';

@Injectable()
export class TemplateService{

    private apiUrl = 'http://localhost:8070/api/service/template';
    constructor (private http: HttpClient) {}

    public send(templateDto: TemplateDto){
        
       return this.http.post<TemplateDto>(
            `${this.apiUrl}/`,
            templateDto
        );
        
    }
    exportDefaultPriceNumbers() {
        let headers = new HttpHeaders(); // additional headers in here
        headers = headers.set('Content-Type', 'application/json');
        const url = `${this.apiUrl}/export`;
        const documentName = 'Default-Rates.xlsx';
        return this.http
          .post(url, {}, {
            headers,
            responseType: 'blob',
          })
          .pipe(
            map(
              res => {
                const x = res;
                if (res) {
                  const filename = documentName;
                  saveAs(x, filename);
                }
                return true;
              },
                (              err: any) => {
                console.log(err);
                return true;
              },
            ),
          );
      }
    
}

