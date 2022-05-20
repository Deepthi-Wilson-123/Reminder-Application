import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
const options = {
  headers: new HttpHeaders()
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  eventForm = this.fb.group({
    userid: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    password: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]*')]],
    eventname: ['', [Validators.required, Validators.pattern('[A-Za-z0-9 ]*')]],
    eventdate: ['', [Validators.required, Validators.pattern('[0-9 / ]*')]]
  })
  
  CurrentCustomer: any
  loginDate: any


  constructor(private fb: FormBuilder, private rou: Router, private http: HttpClient) {
    this.CurrentCustomer = JSON.parse(localStorage.getItem("currentname") || '')
    this.loginDate = new Date()
  }

  ngOnInit(): void {
  }
  getOptions() {
    const token = JSON.parse(localStorage.getItem('token') || '')
    let headers = new HttpHeaders()

    if (token) {
      headers = headers.append('x-access-token', token)
      options.headers = headers
    }
    return options

  }

  event() {

    var userid = this.eventForm.value.userid
    var password = this.eventForm.value.password
    var eventname = this.eventForm.value.eventname
    var eventdate = this.eventForm.value.eventdate
    const data = {
      userid,
      password,
      eventname,
      eventdate
    }
    return this.http.post('http://localhost:3000/event', data,this.getOptions())
      .subscribe((result: any) => {
        if (result) {
          alert(result.message)
        }
      },
        (result) => {
          alert(result.error.message)
        }
      )
  }

  eventlist() { this.rou.navigateByUrl("eventlist") }
  logOut() { this.rou.navigateByUrl("") }
  transaction() { this.rou.navigateByUrl("transaction") }

  delete() {
    var userid = JSON.parse(localStorage.getItem("currentid") || '')
    
    return this.http.delete('http://localhost:3000/deletes/'+userid , this.getOptions() )
      .subscribe((result: any) => {
        if (result) {
          this.rou.navigateByUrl("")
        }
      },
        (result) => {
          alert(result.error.message)
        }
      )

  }

}
