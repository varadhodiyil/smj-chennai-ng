import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/services/api.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	errors = [];
	constructor(private fb: FormBuilder, private apiService: ApiService) {
		this.loginForm = this.fb.group({
			username: ["", Validators.required],
			password: ["", Validators.required],
		});
	}

	ngOnInit(): void {}
	login() {
		this.apiService.login(this.loginForm?.value).subscribe({
			next: (d: any) => {
				localStorage.setItem("token", d.token);
			},
			error: (e) => {
				this.errors = e.error.non_field_errors;
			},
		});
	}
}
