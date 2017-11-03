import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

@Injectable()
export class MapService {
     latitude: number;
     longitude: number;
     coordinates: Array<number> = [];
     locationName: string = "";

     constructor(private mapsAPILoader: MapsAPILoader) {

     }

     getLocationName(latitude, longitude) {
       return new Promise(resolve => {
         this.mapsAPILoader.load().then(() => {
               const geocoder = new google.maps.Geocoder;

               geocoder.geocode({'location': {lat: latitude, lng: longitude}}, (results, status) => {
                 if( status === google.maps.GeocoderStatus.OK ) {
                   results.forEach((value) => {
                     value.address_components.forEach((components) => {
                       components.types.forEach((types) => {
                         if(types === 'locality') {
                           resolve(components.long_name);
                         }
                       });
                     });
                   });
                 }
               }); 
          });
       });
       
     }
}


          