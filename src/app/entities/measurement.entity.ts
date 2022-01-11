export class Measurement {
    
    weatherStationID: number;
    weatherStation: any;
    measurementID: number;
    temperatur: number;
    humidity: number;
    pressure: number;
    airPollution: number;
    takenAt: Date;

    constructor (
        _weatherStationID: number,
        _weatherStation: number,
        _measurementID: number,
        _temperatur: number,
        _humidity: number,
        _pressure: number,
        _airPollution: number,
        _takenAt: Date
    ) {
        this.weatherStationID = _weatherStationID;
        this.weatherStation = _weatherStation;
        this.measurementID = _measurementID;
        this.temperatur = _temperatur;
        this.humidity = _humidity;
        this.pressure = _pressure;
        this.airPollution = _airPollution;
        this.takenAt = _takenAt;
    }



}