import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CrimeService {

	constructor(private httpClient: HttpClient) {

	}

	// GET request to crime API for crime data for selected city
	getCrimeData(coordinates: Array<number>) { 
	    return this.httpClient.get(`/api/crime/${coordinates[0]}/${coordinates[1]}`, {responseType: 'text'});
	  } 

}


  