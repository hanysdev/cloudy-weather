import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from 'src/app/service/data/weather-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  WeatherData:any;
  constructor(
    private service : WeatherDataService
  ) { }

  ngOnInit(): void {
    console.log(this.service.executeGetDataFromApi());
    this.service.executeGetDataFromApi().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
  }

  handleSuccessfulResponse(response : any) {
    console.log(response);
  }

}
