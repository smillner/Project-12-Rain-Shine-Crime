import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

	constructor(private httpClient: HttpClient) {

	}

	// sends user login information for authentication and authorization to view future features
	register(email: string, password: string, confirmPassword: string) {console.log(email, password, confirmPassword);
	    return this.httpClient.post(`/register`, {email, password, confirmPassword});
	  } 

}