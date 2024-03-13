import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/user-crud/Model/User';



@Injectable({
  providedIn: 'root'
})


export class UserService {
  private API_URL = 'http://localhost:8080/user'

  constructor(private httpClient: HttpClient) { }

  readAllUser(): Observable<any>{
    return this.httpClient.get(this.API_URL);
  }

 createUser(data: User): Observable<any>{
   return this.httpClient.post(this.API_URL,data);
  }
 updateUser(data: User): Observable <any>{
    return this.httpClient.put(this.API_URL, data)
  }

/* updateUser(id: any, data: User): Observable <any>{
    return this.httpClient.put(`${this.API_URL}/${id}`, data)
  }*/

  deleteUser(userid: number): Observable<any>{
  return this.httpClient.delete(`${this.API_URL}/${userid}`);
  }


}
