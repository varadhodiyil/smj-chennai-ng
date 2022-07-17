import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfig } from "../app.config";

@Injectable({
	providedIn: "root",
})
export class ApiService {
	PARTIES = "";
	constructor(private http: HttpClient, private appConfig: AppConfig) {
		this.PARTIES = appConfig.PARTY;
	}

	login(data: {}) {
		return this.http.post(this.appConfig.LOGIN, data);
	}

	isLoggedIn() {
		return (
			localStorage.getItem("token") !== null &&
			localStorage.getItem("token") !== undefined
		);
	}

	saveDocument(data: {}) {
		return this.http.post(this.appConfig.DOCUMENT, data);
	}

	getAllDocuments(q: string) {
		return this.http.get(`${this.appConfig.DOCUMENT}?${q}`);
	}

	getDocument(id: number) {
		return this.http.get(`${this.appConfig.DOCUMENT}${id}/`);
	}
	updateDocument(id: number, data: {}) {
		return this.http.put(`${this.appConfig.DOCUMENT}${id}/`, data);
	}

	getProfile() {
		return this.http.get(this.appConfig.PROFILE);
	}

	saveCharge(data: {}) {
		return this.http.post(this.appConfig.CHARGE, data);
	}
	getCharges(q: string) {
		return this.http.get(`${this.appConfig.CHARGE}?${q}`);
	}

	getCharge(id: string) {
		return this.http.get(`${this.appConfig.CHARGE}${id}`);
	}

	updateCharge(id: string, data: {}) {
		return this.http.put(`${this.appConfig.CHARGE}${id}`, data);
	}

	getPartyBalance() {
		return this.http.get(this.appConfig.DASHBOARD_PARTY);
	}

	getSummary() {
		return this.http.get(this.appConfig.DASHBOARD_SUMMARAY);
	}
}
