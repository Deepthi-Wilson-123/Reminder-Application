import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DataserviceService } from '../services/dataservice.service';
const options = {
  headers: new HttpHeaders()
}

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {
 eventlist: any
 userid: any
 eventname:any
 eventdate:any

  constructor(private router:Router,private ds:DataserviceService,private http:HttpClient) { 
    this.userid = JSON.parse(localStorage.getItem("currentid") || '')
    this.ds.eventlist(this.userid)
      .subscribe((result: any) => {
        if (result) {
          this.eventlist = result.eventlist
        }
      }, (result) => {
        alert(result.error.message)
  
      }
      )
    
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

  logOut() {this.router.navigateByUrl("")}
  
  
  deleteEvent(){
    
    

      var userid = JSON.parse(localStorage.getItem("currentid") || '')
      // var eventname = this.editForm.value.eventname
      // var eventdate = this.editForm.value.eventdate
  
      const data = {
        userid,
        // eventname,
        // eventdate
        
      }
      return this.http.put('http://localhost:3000/eventdelete', data,this.getOptions())
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

  editEvent(){
    this.router.navigateByUrl("editing")
  }
}

