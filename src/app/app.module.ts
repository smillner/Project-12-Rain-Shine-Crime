import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MapsComponent, ModalComponent, MapService, CrimeService, WeatherService, LoginService } from './components';

import { AppComponent } from './app.component';
// get Google Maps API key
import { googleMapsAPIKey } from './config';

@NgModule({
  declarations: [
    AppComponent,
    MapsComponent,
    ModalComponent,
  ],
  imports: [
  	AgmCoreModule.forRoot({
      apiKey: googleMapsAPIKey.apiKey,
      libraries: ["places"]
    }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ MapService, CrimeService, WeatherService, LoginService, ModalComponent, MapsComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
