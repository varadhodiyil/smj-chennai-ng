import { Injectable } from "@angular/core";
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router,
} from "@angular/router";
import { ApiService } from "./api.service";
@Injectable({
	providedIn: "root",
})
export class AuthGuard implements CanActivate {
	constructor(private authService: ApiService, private router: Router) {}
	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const isLoggedIn = this.authService.isLoggedIn();
		if (!isLoggedIn) {
			this.router.navigate(["/auth/login"]);
		}
		return isLoggedIn;
	}
}
