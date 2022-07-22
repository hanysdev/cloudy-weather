import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  constructor(
    private http:HttpClient
  ) { }

  getMeasurements():Observable<any[]> {
    return this.http.get<any>("https://cloudy-weather-api.herokuapp.com/Measurements/4");
  }

}
