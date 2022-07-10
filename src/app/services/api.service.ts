import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfig } from "../app.config";

@Injectable({
	providedIn: "root",
})
export class ApiService {
	constructor(private http: HttpClient, private appConfig: AppConfig) {}

	login(data: {}) {
		return this.http.post(this.appConfig.LOGIN, data);
	}

	isLoggedIn() {
		return (
			localStorage.getItem("token") !== null &&
			localStorage.getItem("token") !== undefined
		);
	}
}
