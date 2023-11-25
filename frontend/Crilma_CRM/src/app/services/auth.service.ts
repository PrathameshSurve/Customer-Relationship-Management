import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UpdateUser} from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://127.0.0.1:2000/Crilma';

  constructor(private http: HttpClient) { }

  getApiData(){
    return this.http.get("http://127.0.0.1:2000/Crilma/users");
  }

  registerUser(userDetails: User) {
    return this.http.post(`${this.baseUrl}/adduser`, userDetails);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?uemail=${email}`);
  }

  updateUser(email: string, updatedUserData: UpdateUser): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateuser/${email}`, updatedUserData);
  }

  deleteUser(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/deleteuseraccount/${email}/${password}`;
    return this.http.delete(url, { responseType: 'text' });
  } 

}