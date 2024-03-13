import { Injectable } from '@angular/core';
import { Reporte } from '../model/reporte';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private API_URL='http://localhost:8080/user'

  constructor(private http: HttpClient) { }

  getAllUsersCategory(name: string): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(`${this.API_URL}/report-user-by-category?name=${name}`);
  }
}
