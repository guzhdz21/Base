import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertaGeneral } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class JsonsService {

  constructor(private http: HttpClient) { }

  getAlertasJson() {
    return this.http.get<AlertaGeneral[]>('/assets/data/info.json');
  }
}
