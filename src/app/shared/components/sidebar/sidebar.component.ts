import { Component, OnInit } from '@angular/core';
import { HomeComponent } from 'src/app/modules/home/home.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private home : HomeComponent
  ) { }

  ngOnInit(): void {
  }


  showLast20(){
    this.home.showData30LastForView();
  }
}
