import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Measurement } from 'src/app/entities/measurement.entity';
import { WeatherDataService } from 'src/app/service/data/weather-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  actualTemperature:any;
  actualHumidity:any;
  actualPressure:any;
  actualAirPollution:any;
  actualDate:any;

  measurementList$!:Observable<any[]>;
  measurementList:any=[];
  myMeasurements:Measurement[] = [];
  myMeasurementsReversed:Measurement[] =[];

  constructor(
    private service : WeatherDataService
  ) { }

  ngOnInit(): void {
    this.service.getMeasurements().subscribe(
      response => this.findActualTemperature(response)
    );
  }

  findActualTemperature(response : any) {
    this.measurementList = response;
    this.myMeasurements = this.measurementList;
    this.actualTemperature = this.myMeasurements[0].temperatur;
    this.actualHumidity = this.myMeasurements[0].humidity;
    this.actualPressure = this.myMeasurements[0].pressure;
    this.actualAirPollution = this.myMeasurements[0].airPollution;
    this.actualDate = this.myMeasurements[0].takenAt;
    
  }

}
