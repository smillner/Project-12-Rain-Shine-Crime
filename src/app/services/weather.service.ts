import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {

	results: {};

	constructor(private httpClient: HttpClient) {

	}

	WeatherData() {
		return this.httpClient.get('/api')
			.subscribe( data => { 
				this.results = data;
				console.log(this.results);
				return this.results;
			});
	}

}





// return this.http.get('/api')
// 			.subscribe(data => {
// 				console.log(data.json());
// 				return data.json();
// 			}),
// 			err => {
// 				return console.log(err);
// 			},
// 			() => {
// 				return console.log('stream over');
// 			}
