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

  myChart:Chart | undefined;

  measurementList: any = [];
  myMeasurements: Measurement[] = [];
  myMeasurementsReversed: Measurement[] = [];

  lastTemperature: number[] = [];
  lastHumidity: number[] = [];
  lastPressure: number[] = [];
  lastAirPollution: number[] = [];
  lastDate: Date[] = [];
  daten:ChartConfiguration = {
    type: 'line',
    data: {
      labels: this.lastDate,
      datasets: [{
        label: 'Temperature °C',
        data: this.lastTemperature,
        fill: false,
        borderColor: 'rgb(255,0,0)',
        tension: 0,
      },
      {
        label: 'Humidity %',
        data: this.lastHumidity,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0,
      },
      {
        label: 'Pressure hPa',
        data: this.lastPressure,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0,
      },
      {
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
      
    this.myChart = new Chart("myChart", this.daten);
  }

  prepareDataForStart(response: any) {
    this.measurementList = response;
    this.myMeasurements = this.measurementList;
    this.myMeasurements.reverse();
    let counter: number = 0;
    for (let i = (this.myMeasurements.length)-10; i < this.myMeasurements.length; i++) {
      if (counter < 30) {
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

  showData30LastForView(){
    this.service.getMeasurements().subscribe(
      response => this.calculateLast30(response)
    );
  }

  calculateLast30(response: any) {
    
    this.measurementList = response;
    this.myMeasurements = this.measurementList;
    this.myMeasurements.reverse();
    let counter: number = 0;
    for (let i = (this.myMeasurements.length)-30; i < this.myMeasurements.length; i++) {
      if (counter < 30) {
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
    this.daten= {
      type: 'line',
      data: {
        labels: this.lastDate,
        datasets: [{
          label: 'Temperature °C',
          data: this.lastTemperature,
          fill: false,
          borderColor: 'rgb(255,0,0)',
          tension: 0,
        },
        {
          label: 'Humidity %',
          data: this.lastHumidity,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0,
        },
        {
          label: 'Pressure hPa',
          data: this.lastPressure,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0,
        },
        {
          label: 'AirPollution µg/m3',
          data: this.lastAirPollution,
          fill: false,
          borderColor: 'rgb(238,130,238)',
          tension: 0,
        }]
      }
    }
    this.myChart?.destroy();
    this.myChart = new Chart("myChart", this.daten);
  }




  showData50LastForView(){
    this.service.getMeasurements().subscribe(
      response => this.calculateLast50(response)
    );
  }

  calculateLast50(response: any) {
    
    this.measurementList = response;
    this.myMeasurements = this.measurementList;
    this.myMeasurements.reverse();
    let counter: number = 0;
    for (let i = (this.myMeasurements.length)-50; i < this.myMeasurements.length; i++) {
      if (counter < 50) {
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
    this.daten= {
      type: 'line',
      data: {
        labels: this.lastDate,
        datasets: [{
          label: 'Temperature °C',
          data: this.lastTemperature,
          fill: false,
          borderColor: 'rgb(255,0,0)',
          tension: 0,
        },
        {
          label: 'Humidity %',
          data: this.lastHumidity,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0,
        },
        {
          label: 'Pressure hPa',
          data: this.lastPressure,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0,
        },
        {
          label: 'AirPollution µg/m3',
          data: this.lastAirPollution,
          fill: false,
          borderColor: 'rgb(238,130,238)',
          tension: 0,
        }]
      }
    }
    this.myChart?.destroy();
    this.myChart = new Chart("myChart", this.daten);
  }
}
