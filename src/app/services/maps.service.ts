import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

@Injectable()
export class MapService {
 //     latitude: number;
 //     longitude: number;
 //     coordinatesArray: any;
     
	// // Set modal title to place based on coordinates
 //     constructor(private mapsAPILoader: MapsAPILoader) {

 //     }
     
     // getWeather() {

     //      // get current coordinates
     //      if ("geolocation" in navigator) {
     //       navigator.geolocation.getCurrentPosition((position) => {
     //         this.latitude = position.coords.latitude;
     //         this.longitude = position.coords.longitude;
     //         this.coordinatesArray.push(this.latitude, this.longitude);
     //       });
     //     }
         // // load Google Places API
         //  this.mapsAPILoader.load().then(() => {
         //       const geocoder = new google.maps.Geocoder;

         //       geocoder.geocode({'location': {lat: this.latitude, lng: this.longitude}}, (results, status) => {
         //         if( status === google.maps.GeocoderStatus.OK ) { 
         //           results.forEach((value) => {
         //             value.address_components.forEach((components) => {
         //               components.types.forEach((types) => {
         //                 if(types === 'locality') {
         //                 this.testArray.push(components.long_name);
         //                 return this.testArray[0];
         //                 } 
         //               });
         //             });
         //           });
         //         }
         //       }); 
         //  });

     // }
}


          