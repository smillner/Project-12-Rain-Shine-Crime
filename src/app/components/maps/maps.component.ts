import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapService } from '../../services/maps.service';
import { CrimeService } from '../../services/crime.service';
import { WeatherService } from '../../services/weather.service';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
})

export class MapsComponent implements OnInit {

  latitude: number;
  longitude: number;
  coordinates: Array<number> = [this.latitude, this.longitude];
  searchControl: FormControl;
  zoom: number;
  locationName:string;
  weatherData: Object;
  crimes: Array<string>;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private modalComponent: ModalComponent,
    private mapService: MapService, 
    private weatherService: WeatherService,
    private crimeService: CrimeService
  ) {}

  ngOnInit() {
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();
    
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['(cities)'],
      componentRestrictions: {country: 'us'}
      });

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.coordinates = [this.latitude, this.longitude];
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.coordinates = [this.latitude, this.longitude];
        this.zoom = 12;
      });
    }
  }
  
  getWeather() {
    //this.getCrime();
    // get location name with coordinates
    this.mapService.getLocationName(this.latitude, this.longitude)
      .then(name => {
        this.locationName = name.toString();
      });

    // use service to retrieve weather data for selected city
    this.weatherService.weatherData(this.coordinates)
        .subscribe(res => {
        this.weatherData = res;
        console.log(this.weatherData)
      }, err => {
        console.log(err)
      });
  }

  getCrime() {
    // get location name with coordinates
    this.mapService.getLocationName(this.latitude, this.longitude)
      .then(name => {
        this.locationName = name.toString();
      });

    // use service to retrieve crime stats for selected city 
    this.crimeService.getCrimeData(this.coordinates)
        .subscribe( res => { 
          // return part of string that can be parsed
          this.crimes = JSON.parse(res.split('(').pop().split(')').shift());
        },
        err => { 
          console.log(err);
        });
  }
}


