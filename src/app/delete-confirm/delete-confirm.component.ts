import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})

export class DeleteConfirmComponent implements OnInit {
  item=JSON.parse(localStorage.getItem("currentname") || '')

  constructor() { }

  ngOnInit(): void {
  }

delete(){ 

}
cancel(){
  this.item=""
}
}
