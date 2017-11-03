import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CrimeService {

	constructor(private httpClient: HttpClient) {

	}

	// GET request to crime API for crime data for selected city
	getCrimeData(coordinates: Array<number>) { 
		return this.httpClient.get(`https://api.spotcrime.com/crimes.json?lat=${coordinates[0]}&lon=${coordinates[1]}&radius=0.02&callback=jQuery213027649028043821566_1509493804094&key=privatekeyforspotcrimepublicusers-commercialuse-877.410.1607&_=1509493804097`,  {responseType: 'text'});
	  } 

}


  