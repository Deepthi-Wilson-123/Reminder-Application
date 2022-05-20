import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[A-Za-z]*')]],
    password: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]*')]],
    userid: ['', [Validators.required, Validators.pattern('[0-9]*')]]

  })


  constructor(private router:Router,private fb:FormBuilder,private http:HttpClient) { }

  ngOnInit(): void {
  }

  register() {

    var userid = this.registerForm.value.userid
    var username = this.registerForm.value.username
    var password = this.registerForm.value.password

    const data = {
      username,
      password,
      userid
      // balance:1000
    }
    return this.http.post('http://localhost:3000/register', data)
    .subscribe((result: any) => {
      if (result) {
        alert(result.message)
        this.router.navigateByUrl("")
      }
    },
      (result) => {
        alert(result.error.message)
      }
    )
  }


}
