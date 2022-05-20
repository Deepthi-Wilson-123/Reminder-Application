import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
const options = {
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  

  constructor(private http:HttpClient,private router:Router) {}

  getOptions() {
    const token = JSON.parse(localStorage.getItem('token') || '')
    let headers = new HttpHeaders()

    if (token) {
      headers = headers.append('x-access-token', token)
      options.headers = headers
    }
    return options

  }

  
//transaction 
eventlist(userid: any) {
  const data = {

    userid

  }
  return this.http.post('http://localhost:3000/eventlist', data,this.getOptions())

}
}
