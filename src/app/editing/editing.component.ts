import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
const options = {
  headers: new HttpHeaders()
}

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.css']
})
export class EditingComponent implements OnInit {
  editForm = this.fb.group({
    eventname: ['', [Validators.required, Validators.pattern('[A-Za-z0-9 ]*')]],
    eventdate: ['', [Validators.required, Validators.pattern('[/0-9]*')]]
  })

  constructor(private fb:FormBuilder,private http:HttpClient) { }

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
  edit(){
    

      var userid = JSON.parse(localStorage.getItem("currentid") || '')
      var eventname = this.editForm.value.eventname
      var eventdate = this.editForm.value.eventdate
  
      const data = {
        userid,
        eventname,
        eventdate
        
      }
      return this.http.put('http://localhost:3000/eventupdate', data,this.getOptions())
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
}
