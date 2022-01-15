import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Measurement } from 'src/app/entities/measurement.entity';
import { WeatherDataService } from 'src/app/service/data/weather-data.service';
Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  myChart: Chart | undefined;


  measurementList: any = [];
  myMeasurements: Measurement[] = [];
  myMeasurementsReversed: Measurement[] = [];

  lastTemperature: number[] = [];
  lastHumidity: number[] = [];
  lastPressure: number[] = [];
  lastAirPollution: number[] = [];
  lastDate: Date[] = [];
  datenTemperature: ChartConfiguration = {
    type: 'line',
    data: {
      labels: this.lastDate,
      datasets: [{
        label: 'Temperature °C',
        data: this.lastTemperature,
        fill: false,
        borderColor: 'rgb(255,0,0)',
        tension: 0,
      }]
    }
  }

  constructor(
    public service: WeatherDataService
  ) { }

  ngOnInit(): void {
    this.service.getMeasurements().subscribe(
      response => this.prepareDataForStart(response)
    );
    this.myChart = new Chart("myChart", this.datenTemperature);
  }

  prepareDataForStart(response: any) {
    this.measurementList = response;
    this.myMeasurements = this.measurementList;
    this.myMeasurements.reverse();
    let counter: number = 0;
    for (let i = (this.myMeasurements.length) - 12; i < this.myMeasurements.length; i++) {
      if (counter < 12) {
        const element = this.myMeasurements[i];
        this.lastTemperature[counter] = element.temperatur;
        this.lastHumidity[counter] = element.humidity;
        this.lastPressure[counter] = element.pressure
        this.lastAirPollution[counter] = element.airPollution;
        this.lastDate[counter] = element.takenAt;
        console.log(this.lastTemperature)
        counter++;
      }
    }
    this.myChart?.update();
  }

  showLastMinute() {
    let date = new Date();
    this.service.getMeasurements().subscribe(
      response => this.calculateForSpecificTime(response,  12)
    );
  }

  showLast15Minutes() {
    let date = new Date();
    this.service.getMeasurements().subscribe(
      response => this.calculateForSpecificTime(response,  180)
    );
  }

  showLastHour() {
    let date = new Date();
    this.service.getMeasurements().subscribe(
      response => this.calculateForSpecificTime(response,  720)
    );
  }

  showLastDay() {
    let date = new Date();
    this.service.getMeasurements().subscribe(
      response => this.calculateForSpecificTime(response,  8640)
    );
  }

  calculateForSpecificTime(response: any, interval: number) {

    this.measurementList = response;
    this.myMeasurements = this.measurementList;
    this.myMeasurements.reverse();
    let counter: number = 0;

    this.lastTemperature = [];
    this.lastHumidity = [];
    this.lastPressure = [];
    this.lastAirPollution = [];
    this.lastDate = [];

    for (let i = (this.myMeasurements.length) - interval; i < this.myMeasurements.length; i++) {
      const element = this.myMeasurements[i];
      this.lastTemperature[counter] = element.temperatur;
      this.lastHumidity[counter] = element.humidity;
      this.lastPressure[counter] = element.pressure
      this.lastAirPollution[counter] = element.airPollution;
      this.lastDate[counter] = element.takenAt;
      console.log(this.lastTemperature)
      counter++;
    }
    this.datenTemperature = {
      type: 'line',
      data: {
        labels: this.lastDate,
        datasets: [{
          label: 'Temperature °C',
          data: this.lastTemperature,
          fill: false,
          borderColor: 'rgb(255,0,0)',
          tension: 0,
        }]
      }
    }
    this.myChart?.destroy();
    this.myChart = new Chart("myChart", this.datenTemperature);
  }

}
