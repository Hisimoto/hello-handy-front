import { TemplateDto } from "../dto/templateDto";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs";

import { saveAs } from 'file-saver';
import { Page } from "../dto/page";

@Injectable()
export class TemplateService{

    private apiUrl = '/hallohandy-back/api/hallohandy';
    constructor (private http: HttpClient) {}

    send(templateDto: TemplateDto){
        
       return this.http.post<TemplateDto>(
            `${this.apiUrl}/`,
            templateDto
        );
        
    }
    getRequests(page: Page){
        
      return this.http.post<TemplateDto>(
           `${this.apiUrl}/search`,
           page
       );
   }
   getRequestById(id: number){
        
    return this.http.get<TemplateDto>(
         `${this.apiUrl}/${id}`
     );
 }
   resolveRequest(id: string){
    
    return this.http.put<TemplateDto>(
         `${this.apiUrl}/resolve`,
         id
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

