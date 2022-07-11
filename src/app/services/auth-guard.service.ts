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
	constructor(private authService: ApiService) {}
	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this.authService.isLoggedIn();
	}
}
