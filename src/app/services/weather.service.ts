import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WeatherService {
	latitude: number;
	longitude: number;
	weatherObject: object = {};

	constructor(private httpClient: HttpClient) {

	}

	

	weatherData(coordinates: Array<number>) {
        return this.httpClient.get(`/api/weather/${coordinates[0]},${coordinates[1]}`);
    }
}





