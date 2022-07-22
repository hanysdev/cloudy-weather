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
  myChartHumidity: Chart | undefined;
  myChartPressure: Chart | undefined;
  myChartAirPollution: Chart | undefined;


  measurementList: any = [];
  myMeasurements: Measurement[] = [];

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
  datenHumidity: ChartConfiguration = {
    type: 'line',
    data: {
      labels: this.lastDate,
      datasets: [{
        label: 'Humidity %',
        data: this.lastHumidity,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0,
      }]
    }
  }
  datenPressure: ChartConfiguration = {
    type: 'line',
    data: {
      labels: this.lastDate,
      datasets: [{
        label: 'Pressure hPa',
        data: this.lastPressure,
        fill: false,
        borderColor: 'rgb(255, 211, 0)',
        tension: 0,
      }]
    }
  }
  datenAirPollution: ChartConfiguration = {
    type: 'line',
    data: {
      labels: this.lastDate,
      datasets: [{
        label: 'AirPollution µg/m3',
        data: this.lastAirPollution,
        fill: false,
        borderColor: 'rgb(238,130,238)',
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
    this.myChartHumidity = new Chart("myChartHumidity", this.datenHumidity);
    this.myChartPressure = new Chart("myChartPressure", this.datenPressure);
    this.myChartAirPollution = new Chart("myChartAirPollution", this.datenAirPollution);
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
    this.myChartHumidity?.update();
    this.myChartPressure?.update();
    this.myChartAirPollution?.update();
  }

  showLastMinute() {
    this.service.getMeasurements().subscribe(
      response => this.calculateForSpecificTime(response, 12)
    );
  }

  showLast15Minutes() {
    this.service.getMeasurements().subscribe(
      response => this.calculateForSpecificTime(response, 180)
    );
  }

  showLast30Minutes() {
    this.service.getMeasurements().subscribe(
      response => this.calculateForSpecificTime(response, 360)
    );
  }

  showLast45Minutes() {
    this.service.getMeasurements().subscribe(
      response => this.calculateForSpecificTime(response, 540)
    );
  }

  showLastHour() {
    this.service.getMeasurements().subscribe(
      response => this.calculateForSpecificTime(response, 720)
    );
  }

  showLastDay() {
    this.service.getMeasurements().subscribe(
      response => this.calculateForSpecificTime(response, 6000  )
    );
  }

  showLastWeek() {
    this.service.getMeasurements().subscribe(
      response => this.calculateForSpecificTime(response, 6000)
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
    console.log(this.myMeasurements.length);

    for (let i = (this.myMeasurements.length) - interval; i < this.myMeasurements.length; i++) {

      const element = this.myMeasurements[i];
      if (element.humidity != 0 && element.humidity<100) {
        this.lastTemperature[counter] = element.temperatur;
        this.lastHumidity[counter] = element.humidity;
        this.lastPressure[counter] = element.pressure
        this.lastAirPollution[counter] = element.airPollution;
        this.lastDate[counter] = element.takenAt;
        counter++;
      }

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
    this.datenHumidity = {
      type: 'line',
      data: {
        labels: this.lastDate,
        datasets: [{
          label: 'Humidity %',
          data: this.lastHumidity,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0,
        }]
      }
    }
    this.datenPressure = {
      type: 'line',
      data: {
        labels: this.lastPressure,
        datasets: [{
          label: 'Pressure hPa',
          data: this.lastTemperature,
          fill: false,
          borderColor: 'rgb(255, 211, 0)',
          tension: 0,
        }]
      }
    }
    this.datenAirPollution = {
      type: 'line',
      data: {
        labels: this.lastDate,
        datasets: [{
          label: 'AirPollution µg/m3',
          data: this.lastAirPollution,
          fill: false,
          borderColor: 'rgb(238,130,238)',
          tension: 0,
        }]
      }
    }
    this.myChart?.destroy();
    this.myChart = new Chart("myChart", this.datenTemperature);
    this.myChartHumidity?.destroy();
    this.myChartHumidity = new Chart("myChartHumidity", this.datenHumidity);
    this.myChartPressure?.destroy();
    this.myChartPressure = new Chart("myChartPressure", this.datenPressure);
    this.myChartAirPollution?.destroy();
    this.myChartAirPollution = new Chart("myChartAirPollution", this.datenAirPollution);
  }

}
