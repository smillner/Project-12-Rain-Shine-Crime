import { Component, OnInit, NgZone } from '@angular/core';
import { MapService } from '../../services/maps.service';
import { CrimeService } from '../../services/crime.service';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})

export class ModalComponent implements OnInit {
  // variable to hold modal titles
  weatherData: any;
  crimeTest: string;

	constructor(
    private crimeService: CrimeService, 
    private mapService: MapService, 
    private weatherService: WeatherService,
    private ngZone: NgZone
    ) {}

	ngOnInit() {
    
    // use service to retrieve crime data for selected city
		this.crimeTest = this.crimeService.getCrimeData();
    
    // use service to retrieve weather data for selected city
    this.weatherData = this.weatherService.WeatherData();
    
    console.log(this.weatherData);


  } 


  // Set modal title to place based on coordinates
          // var geocoder = new google.maps.Geocoder;
          // geocoder.geocode({'location': {lat: this.latitude, lng: this.longitude}}, (results, status) => {
          //   if( status === google.maps.GeocoderStatus.OK ) {
          //     results.forEach((value) => {
          //       value.address_components.forEach((components) => {
          //         components.types.forEach((types) => {
          //           if(types === 'locality') {
          //             return this.weatherTest = components.long_name;
          //           }
          //         });
          //       });
                
          //     });
          //     // console.log(results[0]);
          //   }
          // })

}