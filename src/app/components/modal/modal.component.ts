import { Component, OnInit, NgZone, ViewChild, Input } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/finally';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})

export class ModalComponent implements OnInit {
  
  @Input() weatherData;
  @Input() locationName;
  @Input() crimes;
  @Input() roundHumidity;
  registerResponse: string;
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  @ViewChild('registrationForm') registrationForm: NgForm;


	constructor(
    private loginService: LoginService
    ) {}

	ngOnInit() {
  } 

  register() { 
    this.loginService.register(this.email, this.password, this.confirmPassword)
      .subscribe( data => {
        this.registrationForm.resetForm();
        return data;
      });
  }

}