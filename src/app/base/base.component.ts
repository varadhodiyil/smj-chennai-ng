import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../services/api.service";

@Component({
	selector: "app-base",
	templateUrl: "./base.component.html",
	styleUrls: ["./base.component.scss"],
})
export class BaseComponent implements OnInit {
	userProfile: {
		first_name: "";
		last_name: "";
	} = { first_name: "", last_name: "" };
	constructor(private router: Router, private apiService: ApiService) {}

	ngOnInit(): void {
		this.apiService.getProfile().subscribe((d: any) => {
			this.userProfile = d.result;
		});
	}

	logout() {
		localStorage.clear();
		this.router.navigate(["/auth/login"]);
	}
}
