import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/ticket-crud/Model/Ticket';



@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private API_URL = 'http://localhost:8080/ticket'
  constructor(private HttpClient: HttpClient) { }
  readAll(): Observable<any>{
    return this.HttpClient.get(this.API_URL);
  }

 createTicket(data: Ticket): Observable<any>{
   return this.HttpClient.post(this.API_URL,data);
  }
 updateTicket(data: Ticket): Observable <any>{
    return this.HttpClient.put(this.API_URL, data)
  }
  deleteTicket(ticketid: number): Observable<any>{
  return this.HttpClient.delete(`${this.API_URL}/${ ticketid}`);
  }

  readAllcategories(): Observable<any>{
    return this.HttpClient.get(`${this.API_URL}/categorylist`);
  }

  readAllkind(): Observable<any>{
    return this.HttpClient.get(`${this.API_URL}/kindlist`);
  }
  readAllpriority(): Observable<any>{
    return this.HttpClient.get(`${this.API_URL}/prioritylist`);
  }
  readAllproject(): Observable<any>{
    return this.HttpClient.get(`${this.API_URL}/projectlist`);
  }
  readAllstatus(): Observable<any>{
    return this.HttpClient.get(`${this.API_URL}/statuslist`);
  }
}
