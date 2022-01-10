import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  constructor(
    private http:HttpClient
  ) { }

  executeGetDataFromApi() {
    return this.http.get("https://cloudy-weather-api.herokuapp.com/Measurements/4");
  }

}
