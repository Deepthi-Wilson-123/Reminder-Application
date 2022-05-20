import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginDate: any


  loginForm = this.fb.group({
    userid: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    password: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]*')]]
  })
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginDate = new Date()
  }

  ngOnInit(): void {
  }
  login() {
    var userid = this.loginForm.value.userid
    var password = this.loginForm.value.password


    const data = {
      userid,
      password
    }
    return this.http.post('http://localhost:3000/login', data)
      .subscribe((result: any) => {
        if (result) {
          localStorage.setItem('currentid', JSON.stringify(result.currentPeopleid))
          localStorage.setItem('currentname', JSON.stringify(result.currentPeople))
          // localStorage.setItem('database',JSON.stringify(result.eventlist))
          localStorage.setItem('token',JSON.stringify(result.token))
          this.router.navigateByUrl("dashboard")

        }
      },
        (result) => {
          alert(result.error.message)
        }
      )

  }

}
